"use client";

import { useEffect, useState } from "react";
import {
  getActiveSiteNotice,
  type SiteNotice,
} from "@/lib/site-notices";

/** Sticky top strip for temporary closures / ops notices. */
export default function SiteNoticeBanner() {
  const [notice, setNotice] = useState<SiteNotice | null>(null);

  useEffect(() => {
    setNotice(getActiveSiteNotice());
  }, []);

  if (!notice) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="border-b border-[#D3AB5E]/50 bg-[#D3AB5E] text-[#0A1F1E]"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-0.5 px-4 py-2.5 text-center sm:px-6 sm:py-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] sm:text-xs">
          {notice.eyebrow}
        </p>
        <p className="text-sm font-bold leading-snug sm:text-base">
          {notice.headline}
        </p>
        {notice.detail ? (
          <p className="text-xs font-medium opacity-90 sm:text-sm">
            {notice.detail}
          </p>
        ) : null}
      </div>
    </div>
  );
}
