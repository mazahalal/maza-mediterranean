'use client';

import { MenuCategory } from '@/data/menu';

interface MenuBoardProps {
  menuData: MenuCategory[];
}

export default function MenuBoard({ menuData }: MenuBoardProps) {
  const wrapsSection = menuData.find(s => s.category === 'Wraps');
  const platesSection = menuData.find(s => s.category === 'Plates');

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
          <p className="text-[#D3AB5E]/70 text-3xl tracking-[8px] ml-20 -mt-2">MEDITERRANEAN CUISINE</p>
        </div>

        {/* 100% Certified Halal Badge - Ornate */}
        <div className="text-right mt-2">
          <div className="inline-block border-[6px] border-[#D3AB5E] rounded-full px-10 py-5 relative">
            <div className="text-[#D3AB5E] text-3xl font-bold tracking-[4px]">100% HALAL</div>
            <div className="text-[#D3AB5E] text-xl tracking-[4px] -mt-1">CERTIFIED</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-16">
        {/* WRAPS COLUMN */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px flex-1 bg-[#D3AB5E]/60" />
              <h2 
                className="text-6xl tracking-[6px] text-[#D3AB5E] whitespace-nowrap" 
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                WRAPS
              </h2>
              <div className="h-px flex-1 bg-[#D3AB5E]/60" />
            </div>
            
            {wrapsSection?.subtitle && (
              <p className="text-[#D3AB5E]/75 text-3xl tracking-wide text-center">
                {wrapsSection.subtitle}
              </p>
            )}
          </div>

          <div className="space-y-[13px]">
            {wrapsSection?.items.map((item, index) => (
              <div key={index} className="flex justify-between items-baseline text-[29px] border-b border-[#D3AB5E]/15 pb-2.5">
                <span className="tracking-wide">{item.name}</span>
                <span className="text-[#D3AB5E] tabular-nums tracking-wider">{item.price}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PLATES COLUMN */}
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-px flex-1 bg-[#D3AB5E]/60" />
              <h2 
                className="text-6xl tracking-[6px] text-[#D3AB5E] whitespace-nowrap" 
                style={{ fontFamily: 'var(--font-cinzel)' }}
              >
                PLATES
              </h2>
              <div className="h-px flex-1 bg-[#D3AB5E]/60" />
            </div>
          </div>

          <div className="space-y-6">
            {platesSection?.items.map((item, index) => (
              <div key={index} className="border-b border-[#D3AB5E]/15 pb-4">
                <div className="flex justify-between items-baseline text-[29px]">
                  <span className="tracking-wide">{item.name}</span>
                  <span className="text-[#D3AB5E] tabular-nums tracking-wider">{item.price}</span>
                </div>
                {item.notes && item.notes[0] && (
                  <p className="text-[#D3AB5E]/70 text-2xl tracking-wide mt-1.5 pr-4">
                    {item.notes[0]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ornate Gold Bottom Border */}
      <div className="absolute bottom-0 left-0 right-0 h-[14px] bg-[#D3AB5E]" />
      <div className="absolute bottom-[14px] left-0 right-0 h-[3px] bg-[#D3AB5E]/40" />
    </div>
  );
}
