import { MAZA_APPLE_MAPS_URL, MAZA_GOOGLE_MAPS_URL } from "./maza-maps";

/**
 * Verified public profiles for Maza Mediterranean Cuisine.
 *
 * Single source of truth: the site-wide Restaurant schema, the footer, and
 * /menu-qr all read from here so the entity signals cannot drift apart.
 */

/** Social profiles. */
export const MAZA_INSTAGRAM_URL = "https://instagram.com/maza.halal";
export const MAZA_TIKTOK_URL = "https://tiktok.com/@maza.halal";
export const MAZA_FACEBOOK_URL =
  "https://www.facebook.com/profile.php?id=61590423133133";

/** Third-party ordering and review listings. */
export const MAZA_YELP_URL =
  "https://www.yelp.com/biz/maza-mediterranean-cuisine-chandler";
export const MAZA_UBEREATS_URL =
  "https://www.ubereats.com/store/maza-mediterranean-cuisine/yoX-jsvQQFSioTBP37vQnQ";
export const MAZA_DOORDASH_URL = "https://www.doordash.com/store/46422584";
export const MAZA_GRUBHUB_URL =
  "https://www.grubhub.com/restaurant/maza-mediterranean-cuisine-3419-w-frye-rd-suite-2-chandler/14875480";

/** Social links rendered in the footer, in display order. */
export const MAZA_SOCIAL_LINKS = [
  { name: "Instagram", url: MAZA_INSTAGRAM_URL },
  { name: "TikTok", url: MAZA_TIKTOK_URL },
  { name: "Facebook", url: MAZA_FACEBOOK_URL },
] as const;

/** schema.org sameAs: verified places where Maza is listed. */
export const MAZA_SAME_AS = [
  MAZA_GOOGLE_MAPS_URL,
  MAZA_APPLE_MAPS_URL,
  MAZA_YELP_URL,
  MAZA_UBEREATS_URL,
  MAZA_DOORDASH_URL,
  MAZA_GRUBHUB_URL,
  MAZA_INSTAGRAM_URL,
  MAZA_TIKTOK_URL,
  MAZA_FACEBOOK_URL,
];
