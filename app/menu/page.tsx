import { metadata } from "./metadata";
import MenuLightbox from "./components/MenuLightbox";
import { menuData } from "@/data/menu";

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
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-4 tracking-wider">
              Our Menu
            </h1>
            <p className="text-[#B8B8B8] text-lg max-w-2xl mx-auto">
              Big portions. Real ingredients. Honest prices. Made fresh, in-house, every day.
            </p>
            <div className="mt-8 mb-4">
              <img src="/images/maza/menu/opt-PXL_20260607_180708446.jpg" alt="Mixed grill platter - Maza Special" className="w-full max-w-4xl mx-auto rounded-xl shadow-xl border border-[#D3AB5E]/20" />
            </div>
          </div>

          <MenuLightbox />

          <div className="mt-16 bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)] text-center">
            <p className="text-[#F5F1E8]">
              <strong className="text-[#D3AB5E]">Note:</strong> All plates come with 2 kebabs unless otherwise noted, rice, salad, hummus + tahini. Please inform us of any allergies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
