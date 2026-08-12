/**
 * Resend inbound email webhook.
 *
 * Receives `email.received` events from Resend for mail addressed to
 * *@mazahalalfood.com and:
 *   1. forwards the original message (headers/body intact, passthrough mode)
 *      to RESEND_FORWARD_TO
 *   2. stores the full received email in Vercel KV (lib/inbound-emails.ts)
 *      so Mazabot can poll it via GET /api/email/inbound
 *
 * Forwarding is the primary action — a KV store failure is logged but never
 * fails the webhook.
 *
 * Required env vars (Vercel):
 *   RESEND_API_KEY          — Maza workspace key
 *   RESEND_WEBHOOK_SECRET   — svix signing secret from webhook registration
 *   RESEND_FORWARD_TO       — destination inbox (franky@tricondigital.com)
 */
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { saveInboundEmail } from '@/lib/inbound-emails';

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(req: NextRequest) {
  const secret = process.env.RESEND_WEBHOOK_SECRET;
  const forwardTo = process.env.RESEND_FORWARD_TO;
  if (!secret || !forwardTo) {
    console.error('Inbound webhook misconfigured: missing RESEND_WEBHOOK_SECRET or RESEND_FORWARD_TO');
    return NextResponse.json({ error: 'Not configured' }, { status: 500 });
  }

  const rawBody = await req.text();
  const headers = {
    id: req.headers.get('svix-id') ?? '',
    timestamp: req.headers.get('svix-timestamp') ?? '',
    signature: req.headers.get('svix-signature') ?? '',
  };

  let event;
  try {
    event = getResend().webhooks.verify({
      payload: rawBody,
      headers,
      webhookSecret: secret,
    });
  } catch (err) {
    console.error('Inbound webhook signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 401 });
  }

  if (event.type !== 'email.received') {
    return NextResponse.json({ received: true });
  }

  const emailId = (event.data as { email_id?: string }).email_id;
  if (!emailId) {
    console.error('Inbound webhook missing email_id:', JSON.stringify(event.data));
    return NextResponse.json({ error: 'Missing email_id' }, { status: 400 });
  }

  try {
    await getResend().emails.receiving.forward({
      emailId,
      to: forwardTo,
      from: 'hello@mazahalalfood.com',
      passthrough: true,
    });
  } catch (err) {
    console.error('Inbound forward failed:', err);
    return NextResponse.json({ error: 'Forward failed' }, { status: 500 });
  }

  // Store for Mazabot polling (GET /api/email/inbound). Never fail the
  // webhook over this — the forward above is the primary action.
  try {
    const { data: received, error } = await getResend().emails.receiving.get(emailId);
    if (error) {
      throw new Error(`receiving.get failed: ${error.message}`);
    }
    if (received) {
      await saveInboundEmail(received);
    }
  } catch (err) {
    console.error('Inbound email KV store failed:', err);
  }

  return NextResponse.json({ success: true });
}
