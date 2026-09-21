# Maza internal link audit — implementation notes

**Run:** `/srv/apps/jev-link-audit/runs/MAZA-20260920/`  
**Date:** 2026-09-20  
**Provider:** Venice Jev (live)

## Problem
Core 30 offering pages (`/gyro`, `/shish-kebab`, `/family-meal`, …) already existed under `app/[slug]`, but almost nothing on the site pointed *to* them. Jev counted **27 orphans** and recommended **191 add** edges.

## What we shipped (this PR)
1. `lib/menu-item-links.ts` — dish name → offering slug map + hub chip lists.
2. `components/RelatedLinks.tsx` — shared chip row.
3. Category menus (`/menu/plates|wraps|sides|specials|desserts-drinks|burgers`) — item names link to offerings when mapped; related chip row under the grid.
4. Full menu lightbox — “About {dish} →” under cards + detail (stops propagation so lightbox still opens).
5. Home, About, Gallery, Menu, Catering, Contact, Plaza Lunch — related chip hubs.
6. `app/[slug]/page.tsx` — sibling offering cross-links so Core 30 pages link to each other (not only back to `/menu`).

## Not auto-patched
- Menu-board TV route (display surface, not SEO crawl target).
- Careers / privacy / terms / sms-join (low topical value; Jev mostly skipped).
- Anchor text that Jev scored as “Chandler AZ” — we use dish-native anchors instead.

## Artifacts
- Metrics: `runs/MAZA-20260920/metrics.json`
- Full map: `runs/MAZA-20260920/link_map.json`
- Corpus: `corpora/MAZA/pages.json`
