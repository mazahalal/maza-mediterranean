/** Time-boxed site promos (America/Phoenix — no DST). */

export type ActivePromo = {
  id: string;
  title: string;
  itemName: string;
  salePrice: string;
  regularPrice: string;
  /** Short line under the title */
  blurb: string;
  /** Wait / prep callout — omit or empty to hide */
  waitNote: string;
  orderAheadNote: string;
  whenLabel: string;
  imageSrc: string;
  imageAlt: string;
  /** Optional vertical/popup crop */
  popupImageSrc?: string;
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
  imageAlt:
    "Samak Tandoor whole grilled fish plate with lemon tomato and onion at Maza Mediterranean Cuisine Chandler AZ",
  // Ended — weekend of Aug 22–23 2026 (walked back Mon week of Aug 25)
  startsAt: Date.parse("2026-08-21T07:00:00.000Z"),
  endsAt: Date.parse("2026-08-24T05:00:00.000Z"), // past — leave inactive
};

/**
 * Gyro weekend flash — Fri Sep 18 through Sun Sep 20 close (Phoenix).
 * Permanent menu item is Beef + Lamb Gyro @ $10.91; till sale was $8 that window only.
 * ENDED — left in registry inactive so static rebuilds stay off without deleting history.
 */
export const GYRO_WEEKEND_SPECIAL: ActivePromo = {
  id: "gyro-weekend-2026-09-18",
  title: "Weekend Special",
  itemName: "Beef + Lamb Gyro",
  salePrice: "$8",
  regularPrice: "$10.91",
  blurb: "Beef + lamb gyro — served on pita or as a wrap",
  waitNote: "",
  orderAheadNote: "",
  whenLabel: "Friday–Sunday only",
  imageSrc: "/images/maza/promos/gyro-on-pita.jpg",
  popupImageSrc: "/images/maza/promos/gyro-handheld-vertical.jpg",
  imageAlt:
    "Beef and lamb gyro on pita at Maza Mediterranean Cuisine Chandler AZ",
  // Fri Sep 18 00:00 Phoenix → Sun Sep 20 22:00 Phoenix (store close)
  startsAt: Date.parse("2026-09-18T07:00:00.000Z"),
  // Forced past after Mon Sep 21 teardown (was 2026-09-21T05:00:00.000Z)
  endsAt: Date.parse("2026-09-21T05:00:00.000Z"),
};

/**
 * Midweek cash push — MAZA Special $39.99 Wed Sep 23 + Thu Sep 24 only (Phoenix).
 * Permanent menu price stays $48.45 in menu.json; till must match wall (Frank POS button).
 */
export const MAZA_SPECIAL_MIDWEEK: ActivePromo = {
  id: "maza-special-wed-thu-2026-09-23",
  title: "Midweek Special",
  itemName: "Maza Special",
  salePrice: "$39.99",
  regularPrice: "$48.45",
  blurb:
    "4 kebabs (chicken tikka, lamb tikka, beef+lamb shish, chicken shish) + 2 pita, rice, salad, hummus + tahini, baba",
  waitNote: "",
  orderAheadNote: "Dine-in or pickup. Call (480) 534-6550.",
  whenLabel: "Wednesday & Thursday only",
  imageSrc: "/images/maza/promos/maza-special-plate.jpg",
  imageAlt:
    "Maza Special mixed kebab plate at Maza Mediterranean Cuisine Chandler AZ",
  // Wed Sep 23 00:00 Phoenix → Thu Sep 24 22:00 Phoenix (store close)
  startsAt: Date.parse("2026-09-23T07:00:00.000Z"),
  endsAt: Date.parse("2026-09-25T05:00:00.000Z"),
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
  if (isPromoActive(MAZA_SPECIAL_MIDWEEK, now)) return MAZA_SPECIAL_MIDWEEK;
  if (isPromoActive(GYRO_WEEKEND_SPECIAL, now)) return GYRO_WEEKEND_SPECIAL;
  if (isPromoActive(SAMAK_WEEKEND_SPECIAL, now)) return SAMAK_WEEKEND_SPECIAL;
  return null;
}

/** Active flash sale for a specific menu item name, else null. */
export function getActivePromoForItem(
  itemName: string,
  now: Date | number = Date.now(),
): ActivePromo | null {
  const promo = getActiveHomepagePromo(now);
  if (promo && promo.itemName === itemName) return promo;
  return null;
}
