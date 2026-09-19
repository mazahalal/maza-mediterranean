/**
 * Review-velocity measurement — requests sent vs reviews earned.
 *
 * GET /api/review-request/stats
 *
 * Counts only; no phone numbers are returned (the most recent request is shown
 * as ***1234 so the endpoint can prove activity without exposing a number).
 *
 * How to read it (SEO Bible §3.3 — target 8–15 new Google reviews/month):
 *   - requestsSent / requestedLast30Days = the velocity engine's input.
 *   - MAZA_REVIEW_COUNT in lib/maza-rating.ts = the output.
 *   - Once a month: read the GBP place page, subtract `reviewBaseline.count`,
 *     and if the delta is behind the 8–15 band, raise request volume (more
 *     register asks) rather than changing the message.
 *   - When you update lib/maza-rating.ts, update `reviewBaseline` here in the
 *     same commit so the delta stays honest.
 */

import { NextResponse } from 'next/server';
import { getReviewStats } from '@/lib/review-request';
import { MAZA_RATING_VALUE, MAZA_REVIEW_COUNT } from '@/lib/maza-rating';

/**
 * Baseline read from the GBP place page on 2026-09-11: 4.9★ / 100 reviews.
 * This is the number the SEO Bible case study was measured against.
 */
const reviewBaseline = {
  rating: '4.9',
  count: 100,
  readAt: '2026-09-11',
  targetPerMonth: { min: 8, max: 15 },
};

export async function GET() {
  const stats = await getReviewStats();
  const liveCount = Number(MAZA_REVIEW_COUNT);
  const reviewsSinceBaseline = Number.isFinite(liveCount)
    ? liveCount - reviewBaseline.count
    : null;

  return NextResponse.json(
    {
      stats,
      reviewBaseline,
      current: {
        rating: MAZA_RATING_VALUE,
        count: MAZA_REVIEW_COUNT,
        source: 'lib/maza-rating.ts',
      },
      reviewsSinceBaseline,
      // Reviews earned per 100 requests — the only number that says whether the
      // message itself works.
      reviewsPer100Requests:
        stats.requestsSent > 0 && reviewsSinceBaseline !== null
          ? Math.round((reviewsSinceBaseline / stats.requestsSent) * 1000) / 10
          : null,
    },
    { headers: { 'Cache-Control': 'no-store' } }
  );
}

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';
