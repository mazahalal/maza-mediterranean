/**
 * Post-visit review request — cashier tablet endpoint.
 *
 * POST { phone, consent: true, source? }
 *   Called by the cashier tablet page at the register (/review-request).
 *   Records the customer's consent for a ONE-TIME review request, then sends it.
 *
 * This is NOT the marketing opt-in endpoint. Numbers captured here are not added
 * to the recurring SMS list (/api/sms/subscribe is the endpoint for that, with
 * its own SmsSubscribeForm consent). See lib/review-request.ts.
 *
 * SENDING IS GATED by MAZA_REVIEW_SMS_ENABLED until the A2P campaign covers
 * review-request content. When the flag is off the endpoint still records the
 * consent but returns `sent: false, outcome: 'disabled'` and sends nothing.
 *
 * Security: public-but-purpose-built endpoint; honeypot field + explicit
 * consent flag required. Rate limiting is a later phase (same as
 * /api/sms/subscribe).
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  sendReviewRequest,
  isReviewSmsEnabled,
  REVIEW_REQUEST_MESSAGE,
  GOOGLE_REVIEW_URL,
} from '@/lib/review-request';
import { normalizeToE164 } from '@/lib/twilio-sms';

const MESSAGES: Record<string, string> = {
  sent: 'Review request sent.',
  disabled: 'Review request NOT sent — review-request texting is not enabled yet.',
  already_requested: 'Already asked once — no second text sent.',
  suppressed_opted_out: 'This number replied STOP before — no text sent.',
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, consent, source = 'register' } = body;

    // Honeypot — bots fill hidden fields.
    if (body.company) {
      return NextResponse.json({ success: true, sent: false, outcome: 'disabled' });
    }

    if (!phone) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 });
    }

    // The cashier must confirm the customer agreed. Without an explicit true we
    // do not even record the number.
    if (consent !== true) {
      return NextResponse.json(
        { error: 'Consent is required before we can text a review request.' },
        { status: 400 }
      );
    }

    const normalized = normalizeToE164(phone);
    if (!normalized) {
      return NextResponse.json(
        { error: 'Invalid US phone number. Please enter a 10-digit number like 480-555-1234.' },
        { status: 400 }
      );
    }

    const result = await sendReviewRequest(normalized, source);

    return NextResponse.json({
      success: result.outcome === 'sent',
      sent: result.sent,
      outcome: result.outcome,
      phone: `***${normalized.slice(-4)}`,
      message: MESSAGES[result.outcome] ?? 'Request handled.',
    });
  } catch (error) {
    console.error('[ReviewRequest] error', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/review-request',
    method: 'POST',
    description:
      'Records a customer consent for a one-time post-visit Google review request and sends it.',
    body: {
      phone: 'string (10-digit US number)',
      consent: 'true (required — customer agreed at the register)',
      source: 'optional string, default "register"',
    },
    sendingEnabled: isReviewSmsEnabled(),
    reviewUrl: GOOGLE_REVIEW_URL,
    sampleMessage: REVIEW_REQUEST_MESSAGE,
  });
}

export const runtime = 'nodejs';
