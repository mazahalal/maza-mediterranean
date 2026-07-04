'use client';

import { MenuCategory, MenuItem } from '@/data/menu';

interface MenuBoardProps {
  menuData: MenuCategory[];
  screen: 1 | 2;
  includeShawarma: boolean;
}

const SCREEN_1_CATEGORIES = ['Wraps', 'Wrap Upgrades', 'Plates'];
const SCREEN_2_CATEGORIES = [
  'Loaded Fries',
  'Loaded Hummus',
  'Burgers',
  'Specials',
  'Kids Meals',
  'Sides',
  'Desserts & Drinks',
];

function filterItems(items: MenuItem[], includeShawarma: boolean): MenuItem[] {
  if (includeShawarma) return items;
  return items.filter(item => !item.name.toLowerCase().includes('shawarma'));
}

function filterSection(section: MenuCategory, includeShawarma: boolean): MenuCategory | null {
  const filteredItems = filterItems(section.items, includeShawarma);
  if (filteredItems.length === 0) return null;
  return { ...section, items: filteredItems };
}

export default function MenuBoard({ menuData, screen, includeShawarma }: MenuBoardProps) {
  const categories = screen === 1 ? SCREEN_1_CATEGORIES : SCREEN_2_CATEGORIES;
  const sections = categories
    .map(cat => menuData.find(s => s.category === cat))
    .filter((s): s is MenuCategory => s != null)
    .map(section => filterSection(section, includeShawarma))
    .filter((s): s is MenuCategory => s != null);

  const screenLabel = screen === 1 ? 'SCREEN 1' : 'SCREEN 2';
  const shawarmaLabel = includeShawarma ? '' : ' — NO SHAWARMA';

  return (
    <div
      className="w-[1920px] h-[1080px] bg-[#0A1F1E] text-white p-16 relative overflow-hidden"
      style={{ fontFamily: 'var(--font-montserrat)' }}
    >
      {/* Ornate Gold Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[14px] bg-[#D3AB5E]" />
      <div className="absolute top-[14px] left-0 right-0 h-[3px] bg-[#D3AB5E]/40" />

      {/* Header */}
      <div className="flex justify-between items-start mb-10">
        <div>
          <div className="flex items-center gap-4">
            <div className="h-px w-16 bg-[#D3AB5E]" />
            <h1
              className="text-[92px] leading-none tracking-[6px] text-[#D3AB5E] font-serif"
              style={{ fontFamily: 'var(--font-cinzel)' }}
            >
              MAZA
            </h1>
            <div className="h-px w-16 bg-[#D3AB5E]" />
          </div>
          <p className="text-[#D3AB5E]/70 text-3xl tracking-[8px] ml-20 -mt-2">
            MEDITERRANEAN CUISINE
          </p>
        </div>

        <div className="text-right mt-2">
          <div className="inline-block border-[6px] border-[#D3AB5E] rounded-full px-10 py-5 relative">
            <div className="text-[#D3AB5E] text-3xl font-bold tracking-[4px]">100% HALAL</div>
            <div className="text-[#D3AB5E] text-xl tracking-[4px] -mt-1">CERTIFIED</div>
          </div>
        </div>
      </div>

      {/* Screen label */}
      <div className="text-[#D3AB5E]/60 text-2xl tracking-[6px] mb-8 text-right">
        {screenLabel}{shawarmaLabel}
      </div>

      {/* Grid layout: 2 columns for screen 1, 3 columns for screen 2 */}
      <div className={screen === 1 ? 'grid grid-cols-2 gap-16' : 'grid grid-cols-3 gap-10'}>
        {sections.map((section, idx) => (
          <div key={idx}>
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="h-px flex-1 bg-[#D3AB5E]/60" />
                <h2
                  className="text-5xl tracking-[6px] text-[#D3AB5E] whitespace-nowrap"
                  style={{ fontFamily: 'var(--font-cinzel)' }}
                >
                  {section.category.toUpperCase()}
                </h2>
                <div className="h-px flex-1 bg-[#D3AB5E]/60" />
              </div>
              {section.subtitle && (
                <p className="text-[#D3AB5E]/75 text-2xl tracking-wide text-center">
                  {section.subtitle}
                </p>
              )}
            </div>

            <div className={screen === 1 ? 'space-y-1.5' : 'space-y-3'}>
              {section.items.map((item, index) => (
                <div
                  key={index}
                  className={`border-b border-[#D3AB5E]/15 ${
                    screen === 1 ? 'pb-2' : 'pb-2'
                  }`}
                >
                  <div className="flex justify-between items-baseline">
                    <span className={screen === 1 ? 'text-[26px] tracking-wide pr-4' : 'text-[22px] tracking-wide pr-4'}>
                      {item.name}
                    </span>
                    <span className={`text-[#D3AB5E] tabular-nums tracking-wider whitespace-nowrap ${screen === 1 ? 'text-[26px]' : 'text-[22px]'}`}>
                      {item.price}
                    </span>
                  </div>
                  {(item.notes?.[0] || item.description) && (
                    <p className={`text-[#D3AB5E]/60 italic tracking-wide ${
                      screen === 1 ? 'text-[17px] mt-0.5' : 'text-[15px] mt-0.5'
                    }`}>
                      {item.notes?.[0] || item.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Ornate Gold Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[14px] bg-[#D3AB5E]" />
      <div className="absolute bottom-[14px] left-0 right-0 h-[3px] bg-[#D3AB5E]/40" />
    </div>
  );
}
