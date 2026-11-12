/**
 * Register tablet — post-visit review request (/review-request).
 *
 * Cashier-facing tool, not a marketing page: the cashier opens this on the
 * register tablet, enters the number the customer hands over, confirms consent,
 * and taps send. One message with a one-tap Google review link.
 *
 * Deliberately not linked from the nav, footer, or sitemap, and marked noindex —
 * it is a staff surface, and Google does not want review solicitation pages in
 * the index.
 *
 * Sending is gated on MAZA_REVIEW_SMS_ENABLED until the A2P campaign covers
 * review-request content (docs/review-velocity-sms.md). While it is off the page
 * says so plainly instead of pretending a text went out.
 */

import Link from 'next/link';
import ReviewRequestForm from '@/components/ReviewRequestForm';
import { isReviewSmsEnabled, REVIEW_REQUEST_MESSAGE } from '@/lib/review-request';

export const metadata = {
  title: 'Review Request — Register Tablet | Maza Mediterranean Cuisine',
  description:
    'Staff tool: send a customer a one-time text with a link to leave a Google review for Maza Mediterranean Cuisine.',
  robots: { index: false, follow: false },
};

export const dynamic = 'force-dynamic';

export default function ReviewRequestPage() {
  const enabled = isReviewSmsEnabled();

  return (
    <div className="min-h-[80vh] bg-[#0A1F1E] py-14 px-6">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-display text-[#F5F1E8] mb-3">
            Send a review request
          </h1>
          <p className="text-base text-[#B8B8B8]">
            Register tablet · one-time text · one tap to Google
          </p>
        </div>

        {!enabled && (
          <div className="mb-8 rounded-lg border border-[#D3AB5E]/60 bg-[#0E0E0E] px-5 py-4">
            <p className="text-sm text-[#D3AB5E] font-semibold">
              Not enabled yet — no texts are being sent.
            </p>
            <p className="mt-1 text-xs text-[#B8B8B8] leading-relaxed">
              Consent is recorded below, but delivery stays off until the SMS campaign covers
              review requests. Ask the office before using this page with guests.
            </p>
          </div>
        )}

        <div className="bg-[#0E0E0E] border border-[rgba(211,171,94,0.15)] rounded-lg p-8">
          <ReviewRequestForm source="register" />
        </div>

        <div className="mt-8 bg-[#0E0E0E] border border-[rgba(211,171,94,0.15)] rounded-lg p-6">
          <h2 className="font-display text-lg text-[#D3AB5E] mb-3 tracking-wide">What the guest gets</h2>
          <p className="text-sm text-[#B8B8B8] leading-relaxed border-l-2 border-[#D3AB5E]/40 pl-4 [overflow-wrap:anywhere]">
            {REVIEW_REQUEST_MESSAGE}
          </p>
          <h2 className="font-display text-lg text-[#D3AB5E] mt-6 mb-3 tracking-wide">How to ask</h2>
          <ol className="text-sm text-[#B8B8B8] leading-relaxed list-decimal pl-5 space-y-1">
            <li>Ask every guest the same way — no picking only the happy ones.</li>
            <li>Never offer a discount, free item, or entry in exchange for a review.</li>
            <li>Read the consent line out loud, then tick the box and send.</li>
            <li>One text per guest. The system blocks a second request automatically.</li>
          </ol>
          <p className="mt-4 text-xs text-[#B8B8B8]/70">
            Counts and this month&apos;s velocity: <code>/api/review-request/stats</code>. Guests who
            text STOP are suppressed from every message class, this one included.
          </p>
        </div>

        <p className="mt-8 text-center text-xs text-[#B8B8B8]/60">
          <Link href="/menu-qr" className="underline hover:text-[#D3AB5E]">
            Menu QR page
          </Link>{' '}
          · Guests can always review from the table QR with no phone number at all.
        </p>
      </div>
    </div>
  );
}
