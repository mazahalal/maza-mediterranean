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
 */

import fs from 'fs';

const RED = '\x1b[31m', GREEN = '\x1b[32m', YELLOW = '\x1b[33m', RESET = '\x1b[0m';

// Parse menu.json
const menuJson = JSON.parse(fs.readFileSync('menu.json', 'utf8'));
const jsonItems = [];
for (const section of menuJson.sections) {
  for (const item of section.items) {
    jsonItems.push({ section: section.name, name: item.name, price: item.price });
  }
}

// Parse data/menu.ts
const tsContent = fs.readFileSync('data/menu.ts', 'utf8');
const tsItems = [];
const itemRegex = /name:\s*"([^"]+)",\s*price:\s*"([^"]+)"/g;
let match;
while ((match = itemRegex.exec(tsContent)) !== null) {
  tsItems.push({ name: match[1], price: match[2] });
}

// Check duplicates
const tsNames = tsItems.map(i => i.name);
const tsDupes = tsNames.filter((n, i) => tsNames.indexOf(n) !== i);
const jsonNames = jsonItems.map(i => i.name);
const jsonDupes = jsonNames.filter((n, i) => jsonNames.indexOf(n) !== i);

// Diff
const jsonNameSet = new Set(jsonItems.map(i => i.name));
const tsNameSet = new Set(tsItems.map(i => i.name));
const inJsonNotTs = jsonItems.filter(i => !tsNameSet.has(i.name));
const inTsNotJson = tsItems.filter(i => !jsonNameSet.has(i.name));

// Price mismatches
const priceMismatches = [];
for (const ji of jsonItems) {
  const ti = tsItems.find(t => t.name === ji.name);
  if (ti && ti.price !== ji.price) {
    priceMismatches.push({ name: ji.name, json: ji.price, ts: ti.price });
  }
}

let errors = 0;

if (tsDupes.length > 0) {
  console.error(`${RED}❌ DUPLICATES in data/menu.ts:${RESET}`, tsDupes);
  errors++;
}
if (jsonDupes.length > 0) {
  console.error(`${RED}❌ DUPLICATES in menu.json:${RESET}`, jsonDupes);
  errors++;
}
if (inJsonNotTs.length > 0) {
  console.error(`${RED}❌ In menu.json but MISSING from data/menu.ts:${RESET}`);
  inJsonNotTs.forEach(i => console.error(`   ${i.section}: ${i.name} (${i.price})`));
  errors++;
}
if (inTsNotJson.length > 0) {
  console.error(`${RED}❌ In data/menu.ts but MISSING from menu.json:${RESET}`);
  inTsNotJson.forEach(i => console.error(`   ${i.name} (${i.price})`));
  errors++;
}
if (priceMismatches.length > 0) {
  console.error(`${YELLOW}⚠️  Price mismatches:${RESET}`);
  priceMismatches.forEach(m => 
    console.error(`   ${m.name}: menu.json=${m.json}  data/menu.ts=${m.ts}`)
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
