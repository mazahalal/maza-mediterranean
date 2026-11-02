/** Time-boxed site-wide notices (America/Phoenix — no DST). */

export type SiteNotice = {
  id: string;
  /** Short uppercase eyebrow */
  eyebrow: string;
  /** Primary line */
  headline: string;
  /** Optional secondary detail */
  detail?: string;
  /** Inclusive start (ms UTC) */
  startsAt: number;
  /** Exclusive end (ms UTC) */
  endsAt: number;
};

/**
 * Closed Tue Nov 3 + Wed Nov 4 2026 for renovations.
 * Armed Mon so guests see it before they leave; auto-hides Thu open (10am Phx).
 */
export const RENOVATION_CLOSED_2026_11: SiteNotice = {
  id: "renovation-closed-2026-11-03-04",
  eyebrow: "Temporary hours",
  headline: "Closed Tuesday & Wednesday for renovations",
  detail: "Tue Nov 3 & Wed Nov 4 · Back Thursday 10am",
  // Mon Nov 2 00:00 Phoenix
  startsAt: Date.parse("2026-11-02T07:00:00.000Z"),
  // Thu Nov 5 00:00 Phoenix (store still closed overnight Wed→Thu; open 10am)
  endsAt: Date.parse("2026-11-05T07:00:00.000Z"),
};

const NOTICES: SiteNotice[] = [RENOVATION_CLOSED_2026_11];

export function isNoticeActive(
  notice: SiteNotice,
  now: Date | number = Date.now(),
): boolean {
  const t = typeof now === "number" ? now : now.getTime();
  return t >= notice.startsAt && t < notice.endsAt;
}

export function getActiveSiteNotice(
  now: Date | number = Date.now(),
): SiteNotice | null {
  for (const notice of NOTICES) {
    if (isNoticeActive(notice, now)) return notice;
  }
  return null;
}
