import type { MenuCategory, MenuItem } from "@/data/menu";

/**
 * Shared Menu / MenuSection / MenuItem JSON-LD builder.
 *
 * /menu and every /menu/<category> route render from this so the same data
 * produces the same markup, and prices stay real USD numbers matching the
 * register (data/menu.ts, generated from menu.json).
 */

export const SITE = "https://mazahalalfood.com";

const DEFAULT_DESCRIPTION =
  "Authentic Mediterranean wraps, plates, burgers, sides, and desserts. Halal-certified. Big portions, real ingredients, honest prices.";

type Offer = {
  "@type": "Offer";
  name?: string;
  price: number;
  priceCurrency: "USD";
};

/**
 * Turn a register price string into Offer(s).
 * - "$12.99" -> one Offer at 12.99
 * - "SM $1.99 | LG $4.99" -> two labeled Offers
 * - "Free" or anything without a USD amount -> no Offer (a null price is invalid schema)
 */
function offersFor(item: MenuItem): Offer | Offer[] | undefined {
  const matches = [...item.price.matchAll(/(?:\b(SM|LG)\b\s*)?\$\s*(\d+(?:\.\d+)?)/g)];
  if (matches.length === 0) return undefined;

  const offers: Offer[] = matches.map(([, label, amount]) => ({
    "@type": "Offer",
    ...(label ? { name: label } : {}),
    price: Number.parseFloat(amount),
    priceCurrency: "USD",
  }));

  return offers.length === 1 ? offers[0] : offers;
}

function menuItemsFor(section: MenuCategory) {
  return section.items.map((item) => {
    const description =
      item.description || item.note || item.notes?.join(" ") || "";
    const offers = offersFor(item);

    return {
      "@type": "MenuItem" as const,
      name: item.name,
      ...(description ? { description } : {}),
      ...(item.image
        ? {
            image: item.image.startsWith("http")
              ? item.image
              : `${SITE}${item.image}`,
          }
        : {}),
      ...(offers ? { offers } : {}),
    };
  });
}

/** schema.org Menu for the given sections. */
export function buildMenuJsonLd(
  sections: MenuCategory[],
  {
    url,
    name,
    description,
  }: { url: string; name?: string; description?: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Menu",
    name: name ?? "Maza Mediterranean Cuisine Menu",
    description: description ?? DEFAULT_DESCRIPTION,
    url,
    hasMenuSection: sections.map((section) => ({
      "@type": "MenuSection" as const,
      name: section.category,
      hasMenuItem: menuItemsFor(section),
    })),
  };
}
