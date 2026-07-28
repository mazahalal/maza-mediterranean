import { metadata } from "./metadata";
import MenuLightbox from "./components/MenuLightbox";
import MenuTracker from "@/components/MenuTracker";
import { menuData } from "@/data/menu";
import { TAKEOUT_URL, deliveryUrl } from "@/lib/ordering";

export { metadata };

// MAZ-32: Menu schema (Menu + MenuSection + MenuItem) for agent + local SEO
const menuJsonLd = {
  "@context": "https://schema.org",
  "@type": "Menu",
  name: "Maza Mediterranean Cuisine Menu",
  description: "Authentic Mediterranean wraps, plates, burgers, sides, and desserts. Halal-certified. Big portions, real ingredients, honest prices.",
  url: "https://mazahalalfood.com/menu",
  hasMenuSection: menuData.map((section) => ({
    "@type": "MenuSection",
    name: section.category,
    hasMenuItem: section.items.map((item) => ({
      "@type": "MenuItem",
      name: item.name,
      description: item.description || item.note || item.notes?.join(" ") || "",
      offers: {
        "@type": "Offer",
        price: parseFloat(item.price.replace("$", "")),
        priceCurrency: "USD"
      }
    }))
  }))
};

export default function MenuPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <div className="py-16 px-4">
      <MenuTracker />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-4 tracking-wider">
              Our Menu
            </h1>
            <p className="text-[#B8B8B8] text-lg max-w-2xl mx-auto">
              Maza Mediterranean Cuisine Chandler menu — wraps, plates, kebabs &amp; more. Big portions, real ingredients, honest prices. Mediterranean food Chandler AZ.
            </p>
            <div className="mt-8 mb-4">
              <img src="/images/maza/menu/opt-PXL_20260607_180708446.jpg" alt="Mixed grill platter - Maza Special" className="w-full max-w-4xl mx-auto rounded-xl shadow-xl border border-[#D3AB5E]/20" />
            </div>
          </div>

          <MenuLightbox />

          <div className="mt-12 text-center">
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center">
              <a
                href={TAKEOUT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-10 py-4 rounded text-lg tracking-wide transition-colors"
              >
                Order Takeout
              </a>
              <a
                href={deliveryUrl("menu_page")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-[#D3AB5E] text-[#D3AB5E] font-semibold px-10 py-4 rounded text-lg tracking-wide hover:bg-[#D3AB5E] hover:text-[#0A1F1E] transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10h2m8 0h2m-2 0h-4m6 0h4a1 1 0 001-1v-3.586a1 1 0 00-.293-.707l-2.414-2.414A1 1 0 0016.586 8H15"
                  />
                </svg>
                Delivery
              </a>
            </div>
            <p className="mt-4 text-[#B8B8B8] text-sm">
              Order ahead for pickup, or get delivery to your door.
            </p>
          </div>

          <div className="mt-8 bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)] text-center">
            <p className="text-[#F5F1E8]">
              <strong className="text-[#D3AB5E]">Note:</strong> All plates come with 2 kebabs unless otherwise noted, rice, salad, hummus + tahini. Please inform us of any allergies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
