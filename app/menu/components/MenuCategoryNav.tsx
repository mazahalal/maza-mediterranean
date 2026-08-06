"use client";

import { useEffect, useState } from "react";
import { menuData } from "@/data/menu";

export function categorySlug(category: string): string {
  return category.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

export default function MenuCategoryNav() {
  const [active, setActive] = useState<string>("");

  useEffect(() => {
    const sections = menuData
      .map((s) => document.getElementById(`menu-cat-${categorySlug(s.category)}`))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-30% 0px -60% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Menu categories"
      className="sticky top-[72px] sm:top-[80px] z-40 bg-[#0A1F1E]/95 backdrop-blur-md border-y border-[rgba(211,171,94,0.2)] -mx-4 px-4"
    >
      <div className="max-w-6xl mx-auto flex gap-2 overflow-x-auto py-3 scrollbar-none [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {menuData.map((section) => {
          const id = `menu-cat-${categorySlug(section.category)}`;
          const isActive = active === id;
          return (
            <a
              key={section.category}
              href={`#${id}`}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium tracking-wide transition-colors border ${
                isActive
                  ? "bg-[#D3AB5E] text-[#0A1F1E] border-[#D3AB5E]"
                  : "text-[#B8B8B8] border-[rgba(211,171,94,0.25)] hover:text-[#D3AB5E] hover:border-[#D3AB5E]/60"
              }`}
            >
              {section.category}
            </a>
          );
        })}
      </div>
    </nav>
  );
}
