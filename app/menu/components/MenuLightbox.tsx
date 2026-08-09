"use client";

import { useState } from "react";
import Image from "next/image";
import { menuData, MenuItem } from "@/data/menu";
import { trackMeta } from "@/lib/meta-pixel";
import { categorySlug } from "./MenuCategoryNav";

function menuAlt(item: MenuItem, section?: string): string {
  const cat = section ? ` (${section})` : "";
  return `${item.name}${cat} — Maza Mediterranean Cuisine, Chandler AZ`;
}

export default function MenuLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Prefer section+name so Loaded Fries vs Loaded Hummus don't collide
  const allItems: (MenuItem & { _section: string })[] = menuData.flatMap(
    (section) =>
      section.items.map((item) => ({ ...item, _section: section.category }))
  );

  const openLightbox = (clickedItem: MenuItem, sectionCategory: string) => {
    const index = allItems.findIndex(
      (item) =>
        item.name === clickedItem.name && item._section === sectionCategory
    );
    if (index !== -1) {
      setCurrentIndex(index);
      setIsOpen(true);

      const priceStr = clickedItem.price || "";
      const value = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
      trackMeta("ViewContent", {
        content_name: clickedItem.name,
        content_category: sectionCategory || "Menu Item",
        value: value,
        currency: "USD",
      });
    }
  };

  const closeLightbox = () => setIsOpen(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) =>
      prev === allItems.length - 1 ? 0 : prev + 1
    );
  };

  const currentItem = allItems[currentIndex];

  if (typeof window !== "undefined") {
    window.onkeydown = (e) => {
      if (!isOpen) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };
  }

  return (
    <>
      <div className="space-y-14 sm:space-y-16">
        {menuData.map((section) => (
          <div
            key={section.category}
            id={`menu-cat-${categorySlug(section.category)}`}
            className="scroll-mt-44"
          >
            <div className="mb-5 sm:mb-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-px flex-1 bg-[rgba(211,171,94,0.3)]"></div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#D3AB5E] tracking-wider">
                  {section.category}
                </h2>
                <div className="h-px flex-1 bg-[rgba(211,171,94,0.3)]"></div>
              </div>
              {section.subtitle && (
                <p className="text-[#B8B8B8] text-sm mt-2 text-center">
                  {section.subtitle}
                </p>
              )}
            </div>

            {/* Mobile: 1-col vertical feed. Desktop: 2–3 col portrait cards. */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
              {section.items.map((item) => (
                <div
                  key={`${section.category}::${item.name}`}
                  onClick={() => openLightbox(item, section.category)}
                  className="bg-[#0E0E0E] rounded-xl border border-[rgba(211,171,94,0.15)] hover:border-[rgba(211,171,94,0.35)] transition-all duration-200 overflow-hidden cursor-pointer group flex flex-col"
                >
                  {item.image && (
                    <div
                      className={
                        /* All menu stills are 9:16. Near full-phone on mobile; 3:4 cards from sm up */
                        "relative w-full bg-[#0A0A0A] " +
                        "aspect-[9/16] max-h-[78vh] sm:max-h-none sm:aspect-[3/4]"
                      }
                    >
                      <Image
                        src={item.image}
                        alt={menuAlt(item, section.category)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-3 mb-1.5">
                      <h3 className="font-display text-lg sm:text-xl text-[#F5F1E8] tracking-wide leading-snug">
                        {item.name}
                      </h3>
                      <span className="text-[#D3AB5E] font-bold text-lg sm:text-xl shrink-0">
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-[#B8B8B8] text-sm leading-relaxed">
                        {item.description}
                      </p>
                    )}
                    {item.note && (
                      <p className="text-[#B8B8B8] text-sm italic mt-1">
                        {item.note}
                      </p>
                    )}
                    {item.notes &&
                      item.notes.map((note, i) => (
                        <p key={i} className="text-[#B8B8B8] text-sm mt-0.5">
                          {note}
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {isOpen && currentItem && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative w-full sm:max-w-lg md:max-w-xl max-h-[100dvh] sm:max-h-[92vh] overflow-y-auto bg-[#0A0A0A] sm:rounded-xl sm:border sm:border-[#D3AB5E]/20"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-3 right-3 z-10 text-white text-2xl leading-none hover:text-[#D3AB5E] transition-colors bg-black/55 rounded-full w-10 h-10 flex items-center justify-center"
              aria-label="Close"
            >
              ✕
            </button>

            {currentItem.image && (
              <div className="relative w-full bg-black aspect-[9/16] max-h-[78dvh]">
                <Image
                  src={currentItem.image}
                  alt={menuAlt(currentItem, currentItem._section)}
                  fill
                  sizes="(max-width: 640px) 100vw, 512px"
                  className="object-cover"
                  priority
                />
              </div>
            )}

            <div className="text-center px-5 py-5">
              <h3 className="font-display text-2xl text-[#F5F1E8] mb-1">
                {currentItem.name}
              </h3>
              <p className="text-[#D3AB5E] text-xl font-bold mb-2">
                {currentItem.price}
              </p>
              {currentItem.description && (
                <p className="text-[#B8B8B8] max-w-md mx-auto text-sm sm:text-base">
                  {currentItem.description}
                </p>
              )}
              {currentItem.note && (
                <p className="text-[#B8B8B8] text-sm italic mt-2">
                  {currentItem.note}
                </p>
              )}
              {allItems.length > 1 && (
                <div className="flex items-center justify-center gap-6 mt-5">
                  <button
                    onClick={goToPrevious}
                    className="text-white text-2xl hover:text-[#D3AB5E] transition-colors bg-white/10 rounded-full w-12 h-12 flex items-center justify-center"
                    aria-label="Previous item"
                  >
                    ←
                  </button>
                  <span className="text-[#B8B8B8] text-sm tabular-nums">
                    {currentIndex + 1} / {allItems.length}
                  </span>
                  <button
                    onClick={goToNext}
                    className="text-white text-2xl hover:text-[#D3AB5E] transition-colors bg-white/10 rounded-full w-12 h-12 flex items-center justify-center"
                    aria-label="Next item"
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
