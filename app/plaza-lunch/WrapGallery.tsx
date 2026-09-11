"use client";

import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Wrap gallery for /plaza-lunch.
 *
 * Tapping a shot opens the same dark lightbox pattern used on /menu and
 * /gallery, with arrow buttons, keyboard keys, and a horizontal swipe on
 * touch so plaza employees can flip through the wraps one-handed.
 *
 * Plain <img> on purpose — no next/image transform spend.
 */
export interface WrapShot {
  name: string;
  image: string;
}

const SWIPE_THRESHOLD = 40;

export default function WrapGallery({ wraps }: { wraps: WrapShot[] }) {
  const [current, setCurrent] = useState<number | null>(null);
  const touchStartX = useRef<number | null>(null);

  const close = useCallback(() => setCurrent(null), []);
  const prev = useCallback(
    () => setCurrent((c) => (c === null ? null : c === 0 ? wraps.length - 1 : c - 1)),
    [wraps.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c === null ? null : c === wraps.length - 1 ? 0 : c + 1)),
    [wraps.length],
  );

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [current, close, prev, next]);

  if (wraps.length === 0) return null;

  const active = current === null ? null : wraps[current];

  return (
    <>
      {/* Snap-scrolling strip */}
      <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2">
        {wraps.map((wrap, i) => (
          <button
            key={wrap.name}
            type="button"
            onClick={() => setCurrent(i)}
            aria-label={`View ${wrap.name}`}
            className="w-[150px] shrink-0 snap-start text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={wrap.image}
              alt={`${wrap.name} at Maza Mediterranean Cuisine`}
              width={900}
              height={1600}
              loading="lazy"
              className="aspect-[9/16] w-full rounded-lg border border-[#D3AB5E]/30 object-cover transition-colors hover:border-[#D3AB5E]/60"
            />
            <span className="mt-2 block text-[11px] leading-snug text-[#B8B8B8]">
              {wrap.name}
            </span>
          </button>
        ))}
      </div>
      <p className="mt-3 text-[11px] tracking-[2px] text-[#B8B8B8]/70">
        TAP A WRAP — SWIPE FOR MORE →
      </p>

      {/* Lightbox */}
      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={close}
          onTouchStart={(e) => {
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const delta = e.changedTouches[0].clientX - touchStartX.current;
            touchStartX.current = null;
            if (Math.abs(delta) < SWIPE_THRESHOLD) return;
            if (delta < 0) next();
            else prev();
          }}
        >
          <div
            className="relative w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute -top-11 right-0 z-10 text-3xl text-white transition-colors hover:text-[#D3AB5E]"
            >
              ✕
            </button>

            <div className="relative mb-4 h-[min(70vh,620px)] w-full overflow-hidden rounded-xl border border-[#D3AB5E]/20 bg-[#0E0E0E]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={active.image}
                alt={`${active.name} at Maza Mediterranean Cuisine`}
                className="h-full w-full object-contain"
              />
            </div>

            <p className="text-center font-display text-lg text-[#F5F1E8]">
              {active.name}
            </p>
            <p className="mt-1 text-center text-sm text-[#B8B8B8]">
              {current! + 1} / {wraps.length}
            </p>

            <button
              type="button"
              onClick={prev}
              aria-label="Previous wrap"
              className="absolute left-2 top-[35%] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-3xl text-white transition-colors hover:text-[#D3AB5E]"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next wrap"
              className="absolute right-2 top-[35%] flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-black/60 text-3xl text-white transition-colors hover:text-[#D3AB5E]"
            >
              →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
