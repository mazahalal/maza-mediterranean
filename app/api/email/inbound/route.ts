/**
 * Protected pull endpoint for inbound emails stored by the Resend webhook.
 *
 * Mazabot polls this to read mail received at *@mazahalalfood.com.
 * Mirrors the auth pattern of GET /api/apply (same ops pull secret).
 *
 *   GET /api/email/inbound                → new (unpulled) emails
 *   GET /api/email/inbound?status=all     → everything stored
 *   GET /api/email/inbound?mark=1         → also marks returned emails pulled
 *
 * Auth: `Authorization: Bearer $APPLICATIONS_PULL_SECRET`
 *       (or `x-applications-secret: $APPLICATIONS_PULL_SECRET`)
 */
import { NextRequest, NextResponse } from 'next/server';
import { listInboundEmails, markInboundEmailsPulled } from '@/lib/inbound-emails';

function authorized(req: NextRequest): boolean {
  const secret = process.env.APPLICATIONS_PULL_SECRET;
  if (!secret) return false;
  const header = req.headers.get('authorization') || '';
  const bearer = header.startsWith('Bearer ') ? header.slice(7).trim() : '';
  const alt = req.headers.get('x-applications-secret') || '';
  return bearer === secret || alt === secret;
}

export async function GET(req: NextRequest) {
  if (!authorized(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const scope = searchParams.get('status') === 'all' ? 'all' : 'new';
  const mark = searchParams.get('mark') === '1' || searchParams.get('mark') === 'true';

  const emails = await listInboundEmails(scope);

  if (mark && emails.length > 0) {
    await markInboundEmailsPulled(emails.map((e) => e.id));
  }

  return NextResponse.json({
    count: emails.length,
    scope,
    markedPulled: mark,
    emails,
  });
}
