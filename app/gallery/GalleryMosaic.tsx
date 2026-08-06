"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { galleryImages } from "./gallery-images";

export default function GalleryMosaic() {
  const [current, setCurrent] = useState<number | null>(null);

  const close = useCallback(() => setCurrent(null), []);
  const prev = useCallback(
    () => setCurrent((c) => (c === null ? null : (c === 0 ? galleryImages.length - 1 : c - 1))),
    []
  );
  const next = useCallback(
    () => setCurrent((c) => (c === null ? null : (c === galleryImages.length - 1 ? 0 : c + 1))),
    []
  );

  useEffect(() => {
    if (current === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [current, close, prev, next]);

  return (
    <>
      {/* Masonry mosaic */}
      <div className="columns-2 sm:columns-3 lg:columns-4 gap-3 [column-fill:balance]">
        {galleryImages.map((image, i) => (
          <button
            key={image.src}
            onClick={() => setCurrent(i)}
            className="relative block w-full mb-3 break-inside-avoid overflow-hidden rounded-lg border border-[rgba(211,171,94,0.15)] hover:border-[rgba(211,171,94,0.4)] transition-colors duration-200 group cursor-pointer"
            aria-label={`View ${image.alt}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image.src}
              alt={image.alt}
              loading="lazy"
              className="w-full h-auto block group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-3">
              <p className="text-[#F5F1E8] text-xs sm:text-sm text-left">{image.alt}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {current !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={close}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={close}
              aria-label="Close"
              className="absolute -top-12 right-0 text-white text-3xl hover:text-[#D3AB5E] transition-colors z-10"
            >
              ✕
            </button>

            <div className="relative w-full h-[min(75vh,700px)] bg-[#0E0E0E] rounded-xl overflow-hidden border border-[#D3AB5E]/20 mb-4">
              <Image
                src={galleryImages[current].src}
                alt={galleryImages[current].alt}
                fill
                sizes="(max-width: 1280px) 100vw, 1024px"
                className="object-contain"
                priority
              />
            </div>

            <p className="text-center font-display text-xl text-[#F5F1E8]">
              {galleryImages[current].alt}
            </p>

            <button
              onClick={prev}
              aria-label="Previous photo"
              className="absolute left-2 sm:left-4 top-[37%] -translate-y-1/2 text-white text-4xl hover:text-[#D3AB5E] transition-colors bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Next photo"
              className="absolute right-2 sm:right-4 top-[37%] -translate-y-1/2 text-white text-4xl hover:text-[#D3AB5E] transition-colors bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
            >
              →
            </button>

            <div className="text-center mt-3 text-[#B8B8B8] text-sm">
              {current + 1} / {galleryImages.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
