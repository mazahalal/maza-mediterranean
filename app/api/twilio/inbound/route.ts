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
 * Security: X-Twilio-Signature validated on raw POST body (URLSearchParams).
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

function parseFormBody(rawBody: string): Record<string, string> {
  const params: Record<string, string> = {};
  const search = new URLSearchParams(rawBody);
  search.forEach((value, key) => {
    params[key] = value;
  });
  return params;
}

export async function POST(req: NextRequest) {
  const TAT = process.env.TWILIO_AUTH_TOKEN || '';
  const accountSid = process.env.TWILIO_ACCOUNT_SID || '';

  const rawBody = await req.text();
  const params = parseFormBody(rawBody);

  const from = params.From ?? '';
  const body = params.Body ?? '';
  const messageSid = params.MessageSid ?? '';

  const signature = req.headers.get('X-Twilio-Signature') || '';
  const publicWebhookUrl =
    process.env.TWILIO_WEBHOOK_URL ||
    'https://mazahalalfood.com/api/twilio/inbound';

  const isLocalDev = process.env.NODE_ENV === 'development' || !TAT;

  if (!isLocalDev) {
    const valid = validateTwilioSignature(signature, publicWebhookUrl, params, TAT);
    const accountMatch =
      accountSid.length > 0 && params.AccountSid === accountSid;

    if (!valid) {
      console.error('Twilio signature validation failed', {
        from,
        messageSid,
        url: publicWebhookUrl,
        paramKeys: Object.keys(params).sort(),
        accountSidMatch: accountMatch,
      });
      // Empty TwiML — avoid leaking whether validation failed
      return new NextResponse('<Response></Response>', {
        status: 200,
        headers: { 'Content-Type': 'text/xml; charset=utf-8' },
      });
    }
  }

  console.log(`[Twilio Inbound] from=${from} body="${body}" sid=${messageSid}`);

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
        ? 'Welcome to MAZA Mediterranean! Show this text at checkout for 15% off your next visit. Reply STOP to unsubscribe. Reply HELP for info. Msg&data rates may apply.'
        : 'You are already on the MAZA list! Show this text at checkout for 15% off your next visit. Reply STOP to unsubscribe. Reply HELP for info. Msg&data rates may apply.';
      return twimlResponse(`<Response><Message>${escapeXml(message)}</Message></Response>`);
    }

    case 'STOP': {
      await removeSubscriber(normalizedPhone);
      return twimlResponse('<Response></Response>');
    }

    case 'HELP': {
      const helpMessage =
        'MAZA Mediterranean SMS: Get deals & updates. Msg&data rates may apply. 4 msgs/mo. Reply STOP to unsubscribe, HELP for help. Contact: 480-534-6550';
      return twimlResponse(`<Response><Message>${escapeXml(helpMessage)}</Message></Response>`);
    }

    default: {
      const { created } = await addSubscriber(normalizedPhone, 'sms');
      const message = created
        ? 'Welcome to MAZA Mediterranean! Show this text at checkout for 15% off your next visit. Reply STOP to unsubscribe. Reply HELP for info.'
        : 'You are already on the MAZA list! Reply STOP to unsubscribe, HELP for help.';
      return twimlResponse(`<Response><Message>${escapeXml(message)}</Message></Response>`);
    }
  }
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function twimlResponse(xml: string): NextResponse {
  return new NextResponse(xml, {
    status: 200,
    headers: { 'Content-Type': 'text/xml; charset=utf-8' },
  });
}

export const runtime = 'nodejs';