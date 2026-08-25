/** Time-boxed site promos (America/Phoenix — no DST). */

export type ActivePromo = {
  id: string;
  title: string;
  itemName: string;
  salePrice: string;
  regularPrice: string;
  /** Short line under the title */
  blurb: string;
  /** Wait / prep callout */
  waitNote: string;
  orderAheadNote: string;
  whenLabel: string;
  imageSrc: string;
  imageAlt: string;
  /** Inclusive start (ms UTC) */
  startsAt: number;
  /** Exclusive end (ms UTC) */
  endsAt: number;
};

/** Samak Tandoor weekend flash sale — Sat–Sun only, promote from Friday. */
export const SAMAK_WEEKEND_SPECIAL: ActivePromo = {
  id: "samak-weekend-2026-08-22",
  title: "Weekend Special",
  itemName: "Samak Tandoor",
  salePrice: "$23",
  regularPrice: "$38.97",
  blurb: "Whole large fish with rice and salad",
  waitNote: "45 minutes to 1 hour prep time",
  orderAheadNote: "Order ahead — please don’t walk in cold for this one.",
  whenLabel: "Saturday & Sunday only",
  imageSrc: "/images/maza/promos/samak-plate.jpg",
  imageAlt: "Samak Tandoor whole grilled fish plate with lemon tomato and onion at Maza Mediterranean Cuisine Chandler AZ",
  // Ended — weekend of Aug 22–23 2026 (walked back Mon week of Aug 25)
  startsAt: Date.parse("2026-08-21T07:00:00.000Z"),
  endsAt: Date.parse("2026-08-24T05:00:00.000Z"), // past — leave inactive
};

export function isPromoActive(
  promo: ActivePromo,
  now: Date | number = Date.now(),
): boolean {
  const t = typeof now === "number" ? now : now.getTime();
  return t >= promo.startsAt && t < promo.endsAt;
}

export function getActiveHomepagePromo(
  now: Date | number = Date.now(),
): ActivePromo | null {
  // No active homepage promos (Samak weekend special ended).
  void now;
  void SAMAK_WEEKEND_SPECIAL;
  void isPromoActive;
  return null;
}
