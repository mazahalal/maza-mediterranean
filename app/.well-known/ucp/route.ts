import { NextResponse } from "next/server";
import { menuData } from "../../../data/menu";
import { MAZA_SAME_AS } from "../../../lib/maza-profiles";
import { TAKEOUT_URL, deliveryUrl } from "../../../lib/ordering";

/**
 * UCP (Universal Commerce Protocol) Discovery Manifest
 * /.well-known/ucp — Agent-accessible menu inventory & capability declaration
 *
 * Spec: SEO Bible §2.1 / §1.1 (ucp/1.0 product + capability surface)
 * Shape mirrors Print Junkie AZ (protocol/vendor/capabilities/products),
 * with restaurant-accurate checkout (hosted ordering, not first-party cart).
 * Prices are derived from data/menu.ts (generated from menu.json).
 */

const BASE = "https://mazahalalfood.com";
const PHONE = "+1-480-534-6550";
const EMAIL = "info@mazahalalfood.com";

type PriceTier = { label: string; price: number };

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Parse "$10.91", "Free", or "SM $1.99 | LG $4.99" into numeric tiers. */
function parsePriceTiers(price: string): {
  tiers: PriceTier[];
  min: number;
  max: number;
} {
  const raw = price.trim();

  if (/^free$/i.test(raw)) {
    return { tiers: [{ label: "Standard", price: 0 }], min: 0, max: 0 };
  }

  // Multi-size: "SM $1.99 | LG $4.99"
  const multiRegex = /([A-Za-z][A-Za-z0-9]*)\s*\$(\d+(?:\.\d{1,2})?)/g;
  const multi: Array<{ label: string; price: number }> = [];
  let match: RegExpExecArray | null;
  while ((match = multiRegex.exec(raw)) !== null) {
    multi.push({
      label: match[1],
      price: Number.parseFloat(match[2]),
    });
  }
  if (multi.length >= 2 || (multi.length === 1 && raw.includes("|"))) {
    const amounts = multi.map((tier) => tier.price);
    return {
      tiers: multi,
      min: Math.min(...amounts),
      max: Math.max(...amounts),
    };
  }

  const single = raw.match(/\$(\d+(?:\.\d{1,2})?)/);
  if (single) {
    const amount = Number.parseFloat(single[1]);
    return {
      tiers: [{ label: "Standard", price: amount }],
      min: amount,
      max: amount,
    };
  }

  return { tiers: [], min: 0, max: 0 };
}

function productId(category: string, name: string): string {
  // Disambiguate shared names across Loaded Fries / Loaded Hummus.
  if (category === "Loaded Fries" || category === "Loaded Hummus") {
    return slugify(`${category} ${name}`);
  }
  return slugify(name);
}

function buildProducts() {
  return menuData.flatMap((section) =>
    section.items.map((item) => {
      const { tiers, min, max } = parsePriceTiers(item.price);
      const note =
        item.note ||
        (item.notes ? item.notes.join(" ") : undefined) ||
        section.subtitle ||
        undefined;

      return {
        id: productId(section.category, item.name),
        name: item.name,
        category: section.category,
        priceRange: { min, max, currency: "USD" },
        tiers,
        ...(note ? { note } : {}),
        availability: item.out_of_stock ? "out_of_stock" : "available",
        turnaround:
          "Made to order — typical pickup 15–25 minutes during open hours",
        specsUrl: `${BASE}/api/specs`,
        orderUrl: TAKEOUT_URL,
        menuUrl: `${BASE}/menu`,
        ...(item.image ? { image: `${BASE}${item.image}` } : {}),
      };
    }),
  );
}

export async function GET() {
  const products = buildProducts();
  const delivery = deliveryUrl("ucp");

  const manifest = {
    protocol: "ucp/1.0",
    version: "2026-10-28",

    vendor: {
      name: "Maza Mediterranean Cuisine",
      url: BASE,
      contact: PHONE,
      email: EMAIL,
      type: "Restaurant",
      cuisine: ["Mediterranean", "Middle Eastern", "Halal"],
      address: {
        streetAddress: "3491 W Frye Rd, Suite 2",
        addressLocality: "Chandler",
        addressRegion: "AZ",
        postalCode: "85226",
        addressCountry: "US",
      },
      hours: {
        tuesday_sunday: "10:00-22:00",
        closed: ["Monday"],
        note: "Tuesday through Sunday, 10:00am to 10:00pm. Closed Mondays.",
      },
      sameAs: MAZA_SAME_AS,
    },

    capabilities: {
      checkout: {
        provider: "external",
        method: "hosted_ordering",
        supported: true,
        note:
          "No first-party cart on mazahalalfood.com. Pickup via SkyTab POS; delivery via Slice plus Uber Eats, DoorDash, and Grubhub.",
        endpoints: {
          pickup: TAKEOUT_URL,
          delivery_slice: delivery,
          menu: `${BASE}/menu`,
          catering: `${BASE}/catering`,
          contact: `${BASE}/contact`,
        },
      },
      fulfillment: {
        type: "restaurant",
        pickup: {
          supported: true,
          location: "3491 W Frye Rd, Suite 2, Chandler, AZ 85226",
          timeframe: "15–25 minutes typical during open hours",
          orderUrl: TAKEOUT_URL,
        },
        delivery: {
          supported: true,
          regions: ["Chandler", "Phoenix metro", "AZ"],
          providers: ["Slice", "Uber Eats", "DoorDash", "Grubhub"],
          orderUrl: delivery,
        },
        dine_in: {
          supported: true,
          location: "Chandler, AZ",
        },
        catering: {
          supported: true,
          method: "inquiry",
          orderUrl: `${BASE}/catering`,
          note: "Catering available on request — contact the restaurant for custom quotes.",
        },
      },
      discounts: {
        supported: true,
        method: "promo_and_plaza_lunch",
        note:
          "Plaza Lunch Club and seasonal promos may apply. Combo upgrade (+$4.99 fries + drink) available on wraps.",
      },
      menu_discovery: {
        supported: true,
        menuUrl: `${BASE}/menu`,
        specsUrl: `${BASE}/api/specs`,
        llmsTxt: `${BASE}/llms.txt`,
      },
    },

    products,
    productCount: products.length,

    endpoints: {
      menu: `${BASE}/menu`,
      specs: `${BASE}/api/specs`,
      contact: `${BASE}/contact`,
      catering: `${BASE}/catering`,
      llmsTxt: `${BASE}/llms.txt`,
      takeout: TAKEOUT_URL,
      delivery,
    },

    rate_limiting: {
      ap2_required: false,
      max_requests_per_minute: 60,
      note: "Human and Agent traffic welcome. Please respect rate limits.",
    },

    return_policy: {
      url: `${BASE}/terms`,
      summary:
        "Food is prepared to order. Contact the restaurant for any order issues. Catering deposits and cancellations arranged case-by-case.",
    },

    lastUpdated: new Date().toISOString(),
  };

  return NextResponse.json(manifest, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
