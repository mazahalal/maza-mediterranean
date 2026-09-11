/**
 * Maza's Google rating.
 *
 * SOURCE OF TRUTH: the Google Business Profile place page for
 * "Maza | Mediterranean Cuisine", 3491 W Frye Rd Ste 2, Chandler, AZ 85226
 * (MAZA_GOOGLE_MAPS_URL in lib/maza-maps.ts resolves to it).
 *
 * Last read from GBP: 2026-09-11 (4.9 average, 94/3/1/1/1 star split, 100 reviews).
 *
 * MUST BE RE-READ FROM THE GBP PLACE PAGE AND UPDATED MONTHLY. Edit the two
 * values below only, nothing else: the visible rating element
 * (components/GoogleRating.tsx) and the Restaurant JSON-LD in app/layout.tsx
 * both read them, so the number a visitor sees and the number Google reads
 * can never drift apart.
 */

/** Average star rating, exactly as shown on the GBP place page. */
export const MAZA_RATING_VALUE = "4.9";

/** Total Google review count, exactly as shown on the GBP place page. */
export const MAZA_REVIEW_COUNT = "100";

/** Google's scale, required by schema.org AggregateRating. */
export const MAZA_RATING_BEST = "5";
export const MAZA_RATING_WORST = "1";
