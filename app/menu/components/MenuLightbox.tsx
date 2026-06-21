"use client";

import { useState } from "react";
import { menuData, MenuItem } from "@/data/menu";

export default function MenuLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  // All menu items for lightbox navigation
  const allItems: MenuItem[] = menuData.flatMap(section => section.items);

  const openLightbox = (clickedItem: MenuItem) => {
    const index = allItems.findIndex(item => item.name === clickedItem.name);
    if (index !== -1) {
      setCurrentIndex(index);
      setIsOpen(true);
    }
  };

  const closeLightbox = () => setIsOpen(false);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? allItems.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === allItems.length - 1 ? 0 : prev + 1));
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
          <div key={section.category}>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-px flex-1 bg-[rgba(211,171,94,0.3)]"></div>
                <h2 className="font-display text-2xl md:text-3xl font-bold text-[#D3AB5E] tracking-wider">
                  {section.category}
                </h2>
                <div className="h-px flex-1 bg-[rgba(211,171,94,0.3)]"></div>
              </div>
              {section.subtitle && (
                <p className="text-[#B8B8B8] text-sm mt-2 text-center">{section.subtitle}</p>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {section.items.map((item) => (
                <div
                  key={item.name}
                  onClick={() => openLightbox(item)}
                  className="bg-[#0E0E0E] rounded-lg border border-[rgba(211,171,94,0.15)] hover:border-[rgba(211,171,94,0.35)] transition-all duration-200 overflow-hidden cursor-pointer group"
                >
                  {item.image && (
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-48 object-contain bg-\[\#111\] group-hover:scale-105 transition-transform duration-300" 
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-lg text-[#F5F1E8] tracking-wide">{item.name}</h3>
                      <span className="text-[#D3AB5E] font-bold text-lg ml-4">{item.price}</span>
                    </div>
                    {item.description && (
                      <p className="text-[#B8B8B8] text-sm mb-3">{item.description}</p>
                    )}
                    {item.note && (
                      <p className="text-[#B8B8B8] text-sm italic">{item.note}</p>
                    )}
                    {item.notes && item.notes.map((note, i) => (
                      <p key={i} className="text-[#B8B8B8] text-sm">{note}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {isOpen && currentItem && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <div 
            className="relative max-w-5xl w-full"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeLightbox}
              className="absolute -top-12 right-0 text-white text-3xl hover:text-[#D3AB5E] transition-colors z-10"
            >
              ✕
            </button>

            {/* Image (only if exists) */}
            {currentItem.image && (
              <div className="relative bg-[#0E0E0E] rounded-xl overflow-hidden border border-[#D3AB5E]/20 mb-4">
                <img 
                  src={currentItem.image} 
                  alt={currentItem.name}
                  className="w-full max-h-[70vh] object-contain"
                />
              </div>
            )}

            {/* Info */}
            <div className="text-center">
              <h3 className="font-display text-2xl text-[#F5F1E8] mb-1">{currentItem.name}</h3>
              <p className="text-[#D3AB5E] text-xl font-bold mb-2">{currentItem.price}</p>
              {currentItem.description && (
                <p className="text-[#B8B8B8] max-w-2xl mx-auto">{currentItem.description}</p>
              )}
              {currentItem.note && (
                <p className="text-[#B8B8B8] text-sm italic mt-2">{currentItem.note}</p>
              )}
            </div>

            {/* Navigation Arrows */}
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

            {/* Counter */}
            <div className="text-center mt-4 text-[#B8B8B8] text-sm">
              {currentIndex + 1} / {allItems.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
