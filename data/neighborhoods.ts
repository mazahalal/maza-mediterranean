/**
 * SEO Bible §4 Phase 3 — neighborhood-specific landing pages.
 *
 * The Bible calls these out explicitly in the Restaurant playbook:
 * "Build neighborhood-specific landing pages." Each page targets a real
 * surrounding community that Maza already serves, with route directions,
 * the order that travels best, and its own FAQ + Service/areaServed schema.
 *
 * No invented statistics — directions are given as road routes, and any drive
 * time is stated as approximate.
 */

import type { Faq, PriceRow } from "./offerings";

export type NeighborhoodPage = {
  slug: string;
  /** City / community name used in schema areaServed. */
  city: string;
  h1: string;
  title: string;
  description: string;
  hook: string;
  intro: string;
  /** Getting here from that community. */
  directions: string;
  priceHeading: string;
  priceRows: PriceRow[];
  faqs: Faq[];
  image?: string;
  imageAlt?: string;
  keywords: string[];
};

const FAQ_HALAL: Faq = {
  question: "Is Maza halal?",
  answer:
    "Yes — every cut of meat at Maza is halal-certified, including beef, lamb, chicken, and ribeye.",
};
const FAQ_HOURS: Faq = {
  question: "What are Maza's hours?",
  answer:
    "Tuesday through Sunday, 10am–10pm. Closed Mondays.",
};
const FAQ_ORDER: Faq = {
  question: "How do I order?",
  answer:
    "Call (480) 534-6550 for pickup, or order delivery through DoorDash, Uber Eats, or Grubhub.",
};
const FAQ_PARKING: Faq = {
  question: "Is there parking?",
  answer:
    "Free parking in the plaza lot at 3491 W Frye Rd, Suite 2, Chandler, AZ 85226.",
};

function deliveryFaq(city: string): Faq {
  return {
    question: `Do you deliver to ${city}?`,
    answer: `Delivery is handled by DoorDash, Uber Eats, and Grubhub — their apps show the live delivery radius around Maza. For pickup you can always call (480) 534-6550 directly.`,
  };
}

export const NEIGHBORHOOD_PAGES: NeighborhoodPage[] = [
  {
    slug: "chandler",
    city: "Chandler",
    h1: "Mediterranean Food in Chandler, AZ",
    title: "Mediterranean Food in Chandler, AZ | Maza Mediterranean Cuisine",
    description:
      "Maza Mediterranean Cuisine is Chandler's halal-cooked-from-scratch Mediterranean restaurant at 3491 W Frye Rd, Suite 2. Plates $16.55–$28.99, open Tue–Sun 10am–10pm.",
    hook: "Maza is a Chandler restaurant first — 3491 W Frye Rd, Suite 2, a few minutes off the I-10 in the same plaza as the businesses we feed every weekday. Plates run $16.55 to $28.99 with two kebabs, rice, salad, baba ghanoush, and hummus + tahini, and we are open Tuesday through Sunday, 10am–10pm.",
    intro:
      "Everything on the menu is cooked to order in one kitchen, from the falafel to the whole grilled fish. Whether you live off Chandler Blvd or work in the Price Road corridor, this is the closest halal Mediterranean kitchen in the city.",
    directions:
      "We are at 3491 W Frye Rd, Suite 2 — just west of the I-10, between Chandler Blvd and Frye Rd. Free parking in the plaza lot.",
    priceHeading: "Popular in Chandler",
    priceRows: [
      { label: "Beef Gyro Wrap", price: "$10.91" },
      { label: "Chicken Tikka Plate", price: "$19.67", note: "2 kebabs, rice, salad, baba ghanoush & hummus + tahini" },
      { label: "Mix Kebab Plate", price: "$20.71" },
      { label: "Cashew Baklava", price: "$3.99" },
    ],
    faqs: [
      {
        question: "Where in Chandler is Maza?",
        answer:
          "3491 W Frye Rd, Suite 2, Chandler, AZ 85226 — west of the I-10 between Chandler Blvd and Frye Rd, with free parking in the plaza lot.",
      },
      FAQ_HALAL,
      FAQ_HOURS,
      deliveryFaq("Chandler"),
    ],
    image: "/images/maza/hero-brand-1920.jpg",
    imageAlt: "Maza Mediterranean Cuisine in Chandler Arizona",
    keywords: ["Mediterranean food Chandler AZ", "halal restaurant Chandler", "restaurants near Frye Rd Chandler"],
  },
  {
    slug: "gilbert",
    city: "Gilbert",
    h1: "Mediterranean Food Near Gilbert, AZ",
    title: "Mediterranean Food Near Gilbert, AZ | Maza Mediterranean Cuisine",
    description:
      "Halal Mediterranean food a short drive from Gilbert — Maza at 3491 W Frye Rd, Chandler. Plates $16.55–$28.99, open Tue–Sun 10am–10pm.",
    hook: "From most of Gilbert, Maza is a straight run west — about 3491 W Frye Rd in Chandler, just off the I-10 in a plaza with free parking. Plates come in at $16.55 to $28.99 with two kebabs, rice, salad, baba ghanoush, and hummus + tahini.",
    intro:
      "Gilbert has plenty of counter-service Mediterranean. What it does not have much of is halal-certified food cooked to order — which is exactly what comes out of the Maza kitchen.",
    directions:
      "Take the Loop 202 or Williams Field Rd west toward the I-10, then exit at Chandler Blvd or Frye Rd. Maza is at 3491 W Frye Rd, Suite 2, with free plaza parking.",
    priceHeading: "What Gilbert orders",
    priceRows: [
      { label: "Maza Grill", price: "$27.99", note: "Three kebabs — the group order" },
      { label: "Family Meal", price: "$87.49", note: "Ten skewers, feeds four to six" },
      { label: "Falafel Plate", price: "$16.55" },
      { label: "Baklava", price: "$3.99", note: "Cashew or pistachio" },
    ],
    faqs: [
      {
        question: "How far is Maza from Gilbert?",
        answer:
          "Maza sits at 3491 W Frye Rd in Chandler, just west of the I-10 — a short drive west from Gilbert via the Loop 202 or Williams Field Rd. Exact time depends on where in Gilbert you start, so check your maps for the current route.",
      },
      FAQ_HALAL,
      deliveryFaq("Gilbert"),
      FAQ_HOURS,
    ],
    image: "/images/maza/menu/opt-mix-kebab-plate.jpg",
    imageAlt: "Halal Mediterranean food near Gilbert Arizona from Maza Mediterranean Cuisine",
    keywords: ["Mediterranean food Gilbert AZ", "halal food near Gilbert", "Mediterranean restaurant near Gilbert"],
  },
  {
    slug: "tempe",
    city: "Tempe",
    h1: "Halal Mediterranean Food Near Tempe, AZ",
    title: "Halal Mediterranean Near Tempe, AZ | Maza Mediterranean Cuisine",
    description:
      "Halal Mediterranean food near Tempe — Maza at 3491 W Frye Rd, Chandler, straight down the I-10. Plates $16.55–$28.99, wraps from $9.35.",
    hook: "Maza is a straight run south from Tempe down the I-10 to Frye Rd — 3491 W Frye Rd, Suite 2 in Chandler. Wraps start at $9.35 for falafel and $10.91 for beef gyro, and full plates with two kebabs run $16.55 to $28.99.",
    intro:
      "For Tempe students and anyone working along the Broadway corridor, this is the closest proper halal Mediterranean grill on the south side of the freeway — cooked to order, not assembled from a holding tray.",
    directions:
      "Head south on the I-10 from Tempe and exit at Chandler Blvd or Frye Rd. Maza is at 3491 W Frye Rd, Suite 2, with free parking in the plaza lot.",
    priceHeading: "What Tempe orders",
    priceRows: [
      { label: "Falafel Wrap", price: "$9.35" },
      { label: "Beef Gyro Wrap", price: "$10.91" },
      { label: "Loaded Fries — Shredded Chicken", price: "$11.49" },
      { label: "Chicken Tikka Plate", price: "$19.67" },
    ],
    faqs: [
      {
        question: "Is Maza close to Tempe?",
        answer:
          "Maza is at 3491 W Frye Rd in Chandler, a straight shot south down the I-10 from Tempe — exit at Chandler Blvd or Frye Rd. Check your maps for the current drive time from your side of Tempe.",
      },
      FAQ_HALAL,
      deliveryFaq("Tempe"),
      FAQ_ORDER,
    ],
    image: "/images/maza/menu/opt-beef-gyro-vertical.jpg",
    imageAlt: "Halal Mediterranean food near Tempe Arizona at Maza Mediterranean Cuisine",
    keywords: ["halal food near Tempe", "Mediterranean food near Tempe AZ", "halal restaurant Tempe area"],
  },
  {
    slug: "ahwatukee",
    city: "Ahwatukee",
    h1: "Mediterranean Food Near Ahwatukee, AZ",
    title: "Mediterranean Food Near Ahwatukee | Maza Mediterranean Cuisine",
    description:
      "Halal Mediterranean food near Ahwatukee — Maza at 3491 W Frye Rd, Chandler, just across the I-10. Plates $16.55–$28.99, open Tue–Sun 10am–10pm.",
    hook: "Ahwatukee sits on the west side of the I-10 and Maza sits on the east — 3491 W Frye Rd, Suite 2 in Chandler, one exit apart. Plates are $16.55 to $28.99 with two kebabs, rice, salad, baba ghanoush, and hummus + tahini.",
    intro:
      "For Ahwatukee households, this is the shortest hop across the freeway to a halal kitchen that cooks kebabs to order rather than reheating them — and the plaza parking is free on both sides.",
    directions:
      "Cross the I-10 at Chandler Blvd or Frye Rd — Maza is at 3491 W Frye Rd, Suite 2 on the Chandler side, with free parking in the plaza lot.",
    priceHeading: "What Ahwatukee orders",
    priceRows: [
      { label: "Chicken Shish Kebab Plate", price: "$19.67" },
      { label: "Beef + Lamb Shish Kebab Plate", price: "$20.19" },
      { label: "Maza Salad", price: "$13.99", note: "Choose chicken or steak" },
      { label: "Samak Tandoor", price: "$38.97", note: "Whole fish — allow 1 hour" },
    ],
    faqs: [
      {
        question: "How close is Maza to Ahwatukee?",
        answer:
          "Maza is at 3491 W Frye Rd, Suite 2 in Chandler — just across the I-10 from Ahwatukee, one exit up at Chandler Blvd or Frye Rd.",
      },
      FAQ_HALAL,
      deliveryFaq("Ahwatukee"),
      FAQ_PARKING,
    ],
    image: "/images/maza/menu/opt-chicken-shish-plate.jpg",
    imageAlt: "Mediterranean food near Ahwatukee Arizona from Maza Mediterranean Cuisine",
    keywords: ["Mediterranean food near Ahwatukee", "halal food Ahwatukee", "restaurants near Ahwatukee"],
  },
  {
    slug: "sun-lakes",
    city: "Sun Lakes",
    h1: "Mediterranean Food Near Sun Lakes, AZ",
    title: "Mediterranean Food Near Sun Lakes | Maza Mediterranean Cuisine",
    description:
      "Halal Mediterranean food a short drive from Sun Lakes — Maza at 3491 W Frye Rd, Chandler. Plates $16.55–$28.99, mezze from $3.99, open Tue–Sun 10am–10pm.",
    hook: "From Sun Lakes, Maza is a short run north to 3491 W Frye Rd in Chandler, with free plaza parking at the door and single-level, easy access. Plates run $16.55 to $28.99, and mezze starts at $3.99 for a four-piece falafel.",
    intro:
      "Sun Lakes diners tend to order the same way: a plate to share and a couple of mezze to start. The kitchen will pack sauces on the side, and everything is available for pickup if you would rather eat at home.",
    directions:
      "Head north from Sun Lakes toward Chandler, then take Chandler Blvd east to the Frye Rd area — Maza is at 3491 W Frye Rd, Suite 2, with free parking in the plaza lot.",
    priceHeading: "What Sun Lakes orders",
    priceRows: [
      { label: "Chicken Shish Kebab Plate", price: "$19.67" },
      { label: "Falafel Plate", price: "$16.55" },
      { label: "Appetizer Plate", price: "$15.51", note: "Mezze to share" },
      { label: "Falafel (4pc)", price: "$3.99" },
    ],
    faqs: [
      {
        question: "Is Maza easy to reach from Sun Lakes?",
        answer:
          "Yes — a short drive north into Chandler to 3491 W Frye Rd, Suite 2, with free parking right in front of the plaza. Call (480) 534-6550 and we will have pickup ready.",
      },
      FAQ_HALAL,
      FAQ_HOURS,
      deliveryFaq("Sun Lakes"),
    ],
    image: "/images/maza/menu/opt-appetizer-plate.jpg",
    imageAlt: "Mediterranean food near Sun Lakes Arizona from Maza Mediterranean Cuisine",
    keywords: ["Mediterranean food near Sun Lakes AZ", "restaurants near Sun Lakes", "halal food Sun Lakes"],
  },
  {
    slug: "mesa",
    city: "Mesa",
    h1: "Halal Mediterranean Food Near Mesa, AZ",
    title: "Halal Mediterranean Near Mesa, AZ | Maza Mediterranean Cuisine",
    description:
      "Halal Mediterranean food near Mesa — Maza at 3491 W Frye Rd, Chandler, a straight run west. Plates $16.55–$28.99, catering available.",
    hook: "Maza is west of Mesa at 3491 W Frye Rd, Suite 2 in Chandler — a straight run across the US-60 or the Loop 101 and I-10. Plates are $16.55 to $28.99, and we cater Mesa offices with the $48.45 Maza Special or the $87.49 Family Meal.",
    intro:
      "For Mesa groups ordering for an office or a gathering, the platters are the practical call: ten skewers with pita, rice, and sides, packed to travel and ready to serve.",
    directions:
      "Take the US-60 or Loop 101 west to the I-10, then exit at Chandler Blvd or Frye Rd. Maza is at 3491 W Frye Rd, Suite 2, with free plaza parking.",
    priceHeading: "What Mesa orders",
    priceRows: [
      { label: "Maza Special", price: "$48.45", note: "4 skewers + pita, rice, sides — feeds 2–3" },
      { label: "Family Meal", price: "$87.49", note: "10 skewers — feeds 4–6" },
      { label: "Maza Grill", price: "$27.99" },
      { label: "Appetizer Plate", price: "$15.51" },
    ],
    faqs: [
      {
        question: "Do you cater to Mesa businesses?",
        answer:
          "Yes — platters and family meals travel well and we cater offices regularly. Call (480) 534-6550 with your date and headcount, or use the catering request form.",
      },
      FAQ_HALAL,
      deliveryFaq("Mesa"),
      FAQ_ORDER,
    ],
    image: "/images/maza/menu/opt-family-meal.jpg",
    imageAlt: "Halal Mediterranean catering near Mesa Arizona from Maza Mediterranean Cuisine",
    keywords: ["halal food near Mesa AZ", "Mediterranean catering Mesa", "Mediterranean food near Mesa"],
  },
  {
    slug: "queen-creek",
    city: "Queen Creek",
    h1: "Mediterranean Food Near Queen Creek, AZ",
    title: "Mediterranean Food Near Queen Creek | Maza Mediterranean Cuisine",
    description:
      "Halal Mediterranean food near Queen Creek — Maza at 3491 W Frye Rd, Chandler. Plates $16.55–$28.99, family platters to share, open Tue–Sun 10am–10pm.",
    hook: "From Queen Creek, Maza is a run west along Chandler Heights or Riggs Rd to 3491 W Frye Rd, Suite 2 in Chandler. Plates are $16.55 to $28.99, and the $87.49 Family Meal puts ten skewers on the table for four to six people.",
    intro:
      "Queen Creek families tend to order big. The platters are built for exactly that — rice, pita, and sides included, so nobody is assembling a meal from four separate orders.",
    directions:
      "Head west from Queen Creek along Riggs Rd or Chandler Heights Rd toward the I-10, then north to Frye Rd. Maza is at 3491 W Frye Rd, Suite 2, with free plaza parking.",
    priceHeading: "What Queen Creek orders",
    priceRows: [
      { label: "Family Meal", price: "$87.49", note: "10 skewers + pita, rice, sides" },
      { label: "Maza Special", price: "$48.45" },
      { label: "Ribeye Tikka Plate", price: "$24.87" },
      { label: "Loaded Fries — Gyro", price: "$12.89" },
    ],
    faqs: [
      {
        question: "How far is Maza from Queen Creek?",
        answer:
          "Maza is at 3491 W Frye Rd in Chandler, west of Queen Creek via Riggs Rd or Chandler Heights Rd to the I-10. Check your maps for the current drive time from your neighborhood.",
      },
      FAQ_HALAL,
      deliveryFaq("Queen Creek"),
      FAQ_HOURS,
    ],
    image: "/images/maza/menu/opt-ribeye-tikka-wrap-vertical.jpg",
    imageAlt: "Mediterranean food near Queen Creek Arizona from Maza Mediterranean Cuisine",
    keywords: ["Mediterranean food near Queen Creek", "halal food Queen Creek", "family restaurant near Queen Creek"],
  },
  {
    slug: "ocotillo",
    city: "Ocotillo",
    h1: "Mediterranean Food Near Ocotillo, Chandler AZ",
    title: "Mediterranean Food Near Ocotillo, Chandler | Maza Mediterranean Cuisine",
    description:
      "Halal Mediterranean food minutes from Ocotillo — Maza at 3491 W Frye Rd, Suite 2, Chandler. Plates $16.55–$28.99, wraps from $9.35, open Tue–Sun.",
    hook: "Ocotillo is Maza's closest neighborhood — the restaurant sits at 3491 W Frye Rd, Suite 2, minutes from the Ocotillo golf corridor. Wraps run $9.35 to $14.89, and plates are $16.55 to $28.99 with two kebabs, rice, salad, baba ghanoush, and hummus + tahini.",
    intro:
      "This is the order-instead-of-cooking option for Ocotillo households: a full halal grill five minutes away, open until 10pm Tuesday through Sunday, with pickup ready by phone.",
    directions:
      "Maza is at 3491 W Frye Rd, Suite 2 — take Frye Rd or Chandler Blvd toward the I-10 and turn into the plaza; parking is free on site.",
    priceHeading: "What Ocotillo orders",
    priceRows: [
      { label: "Beef Gyro Wrap", price: "$10.91" },
      { label: "Chicken Tikka Wrap", price: "$11.43" },
      { label: "Mix Kebab Plate", price: "$20.71" },
      { label: "Tepsi Baytinijan", price: "$20.00", note: "Iraqi eggplant casserole served over rice" },
    ],
    faqs: [
      {
        question: "Is Maza close to Ocotillo?",
        answer:
          "Yes — Maza is at 3491 W Frye Rd, Suite 2, minutes from the Ocotillo area in Chandler, with free parking in the plaza lot. Call (480) 534-6550 for pickup.",
      },
      FAQ_HALAL,
      FAQ_HOURS,
      FAQ_PARKING,
    ],
    image: "/images/maza/menu/opt-mix-kebab-plate.jpg",
    imageAlt: "Mediterranean food near Ocotillo Chandler Arizona at Maza Mediterranean Cuisine",
    keywords: ["Mediterranean food Ocotillo", "restaurants near Ocotillo Chandler", "halal food Ocotillo"],
  },
];

export const NEIGHBORHOOD_SLUGS = NEIGHBORHOOD_PAGES.map((p) => p.slug);

export function getNeighborhood(slug: string): NeighborhoodPage | undefined {
  return NEIGHBORHOOD_PAGES.find((p) => p.slug === slug);
}
