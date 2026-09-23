/**
 * SEO Bible §3.1 "Core 30" — offering pages.
 *
 * One page per real offering on Maza's Google Business Profile / register menu.
 * Frank's steer (2026-09-11): GBP structure mirrors the site's overarching menu
 * sections (Plates, Wraps, Sides, ...), and muhammara is OUT of scope.
 *
 * Every price below is lifted verbatim from the register menu
 * (data/menu.ts, generated from menu.json). Do not invent numbers here — if the
 * register changes, re-generate data/menu.ts and update the matching rows.
 */

export type PriceRow = {
  label: string;
  price: string;
  note?: string;
};

export type Faq = {
  question: string;
  answer: string;
};

export type OfferingPage = {
  slug: string;
  /** Exact-match H1. */
  h1: string;
  title: string;
  description: string;
  /** Data hook — must land in the first 100 words of the page (Bible §2.2). */
  hook: string;
  intro: string;
  priceHeading: string;
  priceRows: PriceRow[];
  faqs: Faq[];
  /** Internal link back to the matching menu category. */
  menuPath: string;
  menuLabel: string;
  /** Menu section name used for MenuSection JSON-LD. */
  menuSection: string;
  image?: string;
  imageAlt?: string;
  /** Neighborhood-intent pages skip the price table when false. */
  keywords: string[];
};

/** Answers reused across pages — single source so they cannot drift. */
const FAQ_HOURS: Faq = {
  question: "What are Maza's hours?",
  answer:
    "Maza Mediterranean Cuisine is open Tuesday through Sunday, 10am–10pm. We are closed Mondays.",
};
const FAQ_HALAL: Faq = {
  question: "Is the meat halal?",
  answer:
    "Yes. All of our meat is halal-certified — beef, lamb, chicken, and ribeye included.",
};
const FAQ_PARKING: Faq = {
  question: "Is there parking?",
  answer:
    "Yes — free parking in the plaza lot at 3491 W Frye Rd, Suite 2, Chandler, AZ 85226.",
};
const FAQ_ORDER: Faq = {
  question: "How do I order?",
  answer:
    "Call (480) 534-6550 for pickup, or order delivery through DoorDash, Uber Eats, or Grubhub.",
};

export const OFFERING_PAGES: OfferingPage[] = [
  {
    slug: "halal-mediterranean-chandler",
    h1: "Halal Mediterranean Restaurant in Chandler, AZ",
    title: "Halal Mediterranean Restaurant in Chandler, AZ | Maza",
    description:
      "Maza is a halal-certified Mediterranean restaurant at 3491 W Frye Rd, Chandler. Plates $16.55–$28.99, two kebabs each, rice, salad, baba ghanoush + hummus. Open Tue–Sun 10am–10pm.",
    hook: "Every cut of meat at Maza is halal-certified — beef and lamb gyro, shish kebab, chicken tikka, lamb tikka, and ribeye tikka, all grilled to order at 3491 W Frye Rd, Suite 2 in Chandler. Plates run $16.55 to $28.99 and land with two kebabs, rice, salad, baba ghanoush, and hummus + tahini.",
    intro:
      "Maza is family-owned, and the kitchen cooks Mediterranean and Middle Eastern food the way it is eaten at home — big portions, real ingredients, honest prices. Dine in, take it to go, or have it delivered across Chandler and the East Valley.",
    priceHeading: "What a plate costs at Maza",
    priceRows: [
      { label: "Falafel Plate", price: "$16.55", note: "Falafel, pita, salad, baba ghanoush & hummus + tahini" },
      { label: "Chicken Shish Kebab Plate", price: "$19.67", note: "2 kebabs, pita, rice, salad, baba ghanoush & hummus + tahini" },
      { label: "Beef + Lamb Shish Kebab Plate", price: "$20.19", note: "2 kebabs, pita, rice, salad, baba ghanoush & hummus + tahini" },
      { label: "Mix Kebab Plate", price: "$20.71", note: "1 chicken shish kebab + 1 beef & lamb shish kebab" },
      { label: "Maza Grill", price: "$27.99", note: "Chicken tikka, beef & lamb shish kebab, chicken shish kebab" },
      { label: "Beef Gyro Wrap", price: "$10.91", note: "Served on pita or as a wrap" },
    ],
    faqs: [
      FAQ_HALAL,
      {
        question: "Where exactly is Maza?",
        answer:
          "3491 W Frye Rd, Suite 2, Chandler, AZ 85226 — in the plaza just off the I-10 and Chandler Blvd corridor, a few minutes from the Price Road tech corridor.",
      },
      FAQ_HOURS,
      FAQ_ORDER,
    ],
    menuPath: "/menu",
    menuLabel: "the full menu",
    menuSection: "Plates",
    image: "/images/maza/hero-brand-1920.jpg",
    imageAlt: "Maza Mediterranean Cuisine halal restaurant in Chandler Arizona",
    keywords: [
      "halal restaurant Chandler AZ",
      "halal Mediterranean food Chandler",
      "halal food near me Chandler",
    ],
  },
  {
    slug: "gyro",
    h1: "Beef Gyro in Chandler, AZ",
    title: "Beef Gyro in Chandler, AZ | $10.91 | Maza Mediterranean",
    description:
      "Maza's beef gyro is $10.91 on pita or as a wrap, with hummus, tomato, onion, lettuce, pickle and garlic sauce. Halal-certified, made to order in Chandler, AZ.",
    hook: "Maza's beef gyro is $10.91 — served on pita or rolled as a wrap, with hummus, tomato, onion, lettuce, pickle, and garlic sauce. The same gyro meat runs $12.89 on our loaded fries and loaded hummus, both of which take up to three sauces.",
    intro:
      "The gyro cone is a staple for a reason: thin-sliced, well-seasoned beef with enough fat to stay juicy on the flat top. At Maza it is halal-certified and carved to order, not held under a heat lamp.",
    priceHeading: "Gyro on the register",
    priceRows: [
      { label: "Beef Gyro", price: "$10.91", note: "On pita or as a wrap" },
      { label: "Loaded Fries — Gyro", price: "$12.89", note: "Choose up to 3 sauces" },
      { label: "Loaded Hummus — Gyro", price: "$12.89", note: "Choose up to 3 sauces" },
      { label: "Combo Upgrade", price: "$4.99", note: "Adds fries + drink to any meal" },
    ],
    faqs: [
      {
        question: "What comes on the gyro?",
        answer:
          "Hummus, tomato, onion, lettuce, pickle, and garlic sauce — served on pita or as a wrap.",
      },
      FAQ_HALAL,
      FAQ_ORDER,
      FAQ_PARKING,
    ],
    menuPath: "/menu/wraps",
    menuLabel: "wraps",
    menuSection: "Wraps",
    image: "/images/maza/menu/opt-beef-gyro.jpg",
    imageAlt: "Beef gyro wrap at Maza Mediterranean Cuisine in Chandler AZ",
    keywords: ["beef gyro Chandler", "gyro near me Chandler AZ", "halal gyro Chandler"],
  },
  {
    slug: "shish-kebab",
    h1: "Shish Kebab in Chandler, AZ",
    title: "Shish Kebab Plate & Wrap | Chandler, AZ | Maza Mediterranean",
    description:
      "Halal shish kebab in Chandler — beef + lamb plate $20.19, chicken shish kebab plate $19.67, wraps $12.99. Two kebabs, rice, salad, baba ghanoush + hummus.",
    hook: "A Maza shish kebab plate is $20.19 for beef + lamb or $19.67 for chicken, and every plate carries two full kebabs plus pita, rice, salad, baba ghanoush, and hummus + tahini. Prefer it handheld? Both kebabs are available as a $12.99 wrap.",
    intro:
      "Shish kebab is cubed, marinated, and grilled on the skewer — no filler, no binder. The beef + lamb mix is the classic; the chicken shish is the lighter order and the one that travels best as a wrap.",
    priceHeading: "Shish kebab pricing",
    priceRows: [
      { label: "Beef + Lamb Shish Kebab Plate", price: "$20.19", note: "2 kebabs, pita, rice, salad, baba ghanoush & hummus + tahini" },
      { label: "Chicken Shish Kebab Plate", price: "$19.67", note: "2 kebabs, pita, rice, salad, baba ghanoush & hummus + tahini" },
      { label: "Beef + Lamb Shish Kebab Wrap", price: "$12.99" },
      { label: "Chicken Shish Kebab Wrap", price: "$12.99" },
    ],
    faqs: [
      {
        question: "What is the difference between shish kebab and tikka at Maza?",
        answer:
          "Both are grilled on the skewer with real marinade. Shish kebab is the traditional cubed kebab; tikka is the same grill style cut and seasoned for a more tender bite. Plates of either come with two skewers and the same sides.",
      },
      FAQ_HALAL,
      FAQ_HOURS,
      FAQ_ORDER,
    ],
    menuPath: "/menu/plates",
    menuLabel: "plates",
    menuSection: "Plates",
    image: "/images/maza/menu/opt-beef-shish-plate.jpg",
    imageAlt: "Beef and lamb shish kebab plate at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["shish kebab Chandler AZ", "chicken shish kebab Chandler", "halal kebab Chandler"],
  },
  {
    slug: "chicken-tikka",
    h1: "Chicken Tikka Plate & Wrap in Chandler, AZ",
    title: "Chicken Tikka Plate $19.67 | Chandler, AZ | Maza Mediterranean",
    description:
      "Chicken tikka in Chandler — $19.67 plate with 2 skewers, pita, rice, salad, baba ghanoush + hummus, or $11.43 as a wrap. Halal-certified.",
    hook: "Maza's chicken tikka plate is $19.67 and comes with two skewers, pita, rice, salad, baba ghanoush, and hummus + tahini. The same chicken tikka is $11.43 wrapped with hummus, tomato, onion, lettuce, pickle, and garlic sauce.",
    intro:
      "Chicken tikka is the most-ordered thing on the Maza grill — marinated thigh meat, charred at the edges, still juicy in the middle. It is also the cheapest way into a full plate of food on the menu.",
    priceHeading: "Chicken tikka pricing",
    priceRows: [
      { label: "Chicken Tikka Plate", price: "$19.67", note: "2 chicken tikka, pita, rice, salad, baba ghanoush & hummus + tahini" },
      { label: "Chicken Tikka Wrap", price: "$11.43" },
      { label: "Maza Grill", price: "$27.99", note: "Includes 1 chicken tikka + 2 other kebabs" },
      { label: "Combo Upgrade", price: "$4.99", note: "Adds fries + drink" },
    ],
    faqs: [
      {
        question: "Is chicken tikka spicy?",
        answer:
          "No — it is seasoned and grilled, not heat-forward. Any heat on the plate comes from the sauces you choose, and sauces are served on the side on request.",
      },
      FAQ_HALAL,
      FAQ_ORDER,
      FAQ_PARKING,
    ],
    menuPath: "/menu/plates",
    menuLabel: "plates",
    menuSection: "Plates",
    image: "/images/maza/menu/opt-chicken-tikka-plate.jpg",
    imageAlt: "Chicken tikka plate with rice and salad at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["chicken tikka Chandler AZ", "chicken tikka plate Chandler", "halal chicken Chandler"],
  },
  {
    slug: "lamb-tikka",
    h1: "Lamb Tikka Plate & Wrap in Chandler, AZ",
    title: "Lamb Tikka Plate $20.71 | Chandler, AZ | Maza Mediterranean",
    description:
      "Lamb tikka in Chandler — $20.71 plate with two skewers, pita, rice, salad, baba ghanoush + hummus, or $13.51 as a wrap. Halal-certified.",
    hook: "Lamb tikka at Maza is $20.71 for a plate — two skewers, pita, rice, salad, baba ghanoush, and hummus + tahini — or $13.51 as a wrap. It is marinated overnight and grilled to order, which is why the lamb keeps its bite without going dry.",
    intro:
      "Lamb is the least forgiving thing on a grill and the one most worth ordering from a kitchen that cooks it every day. Ask for it medium if you want it pink at the center.",
    priceHeading: "Lamb tikka pricing",
    priceRows: [
      { label: "Lamb Tikka Plate", price: "$20.71", note: "2 lamb tikka, pita, rice, salad, baba ghanoush & hummus + tahini" },
      { label: "Lamb Tikka Wrap", price: "$13.51" },
      { label: "Family Meal", price: "$87.49", note: "Includes 2 lamb tikka among 10 skewers" },
    ],
    faqs: [
      {
        question: "How is the lamb tikka cooked?",
        answer:
          "Marinated, then grilled on the skewer to order. Ask for it medium if you prefer it pink in the middle.",
      },
      FAQ_HALAL,
      FAQ_HOURS,
      FAQ_ORDER,
    ],
    menuPath: "/menu/plates",
    menuLabel: "plates",
    menuSection: "Plates",
    image: "/images/maza/menu/opt-lamb-tikka-plate.jpg",
    imageAlt: "Lamb tikka plate at Maza Mediterranean Cuisine in Chandler AZ",
    keywords: ["lamb tikka Chandler AZ", "lamb kebab Chandler", "halal lamb Chandler"],
  },
  {
    slug: "ribeye-tikka",
    h1: "Ribeye Tikka Plate & Wrap in Chandler, AZ",
    title: "Ribeye Tikka Plate $24.87 | Chandler, AZ | Maza Mediterranean",
    description:
      "Ribeye tikka in Chandler — $24.87 plate with two skewers, pita, rice, salad, baba ghanoush + hummus, or $14.55 as a wrap. Halal-certified ribeye.",
    hook: "Ribeye tikka is the top of the Maza grill at $24.87 for a plate of two skewers with pita, rice, salad, baba ghanoush, and hummus + tahini. It is also available as a $14.55 wrap — real ribeye, halal-certified, cut and grilled to order.",
    intro:
      "Ribeye is more marbled than the standard kebab cuts, so it eats richer and needs less sauce. If you are ordering one thing to judge the grill by, this is it.",
    priceHeading: "Ribeye tikka pricing",
    priceRows: [
      { label: "Ribeye Tikka Plate", price: "$24.87", note: "2 ribeye tikka, pita, rice, salad, baba ghanoush & hummus + tahini" },
      { label: "Ribeye Tikka Wrap", price: "$14.55" },
      { label: "Family Meal", price: "$87.49", note: "Includes 2 ribeye tikka among 10 skewers" },
    ],
    faqs: [
      {
        question: "Is the ribeye tikka a steak?",
        answer:
          "It is real ribeye, cut down and skewered, then grilled to order — the same cut and marbling as a steak, served kebab-style with rice, salad, pita, baba ghanoush, and hummus + tahini.",
      },
      FAQ_HALAL,
      FAQ_HOURS,
      FAQ_ORDER,
    ],
    menuPath: "/menu/plates",
    menuLabel: "plates",
    menuSection: "Plates",
    image: "/images/maza/menu/opt-ribeye-tikka-wrap-vertical.jpg",
    imageAlt: "Ribeye tikka wrap at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["ribeye tikka Chandler AZ", "ribeye kebab Chandler", "steak kebab Chandler"],
  },
  {
    slug: "mix-kebab",
    h1: "Mix Kebab Plate in Chandler, AZ",
    title: "Mix Kebab Plate $20.71 | Chandler, AZ | Maza Mediterranean",
    description:
      "The Maza Mix Kebab is $20.71 — one chicken shish kebab and one beef + lamb shish kebab with pita, rice, salad, baba ghanoush and hummus + tahini.",
    hook: "Maza's Mix Kebab is $20.71 and puts one chicken shish kebab and one beef + lamb shish kebab on the same plate, plus pita, rice, salad, baba ghanoush, and hummus + tahini. It is the order that answers \"which one do I get?\" for the price of a single-kebab plate plus change.",
    intro:
      "Two proteins, one plate, no compromise. It is the most useful order for a first visit — and the one our regulars steer new tables toward.",
    priceHeading: "Mix Kebab pricing",
    priceRows: [
      { label: "Mix Kebab", price: "$20.71", note: "1 chicken shish kebab + 1 beef & lamb shish kebab, pita, rice, salad, baba ghanoush & hummus + tahini" },
      { label: "Maza Grill", price: "$27.99", note: "Three-kebab version with chicken tikka" },
      { label: "Family Meal", price: "$87.49", note: "Ten skewers, feeds a crowd" },
    ],
    faqs: [
      {
        question: "Can I swap the kebabs in the Mix Kebab?",
        answer:
          "The Mix Kebab is set as chicken shish kebab plus beef + lamb shish kebab. If you want different skewers, build it from the Plates section or ask at the counter and we will tell you what the kitchen can do that day.",
      },
      FAQ_HALAL,
      FAQ_HOURS,
      FAQ_ORDER,
    ],
    menuPath: "/menu/plates",
    menuLabel: "plates",
    menuSection: "Plates",
    image: "/images/maza/menu/opt-mix-kebab-plate.jpg",
    imageAlt: "Mix kebab plate with chicken and beef lamb kebabs at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["mix kebab Chandler AZ", "mixed grill Chandler", "kebab plate Chandler"],
  },
  {
    slug: "maza-grill",
    h1: "Maza Grill — Three-Kebab Plate in Chandler, AZ",
    title: "Maza Grill Plate $27.99 | Chandler, AZ | Maza Mediterranean",
    description:
      "The Maza Grill is $27.99 — chicken tikka, beef + lamb shish kebab and chicken shish kebab with pita, rice, salad, baba ghanoush and hummus.",
    hook: "The Maza Grill is $27.99 and stacks three skewers on one plate: chicken tikka, beef + lamb shish kebab, and chicken shish kebab, with pita, rice, salad, baba ghanoush, and hummus. It is the biggest single plate we serve, and the closest thing to ordering the whole grill.",
    intro:
      "Built for two people who cannot agree, or one person who is genuinely hungry. Everything on it comes off the same chargrill as the individual kebab plates.",
    priceHeading: "Maza Grill pricing",
    priceRows: [
      { label: "Maza Grill", price: "$27.99", note: "1 chicken tikka, 1 beef & lamb shish kebab, 1 chicken shish kebab, pita, rice, salad, baba ghanoush & hummus" },
      { label: "Mix Kebab", price: "$20.71", note: "Two-kebab version" },
      { label: "Maza Special", price: "$48.45", note: "Four skewers + 2 pita, rice, sides — feeds 2–3" },
    ],
    faqs: [
      {
        question: "How many people does the Maza Grill feed?",
        answer:
          "It is a very large single plate. One hungry person can finish it; most people split it between two, or add a wrap and feed three.",
      },
      FAQ_HALAL,
      FAQ_HOURS,
      FAQ_ORDER,
    ],
    menuPath: "/menu/plates",
    menuLabel: "plates",
    menuSection: "Plates",
    image: "/images/maza/menu/opt-chicken-shish-plate.jpg",
    imageAlt: "Maza Grill three kebab plate at Maza Mediterranean Cuisine in Chandler AZ",
    keywords: ["Maza Grill Chandler", "three kebab plate Chandler AZ", "mixed grill platter Chandler"],
  },
  {
    slug: "falafel",
    h1: "Falafel in Chandler, AZ",
    title: "Falafel Plate $16.55, Wrap $9.35 | Chandler, AZ | Maza Mediterranean",
    description:
      "Halal falafel in Chandler — $16.55 plate with pita, salad, baba ghanoush + hummus, $9.35 wrap, or $3.99 for a 4-piece side.",
    hook: "Maza's falafel is $16.55 as a plate with pita, salad, baba ghanoush, and hummus + tahini, $9.35 rolled as a wrap with hummus and garlic sauce, and $3.99 for a four-piece side. It is the vegetarian order on the menu that regulars who eat meat still steal.",
    intro:
      "Falafel is fried to order so the shell stays crisp and the middle stays green and soft. It is also the base of our Appetizer Plate and one of the three fillings for loaded hummus.",
    priceHeading: "Falafel pricing",
    priceRows: [
      { label: "Falafel Plate", price: "$16.55", note: "Falafel, pita, salad, baba ghanoush & hummus + tahini" },
      { label: "Falafel Wrap", price: "$9.35" },
      { label: "Falafel (4pc) Side", price: "$3.99" },
      { label: "Appetizer Plate", price: "$15.51", note: "Hummus + tahini, dolma, falafel, baba ghanoush, pita and salad" },
    ],
    faqs: [
      {
        question: "Is the falafel vegan?",
        answer:
          "The falafel itself is made from chickpeas and herbs and contains no animal products. The plate and wrap are served with hummus, baba ghanoush, and tahini — all plant-based. Ask for no yogurt-based sauces if you want the whole order vegan.",
      },
      {
        question: "Is the falafel fried fresh?",
        answer: "Yes — fried to order, which is why it stays crisp instead of steaming in a tray.",
      },
      FAQ_ORDER,
      FAQ_PARKING,
    ],
    menuPath: "/menu/plates",
    menuLabel: "plates",
    menuSection: "Plates",
    image: "/images/maza/menu/opt-falafel-side.jpg",
    imageAlt: "Falafel with hummus and tahini at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["falafel Chandler AZ", "falafel wrap Chandler", "vegan falafel Chandler"],
  },
  {
    slug: "arayes",
    h1: "Arayes Lahm or Dajaj in Chandler, AZ",
    title: "Arayes $15.55 | Chandler, AZ | Maza Mediterranean",
    description:
      "Arayes Lahm or Dajaj at Maza — $15.55 for a flat grilled sandwich with cheese, beef + lamb or chicken, served with salad. Halal-certified in Chandler, AZ.",
    hook: "Arayes is $15.55 at Maza — a flat-grilled pita sandwich packed with seasoned beef + lamb or chicken and cheese, pressed on the grill until the outside crisps and the filling melts. It comes with a salad, and it is the item on the menu most people have never ordered anywhere else.",
    intro:
      "Arayes is street food across the Levant: pita, spiced meat, heat, and pressure. Ours is grilled to order rather than griddled ahead, so the bread never goes soggy.",
    priceHeading: "Arayes pricing",
    priceRows: [
      { label: "Arayes Lahm or Dajaj", price: "$15.55", note: "Flat grilled sandwich with cheese. Choose beef + lamb or chicken. Served with salad." },
      { label: "Falafel Wrap", price: "$9.35", note: "Lighter, handheld alternative" },
      { label: "Maza Salad", price: "$13.99", note: "Choose chicken or steak" },
    ],
    faqs: [
      {
        question: "What is arayes?",
        answer:
          "Arayes is a pita stuffed with seasoned meat and cheese, then flat-grilled so the bread crisps and the filling melts. At Maza you choose beef + lamb or chicken, and it comes with a salad.",
      },
      FAQ_HALAL,
      FAQ_HOURS,
      FAQ_ORDER,
    ],
    menuPath: "/menu/wraps",
    menuLabel: "wraps",
    menuSection: "Wraps",
    image: "/images/maza/menu/opt-arayes-lahm-vertical.jpg",
    imageAlt: "Arayes flat grilled pita sandwich at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["arayes Chandler AZ", "arayes near me", "Middle Eastern sandwich Chandler"],
  },
  {
    slug: "burgers",
    h1: "Burgers in Chandler, AZ",
    title: "Halal Burgers $12.47 | Chandler, AZ | Maza Mediterranean",
    description:
      "Halal burgers in Chandler — beef burger and grilled chicken burger, both $12.47, handmade in house and never frozen. Kids options $11.85 with fries.",
    hook: "Every burger at Maza is $12.47 — the beef burger and the grilled chicken burger alike — and both are handmade in house and never frozen. Kids' versions, an all-beef burger or a crispy chicken sandwich, are $11.85 and come with fries.",
    intro:
      "The burger is the sleeper order at a Mediterranean restaurant, which is exactly why we make it properly: a hand-formed patty, halal beef, on a toasted bun. No freezer, no pre-formed puck.",
    priceHeading: "Burger pricing",
    priceRows: [
      { label: "Beef Burger", price: "$12.47", note: "Handmade in house, never frozen" },
      { label: "Grilled Chicken Burger", price: "$12.47", note: "Handmade in house, never frozen" },
      { label: "Kids All Beef Burger", price: "$11.85", note: "Kids meal — comes with fries" },
      { label: "Combo Upgrade", price: "$4.99", note: "Adds fries + drink" },
    ],
    faqs: [
      FAQ_HALAL,
      {
        question: "Are the burgers frozen patties?",
        answer:
          "No. Both the beef burger and the grilled chicken burger are handmade in house and never frozen.",
      },
      FAQ_ORDER,
      FAQ_PARKING,
    ],
    menuPath: "/menu/burgers",
    menuLabel: "burgers",
    menuSection: "Burgers",
    image: "/images/maza/menu/opt-grilled-chicken-burger.jpg",
    imageAlt: "Halal grilled chicken burger at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["halal burger Chandler AZ", "burger near me Chandler", "beef burger Chandler AZ"],
  },
  {
    slug: "loaded-fries",
    h1: "Loaded Fries in Chandler, AZ",
    title: "Loaded Fries $11.49–$12.89 | Chandler, AZ | Maza Mediterranean",
    description:
      "Maza loaded fries in Chandler — shredded chicken $11.49, shredded steak or gyro $12.89, with up to three sauces. Halal-certified.",
    hook: "Loaded fries at Maza start at $11.49 for shredded chicken and run $12.89 for shredded steak or gyro. Each order takes up to three sauces from tahini, garlic sauce, sriracha mayo, Maza special sauce, and pomegranate molasses — and you can get the sauces on the side.",
    intro:
      "Fries, meat, sauce, repeat. It is the fastest thing on the menu and the easiest share for a table waiting on a grill order.",
    priceHeading: "Loaded fries pricing",
    priceRows: [
      { label: "Loaded Fries — Shredded Chicken", price: "$11.49", note: "Choose up to 3 sauces" },
      { label: "Loaded Fries — Shredded Steak", price: "$12.89", note: "Choose up to 3 sauces" },
      { label: "Loaded Fries — Gyro", price: "$12.89", note: "Choose up to 3 sauces" },
      { label: "Side Fries", price: "$3.49" },
    ],
    faqs: [
      {
        question: "Which sauces can I choose?",
        answer:
          "Tahini, garlic sauce, sriracha mayo, Maza special sauce, and pomegranate molasses — up to three per order. Sauce on the side is available on request.",
      },
      FAQ_HALAL,
      FAQ_ORDER,
      FAQ_HOURS,
    ],
    menuPath: "/menu",
    menuLabel: "the full menu",
    menuSection: "Loaded Fries",
    image: "/images/maza/menu/opt-loaded-fries-gyro.jpg",
    imageAlt: "Loaded fries with gyro meat and sauce at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["loaded fries Chandler AZ", "gyro fries Chandler", "loaded fries near me"],
  },
  {
    slug: "loaded-hummus",
    h1: "Loaded Hummus in Chandler, AZ",
    title: "Loaded Hummus $11.49–$12.89 | Chandler, AZ | Maza Mediterranean",
    description:
      "Loaded hummus in Chandler — shredded chicken $11.49, shredded steak or gyro $12.89, over hummus with up to three sauces. Halal-certified.",
    hook: "Loaded hummus is $11.49 with shredded chicken, or $12.89 with shredded steak or gyro, spooned over a full bowl of hummus and finished with up to three sauces. It is the order that turns an appetizer into a meal, and it travels well for pickup.",
    intro:
      "The hummus is the same tahini-forward bowl that comes with the plates — it just gets a full portion of meat on top instead of a scoop on the side.",
    priceHeading: "Loaded hummus pricing",
    priceRows: [
      { label: "Loaded Hummus — Shredded Chicken", price: "$11.49", note: "Choose up to 3 sauces" },
      { label: "Loaded Hummus — Shredded Steak", price: "$12.89", note: "Choose up to 3 sauces" },
      { label: "Loaded Hummus — Gyro", price: "$12.89", note: "Choose up to 3 sauces" },
      { label: "Hummus with tahini and pita", price: "$5.99" },
    ],
    faqs: [
      {
        question: "Is the hummus vegetarian?",
        answer:
          "Plain hummus with tahini and pita is $5.99 and is vegetarian. The loaded versions add shredded chicken, shredded steak, or gyro on top.",
      },
      FAQ_HALAL,
      FAQ_ORDER,
      FAQ_PARKING,
    ],
    menuPath: "/menu",
    menuLabel: "the full menu",
    menuSection: "Loaded Hummus",
    image: "/images/maza/menu/opt-loaded-hummus-chicken.jpg",
    imageAlt: "Loaded hummus with shredded chicken at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["loaded hummus Chandler", "hummus Chandler AZ", "Mediterranean appetizer Chandler"],
  },
  {
    slug: "hummus-and-baba-ghanoush",
    h1: "Hummus & Baba Ghanoush in Chandler, AZ",
    title: "Hummus & Baba Ghanoush | Chandler, AZ | Maza Mediterranean",
    description:
      "House hummus with tahini and pita $5.99, baba ghanoush and tzatziki from $1.99. Halal Mediterranean dips made in house in Chandler, AZ.",
    hook: "Hummus with tahini and pita is $5.99 at Maza; baba ghanoush and tzatziki come in at $1.99 for a small and $4.99 for a large. Both are made in house — the baba ghanoush is roasted eggplant, smoky and loose, not a pureed paste out of a tub.",
    intro:
      "These are the dips that come with the plates, ordered on their own. Order a spread of two or three for the table and ask for extra pita.",
    priceHeading: "Dip pricing",
    priceRows: [
      { label: "Hummus with tahini and pita", price: "$5.99" },
      { label: "Baba Ghanoush", price: "SM $1.99 | LG $4.99" },
      { label: "Tzatziki", price: "SM $1.99 | LG $4.99" },
      { label: "Pita", price: "$1.25" },
    ],
    faqs: [
      {
        question: "Are the dips made in house?",
        answer:
          "Yes — the hummus, baba ghanoush, and tzatziki are all made in house. The plates come with baba ghanoush and hummus + tahini as standard sides.",
      },
      {
        question: "Which dips are vegan?",
        answer:
          "Hummus and baba ghanoush are plant-based. Tzatziki is yogurt-based, so it is vegetarian rather than vegan.",
      },
      FAQ_ORDER,
      FAQ_PARKING,
    ],
    menuPath: "/menu/sides",
    menuLabel: "sides",
    menuSection: "Sides",
    image: "/images/maza/menu/opt-hummus-pita.jpg",
    imageAlt: "Hummus with tahini and pita at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["hummus Chandler AZ", "baba ghanoush Chandler", "Mediterranean dips Chandler"],
  },
  {
    slug: "mezze-platter",
    h1: "Mezze & Appetizers in Chandler, AZ",
    title: "Mezze Platter & Appetizers | Chandler, AZ | Maza Mediterranean",
    description:
      "Maza mezze in Chandler — Appetizer Plate $15.51, dolma $5.99, sambusah $9.49, kibbeh $11.99. Halal Mediterranean starters made in house.",
    hook: "The Maza Appetizer Plate is $15.51 and lands with hummus + tahini, dolma, falafel, baba ghanoush, pita, and salad. Ordering separately, dolma is $5.99, sambusah (2pc) is $9.49, and kibbeh (3pc) is $11.99.",
    intro:
      "This is the part of a Mediterranean menu that is easiest to get wrong and hardest to fake — stuffed grape leaves, fried pastry, and bulgur shells, all rolled by hand in the kitchen.",
    priceHeading: "Mezze and appetizer pricing",
    priceRows: [
      { label: "Appetizer Plate", price: "$15.51", note: "Hummus + tahini, dolma, falafel, baba ghanoush, 1 pita and salad" },
      { label: "Dolma", price: "$5.99", note: "Stuffed grape leaves" },
      { label: "Sambusah (2pc)", price: "$9.49" },
      { label: "Kibbeh (3pc)", price: "$11.99" },
      { label: "Falafel (4pc)", price: "$3.99" },
    ],
    faqs: [
      {
        question: "What is on the Appetizer Plate?",
        answer:
          "Hummus + tahini, dolma, falafel, baba ghanoush, one pita, and salad — $15.51. It is the fastest way to try the mezze side of the menu.",
      },
      {
        question: "What is sambusah?",
        answer:
          "Sambusah is a thin fried pastry filled with seasoned meat — a Middle Eastern savoury pastry, served two pieces for $9.49.",
      },
      FAQ_ORDER,
      FAQ_HOURS,
    ],
    menuPath: "/menu/sides",
    menuLabel: "sides",
    menuSection: "Sides",
    image: "/images/maza/menu/opt-appetizer-plate.jpg",
    imageAlt: "Mezze appetizer plate with hummus dolma falafel and baba ghanoush at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["mezze Chandler AZ", "Mediterranean appetizers Chandler", "dolma Chandler"],
  },
  {
    slug: "tabouleh-and-salads",
    h1: "Tabouleh & Salads in Chandler, AZ",
    title: "Tabouleh & Salads | Chandler, AZ | Maza Mediterranean",
    description:
      "Maza salads in Chandler — tabouleh $4.99, side salad $3.99, Maza Salad with chicken or steak $13.99. Fresh, halal Mediterranean in Chandler, AZ.",
    hook: "Tabouleh is $4.99 at Maza, a side salad is $3.99, and the Maza Salad — with your choice of chicken or steak — is $13.99. All three are built with the same parsley, lemon, and olive oil that dresses every plate on the menu.",
    intro:
      "The salads here are not garnish. The Maza Salad with chicken or steak is a full meal, and the tabouleh is heavy on parsley rather than bulgur, the way it should be.",
    priceHeading: "Salad pricing",
    priceRows: [
      { label: "Maza Salad", price: "$13.99", note: "Choose chicken or steak" },
      { label: "Tabouleh", price: "$4.99" },
      { label: "Side Salad", price: "$3.99" },
      { label: "Falafel Plate", price: "$16.55", note: "Comes with salad, baba ghanoush & hummus + tahini" },
    ],
    faqs: [
      {
        question: "Can the Maza Salad come vegetarian?",
        answer:
          "The Maza Salad is priced with chicken or steak. For a vegetarian plate, the Falafel Plate at $16.55 or the Appetizer Plate at $15.51 are the better orders.",
      },
      FAQ_HALAL,
      FAQ_ORDER,
      FAQ_HOURS,
    ],
    menuPath: "/menu/sides",
    menuLabel: "sides",
    menuSection: "Sides",
    image: "/images/maza/menu/opt-tabouleh.jpg",
    imageAlt: "Tabouleh and fresh salads at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["tabouleh Chandler AZ", "Mediterranean salad Chandler", "healthy lunch Chandler AZ"],
  },
  {
    slug: "baklava",
    h1: "Baklava in Chandler, AZ",
    title: "Baklava $3.99 — Cashew & Pistachio | Chandler, AZ | Maza",
    description:
      "Cashew and pistachio baklava, $3.99 each, at Maza Mediterranean Cuisine in Chandler, AZ. Layered phyllo, honey syrup, made in house.",
    hook: "Maza serves two baklava, cashew and pistachio, and both are $3.99. They are built the same way: layer on layer of phyllo, brushed and baked, then finished with syrup — the kind of dessert that is a fifteen-bite job and worth ordering two of.",
    intro:
      "Baklava is the standard close to a Mediterranean meal, and we keep both the cashew and the pistachio version so nobody has to split one.",
    priceHeading: "Baklava pricing",
    priceRows: [
      { label: "Cashew Baklava", price: "$3.99" },
      { label: "Pistachio Baklava", price: "$3.99" },    ],
    faqs: [
      {
        question: "Which baklava should I get?",
        answer:
          "Cashew is the milder, sweeter one; pistachio is nuttier and a little less sweet. They are both $3.99, so the honest answer is to get one of each.",
      },
      {
        question: "Does baklava contain dairy?",
        answer:
          "Traditional baklava is phyllo, nuts, and syrup. Ask at the counter if you are avoiding dairy or nuts — the kitchen can confirm the current batch.",
      },
      FAQ_ORDER,
      FAQ_HOURS,
    ],
    menuPath: "/menu/desserts-drinks",
    menuLabel: "desserts & drinks",
    menuSection: "Baklava",
    image: "/images/maza/menu/opt-baklava.jpg",
    imageAlt: "Cashew and pistachio baklava at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["baklava Chandler AZ", "pistachio baklava Chandler", "Middle Eastern dessert Chandler"],
  },
  {
    slug: "tepsi-baytinijan",
    h1: "Tepsi Baytinijan in Chandler, AZ",
    title: "Tepsi Baytinijan $20.00 | Chandler, AZ | Maza Mediterranean",
    description:
      "Tepsi Baytinijan at Maza — $20.00 Iraqi eggplant casserole with eggplant, potato, tomato, onion and seasoned meat, served over rice. Chandler, AZ.",
    hook: "Tepsi Baytinijan is $20.00 at Maza: an Iraqi eggplant casserole layered with eggplant, potato, tomato, and onion over seasoned meat, then served on rice. It is the one dish on the menu that spends real time in the oven rather than on the grill.",
    intro:
      "This is home cooking from the Iraqi side of the kitchen — slow, layered, and built for a fork rather than hands. If you have only ordered kebabs and wraps here, this is the plate that shows the other half of the menu.",
    priceHeading: "Tepsi Baytinijan pricing",
    priceRows: [
      { label: "Tepsi Baytinijan", price: "$20.00", note: "Iraqi eggplant casserole — eggplant, potato, tomato, onion + seasoned meat, served over rice" },
      { label: "Maza Special", price: "$48.45", note: "Four skewers + 2 pita, rice, sides" },
      { label: "Samak Tandoor", price: "$38.97", note: "Whole fish with rice and salad — allow 1 hour" },
    ],
    faqs: [
      {
        question: "What is tepsi baytinijan?",
        answer:
          "An Iraqi eggplant casserole: eggplant, potato, tomato, and onion cooked with seasoned meat, served over rice. At Maza it is $20.00.",
      },
      {
        question: "How long does it take to make?",
        answer:
          "It is baked rather than grilled, so it takes longer than a wrap. If you are on a clock, call ahead at (480) 534-6550 and we will tell you exactly where the current batch is.",
      },
      FAQ_HALAL,
      FAQ_ORDER,
    ],
    menuPath: "/menu/specials",
    menuLabel: "specials",
    menuSection: "Specials",
    image: "/images/maza/menu/opt-maza-special.jpg",
    imageAlt: "Tepsi Baytinijan Iraqi eggplant casserole at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["tepsi baytinijan Chandler", "Iraqi food Chandler AZ", "eggplant casserole Chandler"],
  },
  {
    slug: "samak-tandoor",
    h1: "Samak Tandoor (Whole Grilled Fish) in Chandler, AZ",
    title: "Samak Tandoor — Whole Fish $38.97 | Chandler, AZ | Maza",
    description:
      "Samak Tandoor at Maza — whole large grilled fish with rice and salad, $38.97. Please allow 1 hour to prepare. Halal Mediterranean in Chandler, AZ.",
    hook: "Samak Tandoor is $38.97 — a whole large fish with rice and salad, and the kitchen asks for about an hour to prepare it properly. It is the biggest single item on the menu and the one dish worth calling ahead for: (480) 534-6550.",
    intro:
      "Whole fish is not a fast order and we do not pretend otherwise. Ordered ahead, it arrives at the table properly cooked through rather than rushed. It is built to share.",
    priceHeading: "Samak Tandoor pricing",
    priceRows: [
      { label: "Samak Tandoor", price: "$38.97", note: "Whole large fish with rice and salad — please allow 1 hour to prepare" },
      { label: "Maza Special", price: "$48.45", note: "Four skewers + 2 pita, rice, sides" },
      { label: "Family Meal", price: "$87.49", note: "Ten skewers — the largest order on the menu" },
    ],
    faqs: [
      {
        question: "How long does Samak Tandoor take?",
        answer:
          "About an hour — the kitchen asks for the full hour so the whole fish cooks through properly. Call (480) 534-6550 to start it before you arrive.",
      },
      {
        question: "How many people does the whole fish serve?",
        answer:
          "It is a whole large fish with rice and salad, so it works as a shared centerpiece for two or three people alongside a mezze order.",
      },
      FAQ_HALAL,
      FAQ_HOURS,
    ],
    menuPath: "/menu/specials",
    menuLabel: "specials",
    menuSection: "Specials",
    image: "/images/maza/menu/opt-samak-promo.jpg",
    imageAlt: "Samak Tandoor whole grilled fish with rice and salad at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["whole fish Chandler AZ", "grilled fish Chandler", "Mediterranean seafood Chandler"],
  },
  {
    slug: "family-meal",
    h1: "Family Meal & Group Platters in Chandler, AZ",
    title: "Family Meal $87.49 — 10 Skewers | Chandler, AZ | Maza",
    description:
      "Maza Family Meal $87.49 — 10 skewers (beef + lamb, chicken shish, chicken tikka, lamb tikka, ribeye tikka), pita, rice and sides. Feeds a table.",
    hook: "The Maza Family Meal is $87.49 and carries ten skewers — two each of beef + lamb shish kebab, chicken shish kebab, chicken tikka, lamb tikka, and ribeye tikka — with pita, rice, and sides. The next size down, the Maza Special, is $48.45 with four skewers and feeds two to three.",
    intro:
      "Built for a table rather than a person. Order it for a family dinner, a work lunch in the Price Road corridor, or a game night where nobody wants to choose.",
    priceHeading: "Group platter pricing",
    priceRows: [
      { label: "Family Meal", price: "$87.49", note: "2 beef + lamb shish, 2 chicken shish, 2 chicken tikka, 2 lamb tikka, 2 ribeye tikka + 2 pita, rice, sides" },
      { label: "Maza Special", price: "$48.45", note: "4 skewers + 2 pita, rice, sides — feeds 2–3" },
      { label: "Appetizer Plate", price: "$15.51", note: "Add a mezze start to the table" },
    ],
    faqs: [
      {
        question: "How many people does the Family Meal feed?",
        answer:
          "Ten skewers with pita, rice, and sides — comfortably four to six people, more if you add mezze and salads alongside.",
      },
      FAQ_HALAL,
      {
        question: "Can I order this for pickup or catering?",
        answer:
          "Yes. Call (480) 534-6550 for pickup, and for larger events see our catering page — we handle big orders regularly.",
      },
    ],
    menuPath: "/menu/specials",
    menuLabel: "specials",
    menuSection: "Specials",
    image: "/images/maza/menu/opt-family-meal.jpg",
    imageAlt: "Maza Family Meal platter with ten skewers at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["family meal Chandler AZ", "Mediterranean catering platter Chandler", "group food Chandler"],
  },
  {
    slug: "kids-meals",
    h1: "Kids Meals in Chandler, AZ",
    title: "Kids Meals $11.85 — With Fries | Chandler, AZ | Maza",
    description:
      "Maza kids meals in Chandler — crispy chicken sandwich or all-beef burger, $11.85, both come with fries. Halal-certified.",
    hook: "Both Maza kids meals are $11.85 and both come with fries — a crispy chicken sandwich or an all-beef burger. The beef is halal-certified like everything else on the menu, so kids eat from the same supply chain as the rest of the table.",
    intro:
      "Small portions, familiar food, no negotiation. It also means the whole table can eat Mediterranean without someone ordering off-menu.",
    priceHeading: "Kids meal pricing",
    priceRows: [
      { label: "Kids Crispy Chicken Sandwich", price: "$11.85", note: "Kids meal — comes with fries" },
      { label: "Kids All Beef Burger", price: "$11.85", note: "Kids meal — comes with fries" },
      { label: "Side Fries", price: "$3.49" },
      { label: "Falafel (4pc)", price: "$3.99" },
    ],
    faqs: [
      FAQ_HALAL,
      {
        question: "Do the kids meals come with a drink?",
        answer:
          "The kids meals include fries. Drinks are ordered separately — fountain drinks are $2.49 with refills, and there is a free water cup option.",
      },
      FAQ_PARKING,
      FAQ_HOURS,
    ],
    menuPath: "/menu",
    menuLabel: "the full menu",
    menuSection: "Kids Meals",
    image: "/images/maza/menu/opt-kids-crispy-chicken.jpg",
    imageAlt: "Kids crispy chicken meal with fries at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["kids meals Chandler AZ", "family restaurant Chandler", "kid friendly restaurant Chandler"],
  },
  {
    slug: "vegetarian-vegan-options",
    h1: "Vegetarian & Vegan Options in Chandler, AZ",
    title: "Vegetarian & Vegan Mediterranean | Chandler, AZ | Maza",
    description:
      "Vegetarian and vegan Mediterranean food in Chandler — falafel $9.35–$16.55, hummus, baba ghanoush, dolma, tabouleh. Halal kitchen.",
    hook: "Maza's plant-based orders start at $3.99 for a four-piece falafel and run to $16.55 for the falafel plate with pita, salad, baba ghanoush, and hummus + tahini. Hummus with tahini and pita is $5.99, baba ghanoush is $1.99 small, dolma $5.99, and tabouleh $4.99.",
    intro:
      "The vegetarian side of a Mediterranean menu is not an afterthought here — falafel, hummus, baba ghanoush, dolma, and tabouleh are all made in house and all stand on their own as a meal.",
    priceHeading: "Vegetarian and vegan pricing",
    priceRows: [
      { label: "Falafel Plate", price: "$16.55", note: "Falafel, pita, salad, baba ghanoush & hummus + tahini" },
      { label: "Falafel Wrap", price: "$9.35" },
      { label: "Hummus with tahini and pita", price: "$5.99" },
      { label: "Dolma", price: "$5.99" },
      { label: "Tabouleh", price: "$4.99" },
      { label: "Baba Ghanoush", price: "SM $1.99 | LG $4.99" },
    ],
    faqs: [
      {
        question: "What is vegan at Maza?",
        answer:
          "Falafel, hummus with tahini, baba ghanoush, dolma, tabouleh, and the salads are all plant-based. Avoid the tzatziki and any yogurt-based sauce if you are vegan, and ask for sauces on the side.",
      },
      {
        question: "Is the falafel plate a full meal?",
        answer:
          "Yes — $16.55 with falafel, pita, salad, baba ghanoush, and hummus + tahini. It is the most complete vegetarian order on the menu.",
      },
      FAQ_ORDER,
      FAQ_PARKING,
    ],
    menuPath: "/menu",
    menuLabel: "the full menu",
    menuSection: "Sides",
    image: "/images/maza/menu/opt-falafel-4pc.jpg",
    imageAlt: "Vegetarian and vegan Mediterranean options at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["vegan restaurant Chandler AZ", "vegetarian Mediterranean Chandler", "falafel Chandler"],
  },
  {
    slug: "halal-catering",
    h1: "Halal Catering in Chandler, AZ",
    title: "Halal Catering in Chandler, AZ | Maza Mediterranean Cuisine",
    description:
      "Halal Mediterranean catering in Chandler — kebab platters, family meals and mezze for offices and events. Price Road corridor and East Valley delivery available.",
    hook: "Maza caters halal Mediterranean food across Chandler and the East Valley, from a $48.45 Maza Special of four skewers up to the $87.49 Family Meal with ten skewers, plus mezze platters and salads. We cook for offices in the Price Road corridor, family events, and gatherings where the food has to be halal-certified.",
    intro:
      "Catering is the same kitchen as the restaurant — the same grills, the same halal-certified meat, the same rice and sides. Tell us headcount and timing and we will size the order.",
    priceHeading: "Catering anchors",
    priceRows: [
      { label: "Family Meal", price: "$87.49", note: "10 skewers + pita, rice, sides — four to six people" },
      { label: "Maza Special", price: "$48.45", note: "4 skewers + 2 pita, rice, sides — two to three people" },
      { label: "Appetizer Plate", price: "$15.51", note: "Mezze start for the table" },
      { label: "Maza Salad", price: "$13.99", note: "Choose chicken or steak" },
    ],
    faqs: [
      FAQ_HALAL,
      {
        question: "How do I book catering?",
        answer:
          "Use the catering request form on our site or call (480) 534-6550 with your date, headcount, and pickup or delivery preference. We will confirm what the kitchen can turn around.",
      },
      {
        question: "Do you do office catering in Chandler?",
        answer:
          "Yes — offices around the Price Road corridor and across Chandler are a regular part of what we cater. Platters are built to travel and arrive ready to serve.",
      },
      {
        question: "How much notice do you need?",
        answer:
          "The more notice the better, especially for large orders. Call us and we will give you a straight answer for your date rather than a blanket policy.",
      },
    ],
    menuPath: "/catering",
    menuLabel: "catering",
    menuSection: "Specials",
    image: "/images/maza/catering-hero-shish-grill.webp",
    imageAlt: "Halal Mediterranean catering platters from Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["halal catering Chandler AZ", "Mediterranean catering Chandler", "office catering Chandler AZ"],
  },
  {
    slug: "dine-in",
    h1: "Dine-In Mediterranean Restaurant in Chandler, AZ",
    title: "Dine-In Mediterranean Restaurant | Chandler, AZ | Maza",
    description:
      "Dine in at Maza Mediterranean Cuisine, 3491 W Frye Rd Suite 2, Chandler AZ. Halal plates, kebabs and mezze. Open Tue–Sun 10am–10pm, closed Mondays.",
    hook: "Maza seats dine-in guests Tuesday through Sunday, 10am–10pm at 3491 W Frye Rd, Suite 2 in Chandler — closed Mondays. Plates run $16.55 to $28.99 with two kebabs, rice, salad, baba ghanoush, and hummus + tahini, and the mezze is made fresh to start the table.",
    intro:
      "Walk in, order at the counter, and take a table. It is a family restaurant, not a fast-casual chain — the food is cooked to order, so a grill plate is worth the few minutes it takes.",
    priceHeading: "What to order in",
    priceRows: [
      { label: "Appetizer Plate", price: "$15.51", note: "Start the table with mezze" },
      { label: "Chicken Tikka Plate", price: "$19.67", note: "Most-ordered plate" },
      { label: "Maza Grill", price: "$27.99", note: "Three kebabs, one plate" },    ],
    faqs: [
      FAQ_HOURS,
      FAQ_PARKING,
      {
        question: "Do you take reservations?",
        answer:
          "For groups and catering we ask that you reach out ahead through the contact page or by phone on (480) 534-6550. Regular tables are walk-in.",
      },
      FAQ_HALAL,
    ],
    menuPath: "/menu",
    menuLabel: "the full menu",
    menuSection: "Plates",
    image: "/images/maza/hero-brand-1920.jpg",
    imageAlt: "Dine in at Maza Mediterranean Cuisine in Chandler AZ",
    keywords: ["Mediterranean restaurant Chandler AZ", "dine in Chandler", "halal restaurant Chandler dine in"],
  },
  {
    slug: "takeout-and-delivery",
    h1: "Takeout & Delivery in Chandler, AZ",
    title: "Takeout & Delivery | Chandler, AZ | Maza Mediterranean",
    description:
      "Order Maza takeout in Chandler — call (480) 534-6550, or order delivery via DoorDash, Uber Eats or Grubhub. Halal Mediterranean, open Tue–Sun 10am–10pm.",
    hook: "Call Maza at (480) 534-6550 for takeout, or order delivery through DoorDash, Uber Eats, or Grubhub — all three carry the same halal Mediterranean menu, including the $10.91 beef gyro and the $87.49 Family Meal. We are open Tuesday through Sunday, 10am–10pm, closed Mondays.",
    intro:
      "Wraps, plates, and mezze all travel well; saucy items are packed separately so nothing arrives soggy. If you want a large order or catering, call rather than using a delivery app.",
    priceHeading: "Popular orders to go",
    priceRows: [
      { label: "Beef Gyro Wrap", price: "$10.91", note: "Great traveller" },
      { label: "Chicken Tikka Plate", price: "$19.67", note: "Full plate, boxed" },
      { label: "Loaded Fries — Gyro", price: "$12.89", note: "Choose up to 3 sauces" },
      { label: "Family Meal", price: "$87.49", note: "Ten skewers — call ahead" },
    ],
    faqs: [
      FAQ_ORDER,
      {
        question: "Where do you deliver?",
        answer:
          "Delivery is handled by DoorDash, Uber Eats, and Grubhub, whose apps show the current delivery radius around 3491 W Frye Rd, Chandler. For pickup you can always call us directly.",
      },
      FAQ_HOURS,
      FAQ_HALAL,
    ],
    menuPath: "/menu",
    menuLabel: "the full menu",
    menuSection: "Wraps",
    image: "/images/maza/menu/opt-beef-gyro-vertical.jpg",
    imageAlt: "Maza takeout and delivery in Chandler AZ",
    keywords: ["takeout Chandler AZ", "Mediterranean delivery Chandler", "halal takeout Chandler"],
  },
  {
    slug: "lunch-specials",
    h1: "Lunch Specials in Chandler, AZ",
    title: "Lunch Specials in Chandler, AZ | Maza Mediterranean Cuisine",
    description:
      "Mediterranean lunch in Chandler — wraps from $9.35, chicken tikka plate $19.67, Maza Salad $13.99, and the $10 Plaza Lunch Club for plaza employees.",
    hook: "Maza wraps start at $9.35 for falafel and $10.91 for beef gyro, and the chicken tikka plate is $19.67 — a full lunch with two skewers, rice, salad, baba ghanoush, and hummus + tahini. Employees in the plaza and nearby businesses can also join the Plaza Lunch Club: any wrap or burger for $10.",
    intro:
      "Lunch at Maza is the same kitchen as dinner, cooked to order rather than held warm. If you are on a break, wraps are the fast order; plates take slightly longer but are a bigger meal.",
    priceHeading: "Lunch pricing",
    priceRows: [
      { label: "Falafel Wrap", price: "$9.35", note: "Fastest vegetarian lunch" },
      { label: "Beef Gyro Wrap", price: "$10.91" },
      { label: "Chicken Tikka Plate", price: "$19.67", note: "Full plate lunch" },
      { label: "Maza Salad", price: "$13.99", note: "Choose chicken or steak" },
      { label: "Combo Upgrade", price: "$4.99", note: "Adds fries + drink" },
    ],
    faqs: [
      {
        question: "What is the Plaza Lunch Club?",
        answer:
          "Any wrap or burger for $10 for employees in the plaza and nearby businesses. Plates and sides are not included. Full details are on our Plaza Lunch page.",
      },
      {
        question: "What is the fastest lunch order?",
        answer:
          "A wrap — falafel $9.35, beef gyro $10.91, or chicken tikka $11.43. Plates are cooked to order with two skewers and take a few minutes longer.",
      },
      FAQ_HOURS,
      FAQ_ORDER,
    ],
    menuPath: "/plaza-lunch",
    menuLabel: "Plaza Lunch Club",
    menuSection: "Wraps",
    image: "/images/maza/menu/opt-chicken-shish-kebab-wrap-vertical.jpg",
    imageAlt: "Mediterranean lunch specials at Maza Mediterranean Cuisine Chandler AZ",
    keywords: ["lunch Chandler AZ", "Mediterranean lunch Chandler", "cheap lunch Chandler AZ"],
  },
];

export const OFFERING_SLUGS = OFFERING_PAGES.map((p) => p.slug);

export function getOffering(slug: string): OfferingPage | undefined {
  return OFFERING_PAGES.find((p) => p.slug === slug);
}
