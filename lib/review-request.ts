/**
 * Post-visit Google review request — velocity engine (SEO Bible §3.3 / §4 Phase 2).
 *
 * Purpose: turn a completed visit into a Google review while the experience is
 * fresh. One trigger, one message, one measurement.
 *
 * Trigger (decided 2026-09-11): CASHIER TABLET AT THE REGISTER.
 *   The tablet is the only post-visit signal Maza actually owns. SkyTab takeout
 *   is the only online-order CTA and exposes no webhook, and a delivery-app
 *   webhook would never fire. The register is where the customer is already
 *   standing, phone in hand, and where `/api/sms/subscribe` was already written
 *   to support a tablet. Full rationale: docs/review-velocity-sms.md
 *
 * Consent model — deliberately SEPARATE from the recurring marketing list:
 *   A customer who hands over a number at the register for a review link has
 *   consented to ONE transactional follow-up, not to recurring promotional SMS.
 *   These records therefore live under their own KV prefix (`review:*`) and are
 *   NEVER written into `subscribers:all` / `subscribers:opted_in`. Putting a
 *   review-only number on the marketing list would be an unconsented marketing
 *   opt-in.
 *
 * Suppression: STOP applies to everything. Every send is blocked when a
 *   `subscriber:{phone}` record exists with status `opted_out` — and because the
 *   message goes out through the same Twilio Messaging Service, Twilio's own
 *   carrier-level keyword handling suppresses it too.
 *
 * ⚠️ SENDING IS GATED. The A2P campaign attached to the Messaging Service
 *   (C7GEUSK, use case MARKETING, VERIFIED) does not cover review-request
 *   content as registered. `MAZA_REVIEW_SMS_ENABLED` must stay unset/false until
 *   the campaign is amended and re-verified. See docs/review-velocity-sms.md.
 */

import { kv } from '@vercel/kv';
import { getSubscriber, normalizeToE164, sendSms } from '@/lib/twilio-sms';

/** One-tap Google review URL already used by the passive /menu-qr buttons. */
export const GOOGLE_REVIEW_URL = 'https://g.page/r/CWsguNCtl7azEBM/review';

/**
 * The one review-request message.
 *
 * Compliance rules it must keep:
 *   - brand name in the body
 *   - opt-out instructions
 *   - NO incentive tied to leaving a review (Google review policy — the 15% off
 *     coupon belongs to the SMS list, never to a review)
 *   - NO review gating ("if you had a great experience…") — every customer is
 *     asked the same way
 */
export const REVIEW_REQUEST_MESSAGE =
  'MAZA Mediterranean: thanks for dining with us! Would you leave us a quick Google review? It helps our small kitchen: ' +
  `${GOOGLE_REVIEW_URL} Reply STOP to opt out. Reply HELP for help.`;

export const REVIEW_CONTACT_PREFIX = 'review:';
const SET_REVIEW_ALL = 'review:all';
const COUNT_SENT = 'review:requests:sent';
const COUNT_SUPPRESSED = 'review:requests:suppressed';
const COUNT_ALREADY = 'review:requests:already_requested';

export interface ReviewContact {
  phone: string;              // E.164
  consentedAt: string;        // ISO — when the customer agreed at the register
  source: string;             // 'register' | 'tablet' | ...
  reviewRequestedAt?: string; // ISO — set once the request has been sent
  status: 'consented' | 'requested';
  lastOutcome?: string;
}

export type ReviewSendOutcome =
  | 'sent'
  | 'disabled'            // MAZA_REVIEW_SMS_ENABLED is not true — nothing sent
  | 'already_requested'   // this customer was already asked once
  | 'suppressed_opted_out'; // customer replied STOP at some point — never text them

export interface ReviewSendResult {
  outcome: ReviewSendOutcome;
  sent: boolean;
  contact: ReviewContact | null;
}

/** Review-request sending is off unless explicitly enabled. */
export function isReviewSmsEnabled(): boolean {
  return process.env.MAZA_REVIEW_SMS_ENABLED === 'true';
}

export async function getReviewContact(phone: string): Promise<ReviewContact | null> {
  return await kv.get<ReviewContact>(`${REVIEW_CONTACT_PREFIX}${phone}`);
}

/** Record the register consent before any message is sent. Idempotent. */
export async function recordReviewConsent(
  phone: string,
  source: string = 'register'
): Promise<ReviewContact> {
  const key = `${REVIEW_CONTACT_PREFIX}${phone}`;
  const existing = await kv.get<ReviewContact>(key);
  if (existing) return existing;

  const contact: ReviewContact = {
    phone,
    consentedAt: new Date().toISOString(),
    source,
    status: 'consented',
  };
  await kv.set(key, contact);
  await kv.sadd(SET_REVIEW_ALL, phone);
  return contact;
}

/**
 * Send the one-time review request.
 *
 * Order matters: consent record → STOP suppression → already-asked → enabled
 * flag → send. The message is never sent unless all gates pass, and a customer
 * is never asked twice.
 *
 * Returns a typed outcome instead of throwing so the tablet UI can show an
 * honest state (and so a Twilio hiccup cannot make the cashier think a message
 * went out when it did not).
 */
export async function sendReviewRequest(
  rawPhone: string,
  source: string = 'register'
): Promise<ReviewSendResult> {
  const phone = normalizeToE164(rawPhone);
  if (!phone) {
    return { outcome: 'disabled', sent: false, contact: null };
  }

  // Suppression first: a number that ever replied STOP is off limits for every
  // message class, review requests included.
  const subscriber = await getSubscriber(phone);
  if (subscriber?.status === 'opted_out') {
    await kv.incr(COUNT_SUPPRESSED);
    return { outcome: 'suppressed_opted_out', sent: false, contact: null };
  }

  const contact = await recordReviewConsent(phone, source);

  if (contact.reviewRequestedAt) {
    await kv.incr(COUNT_ALREADY);
    return { outcome: 'already_requested', sent: false, contact };
  }

  if (!isReviewSmsEnabled()) {
    console.warn(
      '[ReviewRequest] send blocked — MAZA_REVIEW_SMS_ENABLED is not true (campaign not amended yet)'
    );
    return { outcome: 'disabled', sent: false, contact };
  }

  const delivered = await sendSms(phone, REVIEW_REQUEST_MESSAGE);
  const updated: ReviewContact = {
    ...contact,
    reviewRequestedAt: new Date().toISOString(),
    status: 'requested',
    lastOutcome: delivered ? 'sent' : 'send_failed',
  };
  await kv.set(`${REVIEW_CONTACT_PREFIX}${phone}`, updated);
  if (delivered) {
    await kv.incr(COUNT_SENT);
    return { outcome: 'sent', sent: true, contact: updated };
  }
  return { outcome: 'disabled', sent: false, contact: updated };
}

export interface ReviewStats {
  requestsSent: number;
  suppressedOptedOut: number;
  alreadyRequested: number;
  contactsOnFile: number;
  requestedLast30Days: number;
  sendingEnabled: boolean;
  requestedAt?: string;
  requestedAtPhone?: string;
}

/** Counts only — never phone numbers. Powers the requests-sent vs reviews-earned read. */
export async function getReviewStats(): Promise<ReviewStats> {
  const [sent, suppressed, already, phones] = await Promise.all([
    kv.get<number>(COUNT_SENT),
    kv.get<number>(COUNT_SUPPRESSED),
    kv.get<number>(COUNT_ALREADY),
    kv.smembers(SET_REVIEW_ALL),
  ]);

  const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000;
  let requestedLast30Days = 0;
  let latest: ReviewContact | null = null;

  for (const p of phones || []) {
    const c = await kv.get<ReviewContact>(`${REVIEW_CONTACT_PREFIX}${p}`);
    if (!c?.reviewRequestedAt) continue;
    if (new Date(c.reviewRequestedAt).getTime() >= cutoff) requestedLast30Days += 1;
    if (!latest || c.reviewRequestedAt > (latest.reviewRequestedAt || '')) latest = c;
  }

  return {
    requestsSent: Number(sent) || 0,
    suppressedOptedOut: Number(suppressed) || 0,
    alreadyRequested: Number(already) || 0,
    contactsOnFile: (phones || []).length,
    requestedLast30Days,
    sendingEnabled: isReviewSmsEnabled(),
    requestedAt: latest?.reviewRequestedAt,
    // last 4 digits only — enough to prove activity without exposing a number
    requestedAtPhone: latest ? `***${latest.phone.slice(-4)}` : undefined,
  };
}
