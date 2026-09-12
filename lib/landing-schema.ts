/**
 * JSON-LD builders for the SEO Bible Core 30 landing pages.
 *
 * Kept separate from lib/menu-schema.ts (which owns the real Menu/MenuItem
 * markup for /menu routes) so page-level breadcrumbs, FAQs, and area-served
 * signals have one source.
 */

import type { Faq, PriceRow } from "@/data/offerings";

export const SITE = "https://mazahalalfood.com";
export const RESTAURANT_ID = `${SITE}/#restaurant`;

type Offer = {
  "@type": "Offer";
  name?: string;
  price: number;
  priceCurrency: "USD";
};

/**
 * Turn a register price string into Offer(s).
 * "$20.19" -> one Offer. "SM $1.99 | LG $4.99" -> two labeled Offers.
 * Anything without a USD amount yields no Offer (a null price is invalid).
 */
function offersFor(price: string): Offer | Offer[] | undefined {
  const matches = [
    ...price.matchAll(/(?:\b(SM|LG)\b\s*)?\$\s*(\d+(?:\.\d+)?)/g),
  ];
  if (matches.length === 0) return undefined;

  const offers: Offer[] = matches.map(([, label, amount]) => ({
    "@type": "Offer",
    ...(label ? { name: label } : {}),
    price: Number.parseFloat(amount),
    priceCurrency: "USD",
  }));

  return offers.length === 1 ? offers[0] : offers;
}

export function buildBreadcrumb(
  items: { name: string; path: string }[],
): object {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE}${item.path}`,
    })),
  };
}

export function buildFaqPage(faqs: Faq[]): object {
  return {
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

/** Menu + MenuSection + MenuItem for an offering page's price table. */
export function buildMenuSection(
  sectionName: string,
  rows: PriceRow[],
  url: string,
  name: string,
): object {
  return {
    "@type": "Menu",
    name,
    url,
    hasMenuSection: {
      "@type": "MenuSection",
      name: sectionName,
      hasMenuItem: rows.map((row) => {
        const offers = offersFor(row.price);
        return {
          "@type": "MenuItem",
          name: row.label,
          ...(row.note ? { description: row.note } : {}),
          ...(offers ? { offers } : {}),
        };
      }),
    },
  };
}

/** Service + areaServed City for neighborhood pages (local SEO signal). */
export function buildAreaService(
  name: string,
  city: string,
  url: string,
  description: string,
): object {
  return {
    "@type": "Service",
    name,
    description,
    url,
    serviceType: "Halal Mediterranean restaurant",
    provider: { "@id": RESTAURANT_ID },
    areaServed: {
      "@type": "City",
      name: city,
    },
    availableChannel: {
      "@type": "ServiceChannel",
      servicePhone: "(480) 534-6550",
      serviceUrl: `${SITE}/contact`,
    },
  };
}
