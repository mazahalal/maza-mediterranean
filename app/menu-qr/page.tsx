import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quick Links | Maza Mediterranean Cuisine",
  description: "Menu, reviews, and socials for Maza Mediterranean Cuisine in Chandler, AZ.",
  icons: {
    icon: "/maza_ornate_logo.webp",
  },
};

const links = [
  {
    label: "View Our Menu",
    href: "/menu",
    icon: "🍽️",
    internal: true,
  },
  {
    label: "Google Reviews",
    href: "https://maps.app.goo.gl/a5wwA2sxf2vj4ijY9",
    icon: "📍",
    internal: false,
  },
  {
    label: "Apple Maps",
    href: "https://maps.apple.com/place?place-id=I7007BFFB5FD13BAB&address=3491+W+Frye+Rd%2C+Ste+2%2C+Chandler%2C+AZ++85226%2C+United+States&coordinate=33.297117%2C-111.901518&name=Maza&_provider=9902",
    icon: "🗺️",
    internal: false,
  },
  {
    label: "Yelp Reviews",
    href: "https://www.yelp.com/biz/maza-mediterranean-cuisine-chandler",
    icon: "⭐",
    internal: false,
  },
  {
    label: "Instagram",
    href: "https://instagram.com/maza.halal",
    icon: "📷",
    internal: false,
  },
  {
    label: "TikTok",
    href: "https://tiktok.com/@maza.halal",
    icon: "🎵",
    internal: false,
  },
  {
    label: "Facebook",
    href: "https://facebook.com/maza.halal",
    icon: "👥",
    internal: false,
  },
];

export default function MenuQRPage() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1F1E] text-[#F5F1E8] flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <img
            src="/MAZA_logo_trans.webp"
            alt="Maza Mediterranean Cuisine"
            className="h-20 mx-auto mb-6"
          />
          <h1 className="font-display text-3xl tracking-[3px] text-[#D3AB5E] mb-2">
            MAZA
          </h1>
          <p className="text-[#B8B8B8] text-sm">Big portions. Real ingredients. Honest prices.</p>
        </div>

        {/* Link Buttons */}
        <div className="space-y-3">
          {links.map((link, index) => {
            const ButtonContent = (
              <div className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full border border-[#D3AB5E]/40 bg-[#0A1F1E] hover:bg-[#D3AB5E] hover:text-[#0A1F1E] active:scale-[0.985] transition-all text-lg font-medium tracking-wide">
                <span className="text-xl">{link.icon}</span>
                <span>{link.label}</span>
              </div>
            );

            return link.internal ? (
              <Link key={index} href={link.href}>
                {ButtonContent}
              </Link>
            ) : (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {ButtonContent}
              </a>
            );
          })}
        </div>

        {/* Footer info */}
        <div className="mt-12 text-center text-xs text-[#B8B8B8] space-y-1">
          <p>3491 W Frye Rd, Ste 2 • Chandler, AZ 85226</p>
          <p>(480) 534-6550 • Open daily 10am–8pm</p>
        </div>
      </div>
    </div>
  );
}
