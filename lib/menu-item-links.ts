/**
 * Canonical internal-link map from menu item names → SEO offering pages.
 * Used by category menus + gallery so dish names become real links instead of
 * dead-end cards. Anchors stay dish-native (never "Chandler AZ").
 */

export type MenuItemLink = {
  href: string;
  /** Preferred anchor when the UI needs a short label. */
  label: string;
};

/**
 * Exact menu item names from data/menu.ts. Keep in lockstep with offerings.ts
 * slugs — do not invent pages that don't exist under app/[slug].
 */
export const MENU_ITEM_LINKS: Record<string, MenuItemLink> = {
  // Wraps / handhelds
  "Beef + Lamb Gyro": { href: "/gyro", label: "Beef Gyro" },
  "Beef + Lamb Shish Kebab Wrap": { href: "/shish-kebab", label: "Shish Kebab" },
  "Chicken Shish Kebab Wrap": { href: "/shish-kebab", label: "Shish Kebab" },
  "Chicken Tikka Wrap": { href: "/chicken-tikka", label: "Chicken Tikka" },
  "Lamb Tikka Wrap": { href: "/lamb-tikka", label: "Lamb Tikka" },
  "Ribeye Tikka Wrap": { href: "/ribeye-tikka", label: "Ribeye Tikka" },
  "Falafel Wrap": { href: "/falafel", label: "Falafel" },
  "Arayes Lahm or Dajaj": { href: "/arayes", label: "Arayes" },

  // Plates
  "Chicken Shish Kebab Plate": { href: "/shish-kebab", label: "Shish Kebab" },
  "Beef + Lamb Shish Kebab Plate": { href: "/shish-kebab", label: "Shish Kebab" },
  "Mix Kebab Plate": { href: "/mix-kebab", label: "Mix Kebab" },
  "Chicken Tikka Plate": { href: "/chicken-tikka", label: "Chicken Tikka" },
  "Lamb Tikka Plate": { href: "/lamb-tikka", label: "Lamb Tikka" },
  "Ribeye Tikka Plate": { href: "/ribeye-tikka", label: "Ribeye Tikka" },
  "Falafel Plate": { href: "/falafel", label: "Falafel" },
  "Maza Grill": { href: "/maza-grill", label: "Maza Grill" },

  // Loaded
  "Loaded Fries": { href: "/loaded-fries", label: "Loaded Fries" },
  "Loaded Hummus": { href: "/loaded-hummus", label: "Loaded Hummus" },

  // Specials
  "Family Meal": { href: "/family-meal", label: "Family Meal" },
  "Tepsi Baytinijan": { href: "/tepsi-baytinijan", label: "Tepsi Baytinijan" },
  "Samak Tandoor": { href: "/samak-tandoor", label: "Samak Tandoor" },
  "Mezze Platter": { href: "/mezze-platter", label: "Mezze Platter" },

  // Burgers
  Burgers: { href: "/burgers", label: "Burgers" },
  "Beef Burger": { href: "/burgers", label: "Burgers" },
  "Chicken Burger": { href: "/burgers", label: "Burgers" },

  // Sides
  Hummus: { href: "/hummus-and-baba-ghanoush", label: "Hummus & Baba Ghanoush" },
  "Baba Ghanoush": {
    href: "/hummus-and-baba-ghanoush",
    label: "Hummus & Baba Ghanoush",
  },
  "Hummus & Baba Ghanoush": {
    href: "/hummus-and-baba-ghanoush",
    label: "Hummus & Baba Ghanoush",
  },
  Tabouleh: { href: "/tabouleh-and-salads", label: "Tabouleh & Salads" },
  Salad: { href: "/tabouleh-and-salads", label: "Tabouleh & Salads" },
  Falafel: { href: "/falafel", label: "Falafel" },

  // Desserts
  Baklava: { href: "/baklava", label: "Baklava" },
  "Baklava Cashew": { href: "/baklava", label: "Baklava" },
  "Baklava Pistachio": { href: "/baklava", label: "Baklava" },
};

export function linkForMenuItem(name: string): MenuItemLink | null {
  if (MENU_ITEM_LINKS[name]) return MENU_ITEM_LINKS[name];
  // Soft match: strip parenthetical notes / sizes
  const base = name.replace(/\s*\(.*\)\s*$/, "").trim();
  return MENU_ITEM_LINKS[base] ?? null;
}

/** Hub-level related chips for category / static pages. */
export type RelatedChip = { href: string; label: string };

export const RELATED_BY_ROUTE: Record<string, RelatedChip[]> = {
  home: [
    { href: "/halal-mediterranean-chandler", label: "Halal Mediterranean" },
    { href: "/menu/plates", label: "Plates" },
    { href: "/gyro", label: "Beef Gyro" },
    { href: "/hummus-and-baba-ghanoush", label: "Hummus & Baba Ghanoush" },
    { href: "/about", label: "About Maza" },
    { href: "/gallery", label: "Gallery" },
  ],
  menu: [
    { href: "/menu/wraps", label: "Wraps" },
    { href: "/menu/plates", label: "Plates" },
    { href: "/gyro", label: "Beef Gyro" },
    { href: "/halal-mediterranean-chandler", label: "Halal Mediterranean" },
    { href: "/gallery", label: "Gallery" },
    { href: "/about", label: "About Maza" },
  ],
  "menu/plates": [
    { href: "/ribeye-tikka", label: "Ribeye Tikka" },
    { href: "/lamb-tikka", label: "Lamb Tikka" },
    { href: "/chicken-tikka", label: "Chicken Tikka" },
    { href: "/shish-kebab", label: "Shish Kebab" },
    { href: "/mix-kebab", label: "Mix Kebab" },
    { href: "/maza-grill", label: "Maza Grill" },
    { href: "/falafel", label: "Falafel" },
  ],
  "menu/wraps": [
    { href: "/gyro", label: "Beef Gyro" },
    { href: "/shish-kebab", label: "Shish Kebab" },
    { href: "/chicken-tikka", label: "Chicken Tikka" },
    { href: "/lamb-tikka", label: "Lamb Tikka" },
    { href: "/ribeye-tikka", label: "Ribeye Tikka" },
    { href: "/arayes", label: "Arayes" },
    { href: "/falafel", label: "Falafel" },
  ],
  "menu/sides": [
    { href: "/falafel", label: "Falafel" },
    { href: "/hummus-and-baba-ghanoush", label: "Hummus & Baba Ghanoush" },
    { href: "/tabouleh-and-salads", label: "Tabouleh & Salads" },
    { href: "/loaded-hummus", label: "Loaded Hummus" },
    { href: "/loaded-fries", label: "Loaded Fries" },
  ],
  "menu/specials": [
    { href: "/family-meal", label: "Family Meal" },
    { href: "/tepsi-baytinijan", label: "Tepsi Baytinijan" },
    { href: "/mezze-platter", label: "Mezze Platter" },
    { href: "/samak-tandoor", label: "Samak Tandoor" },
  ],
  "menu/desserts-drinks": [
    { href: "/baklava", label: "Baklava" },
  ],
  "menu/burgers": [{ href: "/burgers", label: "Burgers" }],
  about: [
    { href: "/menu", label: "Full menu" },
    { href: "/halal-mediterranean-chandler", label: "Halal Mediterranean" },
    { href: "/hummus-and-baba-ghanoush", label: "Hummus & Baba Ghanoush" },
    { href: "/shish-kebab", label: "Shish Kebab" },
    { href: "/contact", label: "Contact" },
  ],
  gallery: [
    { href: "/menu/plates", label: "Plates" },
    { href: "/menu/wraps", label: "Wraps" },
    { href: "/shish-kebab", label: "Shish Kebab" },
    { href: "/chicken-tikka", label: "Chicken Tikka" },
    { href: "/maza-grill", label: "Maza Grill" },
    { href: "/loaded-hummus", label: "Loaded Hummus" },
    { href: "/loaded-fries", label: "Loaded Fries" },
  ],
  catering: [
    { href: "/shish-kebab", label: "Shish Kebab" },
    { href: "/hummus-and-baba-ghanoush", label: "Hummus & Baba Ghanoush" },
    { href: "/halal-catering", label: "Halal Catering" },
    { href: "/family-meal", label: "Family Meal" },
    { href: "/contact", label: "Contact" },
  ],
  contact: [
    { href: "/catering", label: "Catering" },
    { href: "/halal-mediterranean-chandler", label: "Halal Mediterranean" },
    { href: "/menu", label: "Full menu" },
  ],
  "plaza-lunch": [
    { href: "/menu/wraps", label: "Wraps" },
    { href: "/gyro", label: "Beef Gyro" },
    { href: "/arayes", label: "Arayes" },
    { href: "/falafel", label: "Falafel" },
    { href: "/burgers", label: "Burgers" },
    { href: "/halal-mediterranean-chandler", label: "Halal Mediterranean" },
  ],
};
