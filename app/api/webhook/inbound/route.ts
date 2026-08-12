/**
 * Resend inbound email webhook.
 *
 * Receives `email.received` events from Resend for mail addressed to
 * *@mazahalalfood.com and:
 *   1. re-sends the message to RESEND_FORWARD_TO with Reply-To set to the
 *      ORIGINAL SENDER, so replying from the destination inbox goes straight
 *      back to them (passthrough forwards showed our own domain as sender,
 *      so replies looped back to us). Falls back to passthrough forward if
 *      the re-send fails — mail must never be lost.
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

const OWN_DOMAIN = /@mazahalalfood\.com\s*>?$/i;

function getResend() {
  if (!process.env.RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY is not set');
  }
  return new Resend(process.env.RESEND_API_KEY);
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Where a reply should go: the original human. Contact-form notifications
 *  come from our own domain with the real sender in reply_to. */
function replyTarget(email: { from: string; reply_to: string[] | null }): string {
  if (OWN_DOMAIN.test(email.from) && email.reply_to?.length) {
    return email.reply_to[0];
  }
  return email.from;
}

function banner(from: string) {
  return `<div style="font:13px -apple-system,sans-serif;color:#888;border-bottom:1px solid #eee;padding-bottom:8px;margin-bottom:16px;">
Originally from <strong style="color:#555;">${escapeHtml(from)}</strong> — hit Reply and it goes straight to them.
</div>`;
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

  const resend = getResend();
  const { data: received, error: getError } = await resend.emails.receiving.get(emailId);

  // --- 1. Forward (primary action) ---
  let forwarded = false;
  if (received && !getError) {
    try {
      // Re-attach files via their Resend-hosted download URLs
      const attachments = (
        await Promise.all(
          (received.attachments ?? []).map(async (a) => {
            try {
              const { data: att } = await resend.emails.receiving.attachments.get({
                emailId,
                id: a.id,
              });
              if (!att?.download_url) return null;
              return {
                filename: a.filename ?? 'attachment',
                path: att.download_url,
                contentType: a.content_type,
              };
            } catch (err) {
              console.error(`Attachment fetch failed (${a.id}):`, err);
              return null;
            }
          })
        )
      ).filter((a): a is NonNullable<typeof a> => a !== null);

      const bodyHtml = received.html
        ? banner(received.from) + received.html
        : banner(received.from) +
          `<div style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(received.text ?? '')}</div>`;

      const { error: sendError } = await resend.emails.send({
        from: 'Maza Inbox <hello@mazahalalfood.com>',
        to: [forwardTo],
        replyTo: replyTarget(received),
        subject: received.subject ?? '(no subject)',
        html: bodyHtml,
        ...(attachments.length > 0 ? { attachments } : {}),
      });
      if (sendError) {
        throw new Error(`forward send failed: ${sendError.message}`);
      }
      forwarded = true;
    } catch (err) {
      console.error('Inbound reply-able forward failed, falling back to passthrough:', err);
    }
  }

  if (!forwarded) {
    // Fallback: original passthrough forward — never lose mail.
    try {
      await resend.emails.receiving.forward({
        emailId,
        to: forwardTo,
        from: 'hello@mazahalalfood.com',
        passthrough: true,
      });
    } catch (err) {
      console.error('Inbound forward failed:', err);
      return NextResponse.json({ error: 'Forward failed' }, { status: 500 });
    }
  }

  // --- 2. Store for Mazabot polling (GET /api/email/inbound). Never fail the
  // webhook over this — the forward above is the primary action.
  try {
    if (getError) {
      throw new Error(`receiving.get failed: ${getError.message}`);
    }
    if (received) {
      await saveInboundEmail(received);
    }
  } catch (err) {
    console.error('Inbound email KV store failed:', err);
  }

  return NextResponse.json({ success: true });
}
