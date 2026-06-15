import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Quick Links | Maza Mediterranean Cuisine",
  description: "Menu, reviews, and socials for Maza Mediterranean Cuisine in Chandler, AZ.",
  icons: {
    icon: "/maza_ornate_logo.webp",
  },
};

export default function MenuQRPage() {
  return (
    <div className="min-h-[100dvh] bg-[#0A1F1E] text-[#F5F1E8] flex flex-col items-center px-6 py-12">
      <div className="w-full max-w-md text-center mb-10">
        <h1 className="font-display text-3xl tracking-[2px] text-[#D3AB5E] mb-1">
          Maza Mediterranean Cuisine
        </h1>
        <p className="text-[#B8B8B8] text-sm">
          3491 W Frye Rd, Ste 2 • Chandler, AZ 85226<br />
          (480) 534-6550
        </p>
      </div>

      {/* Menu Section - Prominent */}
      <div className="w-full max-w-md mb-10">
        <Link href="/menu">
          <div className="flex items-center justify-center gap-3 w-full py-5 px-6 rounded-full bg-[#D3AB5E] text-[#0A1F1E] hover:bg-[#c9a24f] active:scale-[0.985] transition-all text-lg font-medium tracking-wide shadow-lg">
            <span className="text-xl">🍽️</span>
            <span>View Our Menu</span>
          </div>
        </Link>
      </div>

      {/* Leave a Review Section */}
      <div className="w-full max-w-md mb-10">
        <div className="text-[#D3AB5E] text-sm tracking-widest mb-4 px-1">LEAVE A REVIEW</div>
        <div className="space-y-4">
          <a href="https://g.page/r/CWsguNCtl7azEBM/review" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full border border-[#D3AB5E]/40 bg-[#0A1F1E] hover:bg-[#D3AB5E] hover:text-[#0A1F1E] active:scale-[0.985] transition-all text-lg font-medium tracking-wide">
              <span className="text-xl">📍</span>
              <span>Google Reviews</span>
            </div>
          </a>
          <a href="https://maps.apple.com/place?place-id=I7007BFFB5FD13BAB&address=3491+W+Frye+Rd%2C+Ste+2%2C+Chandler%2C+AZ++85226%2C+United+States&coordinate=33.297117%2C-111.901518&name=Maza&_provider=9902" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full border border-[#D3AB5E]/40 bg-[#0A1F1E] hover:bg-[#D3AB5E] hover:text-[#0A1F1E] active:scale-[0.985] transition-all text-lg font-medium tracking-wide">
              <span className="text-xl">🗺️</span>
              <span>Apple Maps</span>
            </div>
          </a>
          <a href="https://www.yelp.com/writeareview/biz/Zzyi0SdgrDdFZ0xxHIBZ0w?review_origin=mobile-site-biz-details-action-button&return_url=https://m.yelp.com/biz/maza-mediterranean-cuisine-chandler" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full border border-[#D3AB5E]/40 bg-[#0A1F1E] hover:bg-[#D3AB5E] hover:text-[#0A1F1E] active:scale-[0.985] transition-all text-lg font-medium tracking-wide">
              <span className="text-xl">⭐</span>
              <span>Yelp Reviews</span>
            </div>
          </a>
        </div>
      </div>

      {/* Follow Us Online Section */}
      <div className="w-full max-w-md">
        <div className="text-[#D3AB5E] text-sm tracking-widest mb-4 px-1">FOLLOW US ONLINE</div>
        <div className="space-y-4">
          <a href="https://instagram.com/maza.halal" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full border border-[#D3AB5E]/40 bg-[#0A1F1E] hover:bg-[#D3AB5E] hover:text-[#0A1F1E] active:scale-[0.985] transition-all text-lg font-medium tracking-wide">
              <span className="text-xl">📷</span>
              <span>Instagram</span>
            </div>
          </a>
          <a href="https://tiktok.com/@maza.halal" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full border border-[#D3AB5E]/40 bg-[#0A1F1E] hover:bg-[#D3AB5E] hover:text-[#0A1F1E] active:scale-[0.985] transition-all text-lg font-medium tracking-wide">
              <span className="text-xl">🎵</span>
              <span>TikTok</span>
            </div>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61590423133133" target="_blank" rel="noopener noreferrer">
            <div className="flex items-center justify-center gap-3 w-full py-4 px-6 rounded-full border border-[#D3AB5E]/40 bg-[#0A1F1E] hover:bg-[#D3AB5E] hover:text-[#0A1F1E] active:scale-[0.985] transition-all text-lg font-medium tracking-wide">
              <span className="text-xl">👥</span>
              <span>Facebook</span>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
}
