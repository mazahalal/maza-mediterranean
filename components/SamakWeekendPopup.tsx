"use client";

import Image from "next/image";
import { useEffect, useId, useState } from "react";
import { TAKEOUT_URL } from "@/lib/ordering";
import {
  getActiveHomepagePromo,
  type ActivePromo,
} from "@/lib/promos";
import PhoneLink from "@/components/PhoneLink";

export default function SamakWeekendPopup() {
  const titleId = useId();
  const [open, setOpen] = useState(false);
  const [promo] = useState<ActivePromo | null>(() => getActiveHomepagePromo());

  useEffect(() => {
    if (!promo) return;
    const key = `maza-promo-dismissed:${promo.id}`;
    try {
      if (window.sessionStorage.getItem(key) === "1") return;
    } catch {
      /* ignore */
    }
    const t = window.setTimeout(() => setOpen(true), 450);
    return () => window.clearTimeout(t);
  }, [promo]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- dismiss is stable enough for unmount cleanup
  }, [open]);

  function dismiss() {
    setOpen(false);
    if (!promo) return;
    try {
      window.sessionStorage.setItem(`maza-promo-dismissed:${promo.id}`, "1");
    } catch {
      /* ignore */
    }
  }

  if (!promo || !open) return null;

  const img = promo.popupImageSrc || promo.imageSrc;
  const hasWait = Boolean(promo.waitNote || promo.orderAheadNote);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
    >
      <button
        type="button"
        aria-label="Close special offer"
        className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
        onClick={dismiss}
      />

      <div className="relative z-[81] w-full max-w-md overflow-hidden rounded-2xl border border-[#D3AB5E]/40 bg-[#0A1F1E] shadow-2xl shadow-black/50">
        <div className="relative aspect-[3/4] w-full max-h-[52vh] bg-[#0E0E0E] sm:aspect-[4/3] sm:max-h-none">
          <Image
            src={img}
            alt={promo.imageAlt}
            fill
            priority
            sizes="(max-width: 448px) 100vw, 448px"
            className="object-cover object-center"
          />
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#0A1F1E] to-transparent" />
          <button
            type="button"
            onClick={dismiss}
            className="absolute right-3 top-3 rounded-full bg-black/55 px-3 py-1 text-sm font-semibold text-[#F5F1E8] hover:bg-black/75"
          >
            Close
          </button>
        </div>

        <div id="weekend-special-popup" className="space-y-3 px-5 pb-6 pt-4">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#D3AB5E]">
            {promo.title} · {promo.whenLabel}
          </p>
          <h2
            id={titleId}
            className="font-display text-2xl tracking-wide text-[#F5F1E8]"
          >
            {promo.itemName}{" "}
            <span className="text-[#D3AB5E]">{promo.salePrice}</span>
          </h2>
          <p className="text-sm text-[#F5F1E8]/85">
            {promo.blurb}.{" "}
            <span className="text-[#B8B8B8] line-through">
              was {promo.regularPrice}
            </span>
          </p>
          {hasWait && (
            <div className="rounded-lg border border-[#D3AB5E]/35 bg-[#0E0E0E] px-3 py-3 text-sm">
              {promo.waitNote ? (
                <p className="font-semibold text-[#E9C87B]">{promo.waitNote}</p>
              ) : null}
              {promo.orderAheadNote ? (
                <p className="mt-1 text-[#F5F1E8]/85">{promo.orderAheadNote}</p>
              ) : null}
            </div>
          )}

          <div className="flex flex-col gap-2 pt-1 sm:flex-row">
            <a
              href={TAKEOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center rounded bg-[#D3AB5E] px-4 py-3 text-center text-sm font-semibold tracking-wide text-[#0A1F1E] transition-colors hover:bg-[#C49A4D]"
            >
              Order Takeout
            </a>
            <PhoneLink className="inline-flex flex-1 items-center justify-center rounded border border-[#D3AB5E] px-4 py-3 text-center text-sm font-semibold tracking-wide text-[#D3AB5E] transition-colors hover:bg-[#D3AB5E] hover:text-[#0A1F1E]">
              Call
            </PhoneLink>
          </div>
        </div>
      </div>
    </div>
  );
}
