"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getActiveHomepagePromo,
  type ActivePromo,
} from "@/lib/promos";

/** Compact sticky header strip with gyro/promo photo while a flash sale is live. */
export default function HeaderPromo() {
  const [promo, setPromo] = useState<ActivePromo | null>(null);

  useEffect(() => {
    setPromo(getActiveHomepagePromo());
  }, []);

  if (!promo) return null;

  return (
    <Link
      href="/#weekend-special"
      className="block border-b border-[#D3AB5E]/40 bg-[#0E0E0E] hover:bg-[#122826] transition-colors"
      aria-label={`${promo.itemName} ${promo.salePrice} weekend special`}
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-2 sm:px-6">
        <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-md border border-[#D3AB5E]/35 sm:h-12 sm:w-16">
          <Image
            src={promo.imageSrc}
            alt=""
            fill
            sizes="64px"
            className="object-cover object-center"
            priority
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[10px] font-semibold uppercase tracking-[0.22em] text-[#D3AB5E] sm:text-xs">
            {promo.title} · {promo.whenLabel}
          </p>
          <p className="truncate text-sm font-semibold text-[#F5F1E8] sm:text-base">
            {promo.itemName}{" "}
            <span className="text-[#D3AB5E]">{promo.salePrice}</span>
            <span className="ml-2 text-xs font-normal text-[#B8B8B8] line-through sm:text-sm">
              {promo.regularPrice}
            </span>
          </p>
        </div>
        <span className="shrink-0 rounded bg-[#D3AB5E] px-2.5 py-1 text-xs font-bold tracking-wide text-[#0A1F1E] sm:px-3">
          Order
        </span>
      </div>
    </Link>
  );
}
