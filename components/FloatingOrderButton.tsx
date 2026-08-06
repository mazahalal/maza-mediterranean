"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { TAKEOUT_URL } from "@/lib/ordering";

export default function FloatingOrderButton() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-3">
      {open && (
        <div className="flex flex-col gap-2 w-56 rounded-xl border border-[#D3AB5E]/30 bg-[#0A1F1E]/95 backdrop-blur-md p-3 shadow-2xl">
          <a
            href={TAKEOUT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full text-center bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-4 py-3 rounded-lg tracking-wide transition-colors"
          >
            Pickup — Order Online
          </a>
          <Link
            href="/menu-qr#delivery"
            onClick={() => setOpen(false)}
            className="block w-full text-center border border-[#D3AB5E] text-[#D3AB5E] hover:bg-[#D3AB5E] hover:text-[#0A1F1E] font-semibold px-4 py-3 rounded-lg tracking-wide transition-colors"
          >
            Delivery — UberEats & More
          </Link>
        </div>
      )}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label="Order now"
        className="rounded-full bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-bold px-6 py-4 shadow-xl tracking-wide text-lg transition-all active:scale-95"
      >
        {open ? "✕" : "Order Now"}
      </button>
    </div>
  );
}
