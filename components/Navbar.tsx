"use client";

import Link from "next/link";
import { useState } from "react";
import LogoLockup from "./LogoLockup";
import { TAKEOUT_URL } from "@/lib/ordering";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
];

const takeoutClassDesktop =
  "inline-flex items-center justify-center bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-3.5 py-2 rounded text-xs lg:text-sm transition-colors whitespace-nowrap";

const takeoutClassMobile =
  "block w-full bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-5 py-3 rounded text-center text-sm transition-colors";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0A1F1E]/95 backdrop-blur-md border-b border-[rgba(211,171,94,0.2)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-3">
        <LogoLockup />

        <div className="hidden md:flex items-center gap-5 lg:gap-9 text-sm tracking-wide min-w-0">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#B8B8B8] hover:text-[#D3AB5E] transition-colors shrink-0"
            >
              {link.label}
            </Link>
          ))}
          <div className="ml-2 lg:ml-4 flex items-center gap-2 shrink-0">
            <a
              href={TAKEOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={takeoutClassDesktop}
            >
              Order Takeout
            </a>
          </div>
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-[#B8B8B8]"
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden px-6 pb-6 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="block py-2 text-[#B8B8B8] hover:text-[#D3AB5E]"
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-3 space-y-2">
            <a
              href={TAKEOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className={takeoutClassMobile}
            >
              Order Takeout
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
