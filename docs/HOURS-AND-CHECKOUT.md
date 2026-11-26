# Maza hours source-of-truth + agent checkout rules

Incident class: agents open a stale local branch/worktree (e.g. `feat/catering-home-promo` or the shared `main` checkout lagging origin), see old hours (`Tue–Sun 10am–10pm`), and open “fix hours” work while production is already correct.

## Canonical hours (live + `origin/main` as of #184)

| Days | Hours | Schema |
|------|-------|--------|
| Mon | Closed | — |
| Tue–Thu | 11am–8pm | opens 11:00 / closes 20:00 |
| Fri–Sat | 10am–11pm | opens 10:00 / closes 23:00 |
| Sun | 10am–8pm | opens 10:00 / closes 20:00 |

Shipped: PR [#184](https://github.com/mazahalal/maza-mediterranean/pull/184) → merge `91359b9` on `main` (2026-11-17). Vercel Production tracked that SHA and later `e6cd2f6` (still contains #184).

Verify live before any hours edit:

```bash
curl -sL https://mazahalalfood.com | grep -oE 'Tue–Thu[^<]{0,80}|opens.:.[0-9:]+' | head
git show origin/main:components/FooterHours.tsx | head -20
```

If live matches the table above, **do not** open another hours PR.

## Where hours live in the repo (all must match)

Primary UI/schema:

- `app/layout.tsx` — meta description + JSON-LD `openingHoursSpecification` + Speakable
- `app/page.tsx` — home meta + visible hours blocks
- `app/contact/page.tsx` — contact hours block
- `components/FooterHours.tsx` — footer default string
- `components/SeoLandingPage.tsx` — SEO landing footer line
- `app/plaza-lunch/page.tsx` — plaza page copy

SEO / agent identity surfaces (keep in sync on any real hours change):

- `data/neighborhoods.ts`
- `data/offerings.ts`
- `public/llms.txt` — answer-engine facts (missed in #184; fixed set C)
- `app/api/specs/route.ts` + `app/.well-known/ucp/route.ts` — machine hours

There is **no** single runtime config file. Hours are duplicated strings. Any intentional change is a multi-file PR; use `git grep` for `11am`, `10am`, `OpeningHours`, `opens:`, and `llms.txt`.

## Deploy source of truth

| Layer | Truth |
|-------|--------|
| Git | `origin/main` on `mazahalal/maza-mediterranean` |
| Hosting | Vercel project `maza-mediterranean` (team **maza-s-projects**), Production deploys from GitHub `main` |
| Live site | https://mazahalalfood.com |
| Credentials | `/workspace/maza-mediterranean/.env.local` (`VERCEL_*`, not the shared arealicehole Vercel token) |

Production is **not** whatever is checked out under `/workspace/maza-mediterranean` on the agent host.

## Why prod can be right while “local” looks wrong

1. **Shared primary checkout lags.** `/workspace/maza-mediterranean` often sits on local `main` tens of commits behind `origin/main` (dirty tree, root-owned lockfiles, many linked worktrees). Reading `app/layout.tsx` there without `git fetch` + comparing to `origin/main` shows pre-#184 hours.
2. **Feature branches are frozen snapshots.** `feat/catering-home-promo` tip `b42a026` is an **ancestor** of `origin/main` (merged) but **86+ commits behind**. Its tree still has `Tuesday–Sunday 10am–10pm`. Checking out that branch for “catering work” is not a current site view.
3. **Hours worktrees outlive the merge.** `maza-hours-new-wt` / `feat/hours-tue-thu-11-8-fri-sat-10-11` tip `aa5b7f1` is the pre-squash commit; main has squash `91359b9`. The branch tip is **not** on main even though the fix shipped.
4. **Vercel builds GitHub `main`**, not agent worktrees. Live JSON-LD on mazahalalfood.com matches `origin/main`.

## Required agent checkout protocol

**Never** implement or “verify” site content from:

- the shared `/workspace/maza-mediterranean` tree without first `git fetch origin` and `git rev-parse HEAD origin/main`
- a random existing `maza-*-wt` worktree
- a long-lived feature branch without `git rev-list --left-right --count origin/main...HEAD`

**Do** for every Maza code task:

```bash
cd /workspace/maza-mediterranean   # git dir only
git fetch origin
git rev-parse origin/main          # note SHA
# isolated worktree from CURRENT main
git worktree add -b <type>/<slug> /workspace/maza-<slug>-wt origin/main
cd /workspace/maza-<slug>-wt
# confirm hours baseline if touching copy/SEO
git grep -n 'OpeningHours\|11am–8pm\|10am–10pm' -- app components data | head
```

Before opening an hours-related PR:

1. `git merge-base --is-ancestor 91359b9 origin/main` (or newer hours SHA once this doc is updated)
2. curl live site hours snippet
3. If live == table above → stop; comment “already shipped”

After merge: delete the feature branch and `git worktree remove` the wt. Do not leave hours branches hanging.

## Stale hours-related refs (audit 2026-11-22)

### Safe to prune (merged into `origin/main`; tips are ancestors or obsolete)

| Ref / path | Note |
|------------|------|
| `feat/hours-sun-tue-wed-8pm` + `/workspace/maza-hours-8pm-wt` | Merged via #170; tip 35 behind main |
| `feat/maza-hours-fri-sat-10pm` | Fully merged; 467 behind |
| `feat/maza-hours-tue-sun-10pm` | Fully merged; 300 behind |
| `feat/maza-seo-hours-qa` | Fully merged; 419 behind |
| `feat/update-business-hours` | Fully merged; 403 behind |
| `feat/catering-home-promo` | Tip is ancestor of main (0 ahead / 86 behind) — **stale checkout magnet**; delete local branch label |
| `/tmp/tikka-hide`, `/tmp/tikka-restore` | Already marked prunable |

### Prune after confirming #184 on main (squash left orphan tip)

| Ref / path | Note |
|------------|------|
| `feat/hours-tue-thu-11-8-fri-sat-10-11` + `/workspace/maza-hours-new-wt` | Tip `aa5b7f1` ≠ squash `91359b9`; 1 unique commit not on main, 2 behind. Content shipped via #184 — remove branch + worktree |

### Keep / not hours-specific

Other `/workspace/maza-*-wt` worktrees may still hold unmerged feature work — do not mass-delete. Primary checkout `/workspace/maza-mediterranean` on local `main` should be fast-forwarded only when the worktree is clean and no agent holds locks; prefer leaving it alone and always using new worktrees from `origin/main`.

## Quick diagnosis checklist

```
[ ] git fetch origin
[ ] HEAD vs origin/main: git rev-list --left-right --count origin/main...HEAD
[ ] Live curl hours == origin/main FooterHours / layout JSON-LD?
[ ] If yes and task is “fix hours” → close as already done
[ ] Work only in a fresh worktree from origin/main
```
