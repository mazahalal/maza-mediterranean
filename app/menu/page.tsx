import Image from "next/image";
import { metadata } from "./metadata";
import MenuLightbox from "./components/MenuLightbox";
import MenuCategoryNav from "./components/MenuCategoryNav";
import MenuTracker from "@/components/MenuTracker";
import SamakWeekendBanner from "@/components/SamakWeekendBanner";
import SamakWeekendPopup from "@/components/SamakWeekendPopup";
import { menuData } from "@/data/menu";
import { buildMenuJsonLd, SITE } from "@/lib/menu-schema";
import DeliveryIcon from "@/components/DeliveryIcon";
import { TAKEOUT_URL, deliveryUrl } from "@/lib/ordering";
import { getActiveHomepagePromo } from "@/lib/promos";

export { metadata };

// MAZ-32: Menu schema (Menu + MenuSection + MenuItem) for agent + local SEO
// image URLs absolute for visual search / SEO Bible §5
const menuJsonLd = buildMenuJsonLd(menuData, { url: `${SITE}/menu` });

export default function MenuPage() {
  const promo = getActiveHomepagePromo();
  const heroSrc = promo?.imageSrc ?? "/images/maza/menu/opt-family-meal.jpg";
  const heroAlt = promo
    ? promo.imageAlt
    : "Family Meal mixed grill platter — chicken tikka, lamb tikka, shish and kofta kebabs over rice, Maza Mediterranean Cuisine Chandler AZ";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(menuJsonLd) }}
      />
      <SamakWeekendPopup />
      <SamakWeekendBanner />
      <div className="py-16 px-4">
        <MenuTracker />
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-4 tracking-wider">
              Our Menu
            </h1>
            <p className="text-[#B8B8B8] text-lg max-w-2xl mx-auto">
              Maza Mediterranean Cuisine Chandler menu — wraps, plates, kebabs
              &amp; more. Big portions, real ingredients, honest prices.
              Mediterranean food Chandler AZ.
            </p>
            <div className="mt-8 mb-4 relative w-full max-w-2xl mx-auto aspect-[16/10] rounded-xl overflow-hidden shadow-xl border border-[#D3AB5E]/20">
              <Image
                src={heroSrc}
                alt={heroAlt}
                fill
                priority
                sizes="(max-width: 672px) 100vw, 672px"
                className="object-cover"
              />
            </div>
          </div>

        </div>

        <MenuCategoryNav />

        <div className="max-w-6xl mx-auto">
          <div className="mt-10">
            <MenuLightbox />
          </div>

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
                <DeliveryIcon className="w-5 h-5" />
                Delivery
              </a>
            </div>
            <p className="mt-4 text-[#B8B8B8] text-sm">
              Order ahead for pickup, or get delivery to your door.
            </p>
          </div>

          <div className="mt-8 bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)] text-center">
            <p className="text-[#F5F1E8]">
              <strong className="text-[#D3AB5E]">Note:</strong> All plates come
              with 2 kebabs unless otherwise noted, rice, salad, hummus +
              tahini. Please inform us of any allergies.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
