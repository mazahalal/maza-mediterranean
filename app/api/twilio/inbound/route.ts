/**
 * Twilio Inbound SMS Webhook
 *
 * Handles all inbound SMS to the Maza Twilio number.
 * Master Plan: "JOIN" keyword opt-in via QR code at register.
 *
 * Keywords:
 *   JOIN / START / SUBSCRIBE / OPTIN / YES / MAZA → opt in (reply with 15% off confirmation)
 *   STOP / UNSUBSCRIBE / CANCEL / END / QUIT     → opt out (Twilio also auto-handles)
 *   UNSTOP / START                                → re-opt in after opt-out
 *   HELP / INFO                                   → reply with help text
 *
 * Security: X-Twilio-Signature validated using auth token.
 * Response: TwiML XML (Twilio's expected format).
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  normalizeToE164,
  detectKeyword,
  addSubscriber,
  removeSubscriber,
  validateTwilioSignature,
} from '@/lib/twilio-sms';

export async function POST(req: NextRequest) {
  const TAT = process.env.TWILIO_AUTH_TOKEN || '';

  // Parse form-encoded body (Twilio sends application/x-www-form-urlencoded)
  const formData = await req.formData();
  const from = formData.get('From') as string;
  const body = (formData.get('Body') as string) || '';
  const messageSid = formData.get('MessageSid') as string;

  // Build params dict for signature validation
  const params: Record<string, string> = {};
  formData.forEach((value, key) => {
    params[key] = value as string;
  });

  // Validate Twilio signature (security)
  const signature = req.headers.get('X-Twilio-Signature') || '';
  // Twilio signs the public webhook URL, not Vercel's internal req.url
  const publicWebhookUrl =
    process.env.TWILIO_WEBHOOK_URL ||
    'https://mazahalalfood.com/api/twilio/inbound';

  // Skip validation in local dev (no auth token set or ngrok)
  const isLocalDev = process.env.NODE_ENV === 'development' || !TAT;
  if (!isLocalDev) {
    const valid = validateTwilioSignature(signature, publicWebhookUrl, params, TAT);
    if (!valid) {
      console.error('Twilio signature validation failed', { from, url: publicWebhookUrl });
      return new NextResponse('<Response></Response>', {
        status: 403,
        headers: { 'Content-Type': 'text/xml' },
      });
    }
  }

  console.log(`[Twilio Inbound] from=${from} body="${body}" sid=${messageSid}`);

  // Normalize phone to E.164
  const normalizedPhone = normalizeToE164(from);
  if (!normalizedPhone) {
    console.error(`[Twilio Inbound] could not normalize phone: ${from}`);
    return twimlResponse('<Response></Response>');
  }

  const keyword = detectKeyword(body);

  switch (keyword) {
    case 'JOIN':
    case 'UNSTOP': {
      const { created } = await addSubscriber(normalizedPhone, 'sms');
      const message = created
        ? 'Welcome to MAZA Mediterranean! 🧆 Show this text at checkout for 15% off your next visit. Reply STOP to unsubscribe. Reply HELP for info. Msg&data rates may apply.'
        : 'You are already on the MAZA list! 🧆 Show this text at checkout for 15% off your next visit. Reply STOP to unsubscribe. Reply HELP for info. Msg&data rates may apply.';
      return twimlResponse(`<Response><Message>${message}</Message></Response>`);
    }

    case 'STOP': {
      await removeSubscriber(normalizedPhone);
      // Twilio auto-sends "You have been unsubscribed" — we don't need to reply
      return twimlResponse('<Response></Response>');
    }

    case 'HELP': {
      const helpMessage =
        'MAZA Mediterranean SMS: Get deals & updates. Msg&data rates may apply. 4 msgs/mo. Reply STOP to unsubscribe, HELP for help. Contact: 480-534-6550';
      return twimlResponse(`<Response><Message>${helpMessage}</Message></Response>`);
    }

    default: {
      // Unknown keyword — treat as opt-in attempt (master plan says low friction)
      // Only auto-subscribe if it looks like a genuine attempt, not spam
      const { created } = await addSubscriber(normalizedPhone, 'sms');
      const message = created
        ? 'Welcome to MAZA Mediterranean! 🧆 Show this text at checkout for 15% off your next visit. Reply STOP to unsubscribe. Reply HELP for info.'
        : 'You are already on the MAZA list! 🧆 Reply STOP to unsubscribe, HELP for help.';
      return twimlResponse(`<Response><Message>${message}</Message></Response>`);
    }
  }
}

/**
 * Helper: return TwiML XML response
 */
function twimlResponse(xml: string): NextResponse {
  return new NextResponse(xml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  });
}

// Disable body parsing — we handle formData manually
export const runtime = 'nodejs';