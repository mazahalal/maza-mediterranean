"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#000000] border-b border-[rgba(212,175,55,0.3)]">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <img src="/logo.png" alt="Maza Mediterranean Cuisine logo" className="h-10 w-auto" />
        </Link>

        <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {[
            { href: "/", label: "Home" },
            { href: "/menu", label: "Menu" },
            { href: "/gallery", label: "Gallery" },
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-white hover:text-[#d4af37] transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
