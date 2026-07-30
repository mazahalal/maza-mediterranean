"use client";

import Link from "next/link";
import { useState } from "react";
import LogoLockup from "./LogoLockup";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0A1F1E]/95 backdrop:blur-md border-b border-[rgba(211,171,94,0.2)]">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <LogoLockup />

        <div className="hidden md:flex items-center gap-9 text-sm tracking-wide">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[#B8B8B8] hover:text-[#D3AB5E] transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://online.skytab.com/s/maza"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-5 py-2 rounded text-sm transition-colors"
          >
            Order Online
          </a>
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
          <a
            href="https://online.skytab.com/s/maza"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setIsOpen(false)}
            className="block w-full mt-3 bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-5 py-3 rounded text-center text-sm transition-colors"
          >
            Order Online
          </a>
        </div>
      )}
    </nav>
  );
}
