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
      <div className="space-y-16">
        {menuData.map((section) => (
          <div
            key={section.category}
            id={`menu-cat-${categorySlug(section.category)}`}
            className="scroll-mt-36"
          >
            <div className="mb-6">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {section.items.map((item) => (
                <div
                  key={`${section.category}::${item.name}`}
                  onClick={() => openLightbox(item, section.category)}
                  className="bg-[#0E0E0E] rounded-lg border border-[rgba(211,171,94,0.15)] hover:border-[rgba(211,171,94,0.35)] transition-all duration-200 overflow-hidden cursor-pointer group"
                >
                  {item.image && (
                    <div className="relative w-full h-[62vh] sm:h-auto sm:aspect-[3/4] bg-[#111]">
                      <Image
                        src={item.image}
                        alt={menuAlt(item, section.category)}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-lg text-[#F5F1E8] tracking-wide">
                        {item.name}
                      </h3>
                      <span className="text-[#D3AB5E] font-bold text-lg ml-4">
                        {item.price}
                      </span>
                    </div>
                    {item.description && (
                      <p className="text-[#B8B8B8] text-sm mb-3">
                        {item.description}
                      </p>
                    )}
                    {item.note && (
                      <p className="text-[#B8B8B8] text-sm italic">
                        {item.note}
                      </p>
                    )}
                    {item.notes &&
                      item.notes.map((note, i) => (
                        <p key={i} className="text-[#B8B8B8] text-sm">
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
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-5xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-[#D3AB5E] transition-colors z-10"
            >
              ✕
            </button>

            {currentItem.image && (
              <div className="relative w-full h-[min(70vh,640px)] bg-[#0E0E0E] rounded-xl overflow-hidden border border-[#D3AB5E]/20 mb-4">
                <Image
                  src={currentItem.image}
                  alt={menuAlt(currentItem, currentItem._section)}
                  fill
                  sizes="(max-width: 1280px) 100vw, 1024px"
                  className="object-contain"
                  priority
                />
              </div>
            )}

            <div className="text-center">
              <h3 className="font-display text-2xl text-[#F5F1E8] mb-1">
                {currentItem.name}
              </h3>
              <p className="text-[#D3AB5E] text-xl font-bold mb-2">
                {currentItem.price}
              </p>
              {currentItem.description && (
                <p className="text-[#B8B8B8] max-w-2xl mx-auto">
                  {currentItem.description}
                </p>
              )}
              {currentItem.note && (
                <p className="text-[#B8B8B8] text-sm italic mt-2">
                  {currentItem.note}
                </p>
              )}
            </div>

            {allItems.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-[#D3AB5E] transition-colors bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
                >
                  ←
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white text-4xl hover:text-[#D3AB5E] transition-colors bg-black/50 rounded-full w-12 h-12 flex items-center justify-center"
                >
                  →
                </button>
              </>
            )}

            <div className="text-center mt-4 text-[#B8B8B8] text-sm">
              {currentIndex + 1} / {allItems.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
