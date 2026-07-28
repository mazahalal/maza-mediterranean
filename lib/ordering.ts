/** Online ordering destinations — takeout (SkyTab POS) vs delivery (Slice). */

export const TAKEOUT_URL = "https://online.skytab.com/s/maza";

const SLICE_MENU_BASE =
  "https://slicelife.com/restaurants/az/chandler/85226/maza/menu";

/** Slice delivery/order menu with referral UTMs. Vary `content` per surface. */
export function deliveryUrl(content: string): string {
  const params = new URLSearchParams({
    utm_campaign: "order_now_button",
    utm_medium: "referral",
    utm_content: content,
    utm_source: "maza_website",
  });
  return `${SLICE_MENU_BASE}?${params.toString()}`;
}
