/**
 * Twilio SMS — subscriber management & compliance utilities
 *
 * Master Plan: Horizon 1 list-building phase.
 * Collects phone numbers via "JOIN" keyword opt-in.
 * No marketing texts until Horizon 2 (6-8 weeks collection).
 *
 * Storage: Vercel KV (Redis) via @vercel/kv
 * Keys:
 *   subscriber:{e164}    → JSON { phone, status, optedInAt, optedOutAt? }
 *   subscribers:all      → Set of E.164 phone numbers (for enumeration)
 *   subscribers:opted_in → Set of E.164 phone numbers (active)
 */

import { kv } from '@vercel/kv';

export type SubscriberStatus = 'opted_in' | 'opted_out';

export interface Subscriber {
  phone: string;          // E.164 format: +14805551234
  status: SubscriberStatus;
  optedInAt: string;     // ISO timestamp
  optedOutAt?: string;   // ISO timestamp (if opted out)
  source?: string;       // 'qr' | 'web' | 'sms' | 'cashier'
  notes?: string;
}

const SUBSCRIBER_PREFIX = 'subscriber:';
const SET_ALL = 'subscribers:all';
const SET_OPTED_IN = 'subscribers:opted_in';

// Compliance keywords (Twilio auto-handles STOP/UNSTOP on messaging services,
// but we still record for audit and handle JOIN which is custom)
const KEYWORDS = {
  JOIN: ['join', 'start', 'subscribe', 'opt in', 'optin', 'yes', 'maza'],
  STOP: ['stop', 'unsubscribe', 'cancel', 'end', 'quit', 'opt out', 'optout'],
  HELP: ['help', 'info', 'information'],
  UNSTOP: ['unstop', 'start', 'yes'],
} as const;

/**
 * Normalize any phone number to E.164 format.
 * Handles US numbers: adds +1 prefix if 10 digits.
 */
export function normalizeToE164(input: string): string | null {
  // Remove all non-digit characters
  let digits = input.replace(/\D/g, '');

  // If starts with country code 1 and has 11 digits
  if (digits.length === 11 && digits.startsWith('1')) {
    return `+${digits}`;
  }

  // If 10 digits (US number without country code)
  if (digits.length === 10) {
    return `+1${digits}`;
  }

  // If already has + prefix
  if (input.trim().startsWith('+') && digits.length >= 11) {
    return `+${digits}`;
  }

  return null;
}

/**
 * Detect keyword from inbound SMS body.
 * Returns the keyword category or null.
 */
export function detectKeyword(body: string): 'JOIN' | 'STOP' | 'HELP' | 'UNSTOP' | null {
  const normalized = body.trim().toLowerCase();

  if (KEYWORDS.STOP.some(kw => normalized === kw || normalized.includes(kw))) {
    // Check if it's UNSTOP (START after STOP) — Twilio handles this,
    // but we still process it
    if (KEYWORDS.UNSTOP.some(kw => normalized === kw)) {
      return 'UNSTOP';
    }
    return 'STOP';
  }
  if (KEYWORDS.JOIN.some(kw => normalized === kw || normalized.startsWith(kw))) {
    return 'JOIN';
  }
  if (KEYWORDS.HELP.some(kw => normalized === kw || normalized.startsWith(kw))) {
    return 'HELP';
  }
  return null;
}

/**
 * Add or update a subscriber in KV.
 * If they're already opted in, does nothing (idempotent).
 */
export async function addSubscriber(phone: string, source: string = 'sms'): Promise<{ created: boolean; subscriber: Subscriber }> {
  const key = `${SUBSCRIBER_PREFIX}${phone}`;

  const existing = await kv.get<Subscriber>(key);
  if (existing && existing.status === 'opted_in') {
    return { created: false, subscriber: existing };
  }

  const subscriber: Subscriber = {
    phone,
    status: 'opted_in',
    optedInAt: new Date().toISOString(),
    source,
  };

  await kv.set(key, subscriber);
  await kv.sadd(SET_ALL, phone);
  await kv.sadd(SET_OPTED_IN, phone);

  return { created: true, subscriber };
}

/**
 * Mark a subscriber as opted out.
 */
export async function removeSubscriber(phone: string): Promise<void> {
  const key = `${SUBSCRIBER_PREFIX}${phone}`;

  const existing = await kv.get<Subscriber>(key);
  if (existing) {
    existing.status = 'opted_out';
    existing.optedOutAt = new Date().toISOString();
    await kv.set(key, existing);
  } else {
    // Record opt-out even if we don't have a prior opt-in (for audit)
    const subscriber: Subscriber = {
      phone,
      status: 'opted_out',
      optedInAt: new Date().toISOString(),
      optedOutAt: new Date().toISOString(),
    };
    await kv.set(key, subscriber);
    await kv.sadd(SET_ALL, phone);
  }

  await kv.srem(SET_OPTED_IN, phone);
}

/**
 * Get a subscriber by phone number.
 */
export async function getSubscriber(phone: string): Promise<Subscriber | null> {
  return await kv.get<Subscriber>(`${SUBSCRIBER_PREFIX}${phone}`);
}

/**
 * Get all opted-in subscriber phone numbers.
 */
export async function getOptedInSubscribers(): Promise<string[]> {
  return await kv.smembers(SET_OPTED_IN);
}

/**
 * Get count of opted-in subscribers.
 */
export async function getSubscriberCount(): Promise<number> {
  return await kv.scard(SET_OPTED_IN);
}

/**
 * Get all subscriber numbers (including opted-out, for admin dashboard).
 */
export async function getAllSubscribers(): Promise<string[]> {
  return await kv.smembers(SET_ALL);
}

/**
 * Validate Twilio webhook signature for security.
 * Twilio sends X-Twilio-Signature header = HMAC-SHA256 of URL + POST params.
 */
export function validateTwilioSignature(
  signature: string,
  url: string,
  params: Record<string, string>,
  authToken: string
): boolean {
  const crypto = require('crypto');

  // Sort params alphabetically by key
  const sortedKeys = Object.keys(params).sort();
  const data = url + sortedKeys.map(k => k + params[k]).join('');

  const computed = crypto
    .createHmac('sha256', authToken)
    .update(Buffer.from(data, 'utf-8'))
    .digest('base64');

  return computed === signature;
}