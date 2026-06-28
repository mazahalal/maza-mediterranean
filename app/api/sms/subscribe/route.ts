/**
 * SMS Subscribe Web Endpoint
 *
 * Accepts phone number via web form POST (JSON).
 * Normalizes to E.164, stores opt-in in KV.
 *
 * Master Plan: supplement to QR code opt-in — some customers may use
 * the website form instead of texting JOIN. Cashier can also use this
 * endpoint via a tablet at register.
 *
 * Security: NOT a Twilio webhook — public endpoint for web form submission.
 * Spam protection via honeypot field + rate limiting (Phase 3).
 */

import { NextRequest, NextResponse } from 'next/server';
import { normalizeToE164, addSubscriber } from '@/lib/twilio-sms';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, source = 'web' } = body;

    if (!phone) {
      return NextResponse.json(
        { error: 'Phone number is required' },
        { status: 400 }
      );
    }

    // Honeypot — if "company" field is filled, it's a bot
    if (body.company) {
      return NextResponse.json({ success: true }); // Pretend success, do nothing
    }

    const normalized = normalizeToE164(phone);
    if (!normalized) {
      return NextResponse.json(
        { error: 'Invalid US phone number. Please enter a 10-digit number like 480-555-1234.' },
        { status: 400 }
      );
    }

    const { created, subscriber } = await addSubscriber(normalized, source);

    return NextResponse.json({
      success: true,
      created,
      phone: normalized,
      message: created
        ? 'You are subscribed! Show your confirmation text at checkout for 15% off your next visit.'
        : 'You are already on our list. See you soon!',
    });
  } catch (error) {
    console.error('SMS subscribe error:', error);
    return NextResponse.json(
      { error: 'Something went wrong. Please try again or text JOIN to our number.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    endpoint: '/api/sms/subscribe',
    method: 'POST',
    description: 'Subscribe to Maza SMS marketing list via web form',
    body: { phone: 'string (10-digit US number)', source: 'optional string' },
  });
}