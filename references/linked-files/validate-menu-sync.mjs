#!/usr/bin/env node
/**
 * validate-menu-sync.mjs — Drift checker for menu.json ↔ data/menu.ts
 *
 * Run:  node references/linked-files/validate-menu-sync.mjs
 * 
 * Compares item names and prices between canonical menu.json and the
 * website runtime data/menu.ts. Any mismatch is an error.
 * Returns exit code 0 if in sync, 1 if drift detected.
 * Use as a pre-commit hook, CI check, or manual health check.
 *
 * Duplicate names are allowed across DIFFERENT sections (e.g. "Beef Shawarma"
 * can appear in both "Loaded Fries" and "Loaded Hummus"). Duplicates within
 * the SAME section are flagged as errors.
 */

import fs from 'fs';

const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m', RESET = '\x1b[0m';

// ─── Parse menu.json ────────────────────────────────────────────────
const menuJson = JSON.parse(fs.readFileSync('menu.json', 'utf8'));
const jsonItems = [];
for (const section of menuJson.sections) {
  for (const item of section.items) {
    jsonItems.push({ section: section.name, name: item.name, price: item.price });
  }
}

// ─── Parse data/menu.ts (per-category) ──────────────────────────────
const tsContent = fs.readFileSync('data/menu.ts', 'utf8');
const tsItems = [];

// Find category boundaries
const catPositions = [...tsContent.matchAll(/category:\s*"([^"]+)"/g)]
  .map(m => ({ name: m[1], pos: m.index }));

for (let i = 0; i < catPositions.length; i++) {
  const start = catPositions[i].pos;
  const end = i + 1 < catPositions.length ? catPositions[i + 1].pos : tsContent.length;
  const block = tsContent.slice(start, end);

  for (const m of block.matchAll(/name:\s*"([^"]+)",\s*price:\s*"([^"]+)"/g)) {
    tsItems.push({ category: catPositions[i].name, name: m[1], price: m[2] });
  }
}

// ─── Check duplicates (per section / per category) ──────────────────

function findDupes(items, groupKey, labelKey) {
  const groups = {};
  for (const item of items) {
    const g = item[groupKey];
    if (!groups[g]) groups[g] = [];
    groups[g].push(item.name);
  }
  const dupes = [];
  for (const [group, names] of Object.entries(groups)) {
    const seen = new Set();
    for (const name of names) {
      if (seen.has(name)) dupes.push(`${group}: ${name}`);
      seen.add(name);
    }
  }
  return dupes;
}

const jsonDupes = findDupes(jsonItems, 'section');
const tsDupes = findDupes(tsItems, 'category');

// ─── Diff (keyed by section|name) ───────────────────────────────────

const jsonKeySet = new Set(jsonItems.map(i => `${i.section}|${i.name}`));
const tsKeySet = new Set(tsItems.map(i => `${i.category}|${i.name}`));

const inJsonNotTs = jsonItems.filter(i => !tsKeySet.has(`${i.section}|${i.name}`));
const inTsNotJson = tsItems.filter(i => !jsonKeySet.has(`${i.category}|${i.name}`));

// ─── Price mismatches (match by section + name) ─────────────────────

const priceMismatches = [];
for (const ji of jsonItems) {
  const ti = tsItems.find(t => t.category === ji.section && t.name === ji.name);
  if (ti && ti.price !== ji.price) {
    priceMismatches.push({ section: ji.section, name: ji.name, json: ji.price, ts: ti.price });
  }
}

// ─── Report ─────────────────────────────────────────────────────────

let errors = 0;

if (jsonDupes.length > 0) {
  console.error(`${RED}❌ DUPLICATES in menu.json (same section):${RESET}`, jsonDupes);
  errors++;
}
if (tsDupes.length > 0) {
  console.error(`${RED}❌ DUPLICATES in data/menu.ts (same category):${RESET}`, tsDupes);
  errors++;
}
if (inJsonNotTs.length > 0) {
  console.error(`${RED}❌ In menu.json but MISSING from data/menu.ts:${RESET}`);
  inJsonNotTs.forEach(i => console.error(`   ${i.section}: ${i.name} (${i.price})`));
  errors++;
}
if (inTsNotJson.length > 0) {
  console.error(`${RED}❌ In data/menu.ts but MISSING from menu.json:${RESET}`);
  inTsNotJson.forEach(i => console.error(`   ${i.category}: ${i.name} (${i.price})`));
  errors++;
}
if (priceMismatches.length > 0) {
  console.error(`${YELLOW}⚠️  Price mismatches:${RESET}`);
  priceMismatches.forEach(m =>
    console.error(`   [${m.section}] ${m.name}: menu.json=${m.json}  data/menu.ts=${m.ts}`)
  );
  errors++;
}

const totalJ = jsonItems.length;
const totalT = tsItems.length;

if (errors === 0) {
  console.log(`${GREEN}✅ IN SYNC — menu.json (${totalJ} items) ↔ data/menu.ts (${totalT} items)${RESET}`);
  console.log(`${GREEN}   No duplicates, no missing items, all prices match${RESET}`);
  process.exit(0);
} else {
  console.error(`\n${RED}❌ ${errors} issue(s) found — menu.json (${totalJ} items) ↔ data/menu.ts (${totalT} items)${RESET}`);
  console.error(`\n${YELLOW}FIX: Update menu.json, then run:${RESET}`);
  console.error(`   node references/linked-files/generate-menu-ts.mjs`);
  process.exit(1);
}
