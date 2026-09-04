#!/usr/bin/env node
/**
 * generate-menu-ts.mjs — Rebuild data/menu.ts from canonical menu.json
 *
 * Run:  node references/linked-files/generate-menu-ts.mjs
 *
 * This is the ONE AND ONLY way data/menu.ts should be updated.
 * Never hand-edit data/menu.ts directly — run this script instead.
 * Both menu.json and data/menu.ts must be committed together.
 */

import fs from 'fs';

const json = JSON.parse(fs.readFileSync('menu.json', 'utf8'));

// PUBLIC MENU = sections only.
// menu.json may carry internal top-level keys (e.g. temporarily_unavailable)
// for ops / restock tracking. Never export those to data/menu.ts or the live site.
if (!Array.isArray(json.sections)) {
  console.error('❌ menu.json missing sections[] — aborting');
  process.exit(1);
}
const ignoredTopLevel = Object.keys(json).filter((k) => k !== 'sections');
const skippedUnavailable = Array.isArray(json.temporarily_unavailable)
  ? json.temporarily_unavailable.length
  : 0;
// Working object is sections-only — never pass other top-level keys through.
const publicMenu = { sections: json.sections };

// Known image paths — add new items here when photography is available
// Prefer true vertical (9:16) assets named *-vertical when available.
// Sources:
//   A = approved menu/ deliverables
//   B = studio digital/product/
//   C = plated menu_items/
//   V = owner vertical stills (menu_items/*-vertical.jpg, Aug 2026)
const images = {
  // --- Burgers ---
  'Beef Burger|Burgers': '/images/maza/menu/opt-PXL_20260606_223538010.jpg',
  'Grilled Chicken|Burgers': '/images/maza/menu/opt-grilled-chicken-burger.jpg',

  // --- Plates ---
  'Falafel|Plates': '/images/maza/menu/opt-PXL_20260601_224012118.jpg',
  'Maza Grill|Plates': '/images/maza/menu/opt-Jun_6_2026_5_29_23.jpg',
  'Beef + Lamb Shish Kebab|Plates': '/images/maza/menu/opt-beef-shish-plate.jpg',
  'Chicken Shish Kebab|Plates': '/images/maza/menu/opt-chicken-shish-plate.jpg',
  'Mix Kebab|Plates': '/images/maza/menu/opt-mix-kebab-plate.jpg',
  'Chicken Tikka Plate|Plates': '/images/maza/menu/opt-chicken-tikka-plate.jpg',
  'Lamb Tikka Plate|Plates': '/images/maza/menu/opt-lamb-tikka-plate.jpg',
  'Appetizer Plate|Plates': '/images/maza/menu/opt-appetizer-plate.jpg',
  'Grilled Chicken Teriyaki Plate|Plates': '/images/maza/menu/opt-chicken-teriyaki-plate.jpg',
  // V — shredded chicken plate vertical
  'Shredded Chicken Plate|Plates': '/images/maza/menu/opt-shredded-chicken-plate-vertical.jpg',
  'Shredded Steak Plate|Plates': '/images/maza/menu/opt-shredded-steak-plate.jpg',

  // --- Wraps (prefer verticals) ---
  'Beef Gyro|Wraps': '/images/maza/menu/opt-beef-gyro-vertical.jpg',
  'Crispy Chicken Wrap|Wraps': '/images/maza/menu/opt-crispy-chicken-wrap.jpg',
  'Beef + Lamb Shish Kebab Wrap|Wraps': '/images/maza/menu/opt-beef-shish-kebab-wrap-vertical.jpg',
  'Chicken Shish Kebab Wrap|Wraps': '/images/maza/menu/opt-chicken-shish-kebab-wrap-vertical.jpg',
  'Falafel Wrap|Wraps': '/images/maza/menu/opt-falafel-wrap-vertical.jpg',
  'Arayes Lahm or Dajaj|Wraps': '/images/maza/menu/opt-arayes-lahm-vertical.jpg',
  'Ribeye Tikka Wrap|Wraps': '/images/maza/menu/opt-ribeye-tikka-wrap-vertical.jpg',

  // --- Loaded ---
  'Shredded Steak|Loaded Fries': '/images/maza/menu/opt-loaded-fries-steak.jpg',
  'Gyro|Loaded Fries': '/images/maza/menu/opt-loaded-fries-gyro.jpg',
  'Shredded Chicken|Loaded Hummus': '/images/maza/menu/opt-loaded-hummus-chicken.jpg',
  'Shredded Steak|Loaded Hummus': '/images/maza/menu/opt-loaded-hummus-steak.jpg',

  // --- Specials ---
  'Maza Special|Specials': '/images/maza/menu/opt-maza-special-vertical.jpg',
  'Samak Tandoor|Specials': '/images/maza/menu/opt-samak-promo.jpg',

  // --- Kids ---
  'Crispy Chicken Sandwich|Kids Meals': '/images/maza/menu/opt-kids-crispy-chicken.jpg',

  // --- Sides ---
  'Hummus with tahini and pita|Sides': '/images/maza/menu/opt-hummus-pita.jpg',
  'Sambusah (2pc)|Sides': '/images/maza/menu/opt-sambusah-vertical.jpg',
  'Tabouleh|Sides': '/images/maza/menu/opt-tabouleh.jpg',
  'Kibbeh (3pc)|Sides': '/images/maza/menu/opt-kibbeh.jpg',
  'Side Salad|Sides': '/images/maza/menu/opt-side-salad-vertical.jpg',
  'Falafel (4pc)|Sides': '/images/maza/menu/opt-falafel-side.jpg',
  'Fries|Sides': '/images/maza/menu/opt-side-fries-vertical.jpg',

  // --- Baklava ---
  'Cashew Baklava|Baklava': '/images/maza/menu/opt-baklava.jpg',
  'Pistachio Baklava|Baklava': '/images/maza/menu/opt-baklava.jpg',
  // --- Kunāfah ---
  'Kunāfah (Pistachio, 2pc)|Kunāfah': '/images/maza/menu/opt-kunafah.jpg',
};

function esc(s) {
  return s.replace(/"/g, '\\"');
}

function formatItem(item, sectionName) {
  const parts = [`name: "${esc(item.name)}"`, `price: "${item.price}"`];
  const img = images[`${item.name}|${sectionName}`];
  if (img) parts.push(`image: "${img}"`);
  if (item.note) parts.push(`note: "${esc(item.note)}"`);
  if (item.notes?.length) {
    parts.push(`notes: [${item.notes.map((n) => `"${esc(n)}"`).join(', ')}]`);
  }
  return `      { ${parts.join(', ')} }`;
}

let out = `export interface MenuItem {
  name: string;
  description?: string;
  price: string;
  note?: string;
  notes?: string[];
  image?: string;
}

export interface MenuCategory {
  category: string;
  subtitle?: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
`;

const sections = [];
for (let si = 0; si < publicMenu.sections.length; si++) {
  const section = publicMenu.sections[si];
  let block = `  {\n    category: "${esc(section.name)}"`;
  if (section.subtitle) {
    block += `,\n    subtitle: "${esc(section.subtitle)}"`;
  }
  block += `,\n    items: [\n`;
  for (let ii = 0; ii < section.items.length; ii++) {
    const item = section.items[ii];
    const comma = ii < section.items.length - 1 ? ',' : '';
    block += formatItem(item, section.name) + comma + '\n';
  }
  block += `    ],\n  }`;
  sections.push(block);
}
out += sections.join(',\n');
out += '\n];\n';

fs.writeFileSync('data/menu.ts', out);
console.log(`✅ data/menu.ts regenerated from menu.json (${out.length} chars, ${out.split('\n').length} lines)`);
console.log(`   ${publicMenu.sections.length} sections, ${publicMenu.sections.reduce((sum, s) => sum + s.items.length, 0)} items`);
console.log(`   ${Object.keys(images).length} image mappings`);
if (skippedUnavailable > 0) {
  console.log(`   skipped temporarily_unavailable: ${skippedUnavailable} item(s) (not public)`);
}
if (ignoredTopLevel.length) {
  console.log(`   ignored top-level keys: ${ignoredTopLevel.join(', ')}`);
}
