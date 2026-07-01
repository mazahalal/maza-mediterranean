/**
 * Twilio Status Callback Webhook
 *
 * Records delivery status for outbound SMS messages.
 * Master Plan: Phase 5 (optional reporting).
 *
 * Twilio POSTs status updates when outbound messages change state:
 *   queued → sent → delivered (or failed / undelivered)
 *
 * Stored in KV for admin dashboard analytics:
 *   message:{sid}    → JSON { sid, to, status, errorCode?, dateSent? }
 *   messages:recent   → Sorted Set of message SIDs by timestamp
 */

import { NextRequest, NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const messageSid = formData.get('MessageSid') as string;
  const messageStatus = formData.get('MessageStatus') as string;
  const to = formData.get('To') as string;
  const errorCode = formData.get('ErrorCode') as string | null;
  const dateSent = formData.get('dateSent') as string | null;

  console.log(`[Twilio Status] sid=${messageSid} status=${messageStatus} to=${to} error=${errorCode}`);

  // Store delivery status (Phase 5 — admin reporting)
  const messageRecord = {
    sid: messageSid,
    to,
    status: messageStatus,
    errorCode: errorCode || null,
    dateSent: dateSent || null,
    updatedAt: new Date().toISOString(),
  };

  try {
    await kv.set(`message:${messageSid}`, messageRecord);
    // Keep recent messages sorted by timestamp for admin dashboard
    const now = Date.now();
    await kv.zadd('messages:recent', { score: now, member: messageSid });
    // Trim to last 500 messages
    // (Vercel KV / Redis ZREMRANGEBYRANK equivalent — kept simple here)
  } catch (error) {
    console.error('[Twilio Status] KV write failed:', error);
  }

  // 204 = OK, no content needed
  return new NextResponse(null, { status: 204 });
}

export const runtime = 'nodejs';