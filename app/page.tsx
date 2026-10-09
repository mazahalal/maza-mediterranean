import Link from "next/link";
import PhoneLink from "@/components/PhoneLink";
import MapEmbed from "@/components/MapEmbed";
import DeliveryIcon from "@/components/DeliveryIcon";
import SamakWeekendBanner from "@/components/SamakWeekendBanner";
import SamakWeekendPopup from "@/components/SamakWeekendPopup";
import { TAKEOUT_URL, deliveryUrl } from "@/lib/ordering";
import { getActiveHomepagePromo } from "@/lib/promos";
import RelatedLinks from "@/components/RelatedLinks";
import { MAZA_GOOGLE_MAPS_URL } from "@/lib/maza-maps";

// Flash promos are date-gated at render time; ISR so static HTML cannot stick after endsAt.
export const revalidate = 60;

export const metadata = {
  alternates: { canonical: "https://mazahalalfood.com" },
  title: "Maza Mediterranean Cuisine | Chandler AZ | Mediterranean Food Chandler",
  description: "Maza Mediterranean Cuisine Chandler AZ. Authentic Mediterranean food near Chandler Mall, Tempe & East Valley. Big portions, real ingredients, honest prices. Halal Mediterranean restaurant. Open Tuesday–Sunday 10am–10pm. Closed Mondays.",
};

export default function Home() {
  const promo = getActiveHomepagePromo();
  const heroBg = promo?.imageSrc
    ? `url('${promo.imageSrc}')`
    : "url('/images/maza/hero-brand-1920.jpg')";

  return (
    <div>
      <SamakWeekendPopup />
      <SamakWeekendBanner />
      {/* Hero Section */}
      <section
        className="relative h-[70vh] flex items-center justify-center bg-[#0A1F1E] bg-cover bg-center"
        style={{ backgroundImage: heroBg }}
      >
        <div className="absolute inset-0 bg-[#0A1F1E]/70"></div>
        <div className="relative text-center px-6">
          {/* Single H1 with restaurant name — DoorDash/SEO checklist + a11y hierarchy */}
          <h1 className="mb-6">
            <span className="block font-display text-6xl md:text-8xl tracking-[0.2em] text-[#D3AB5E]">
              MAZA
            </span>
            <span className="mt-2 block font-display text-2xl md:text-4xl tracking-[0.3em] text-[#F5F1E8]">
              Mediterranean Cuisine
            </span>
            <span className="sr-only"> | Chandler, AZ</span>
          </h1>
          <p className="text-xl md:text-2xl text-[#F5F1E8]/90 mb-4">
            Big portions. Real ingredients.<br />Honest prices.<br />Mediterranean food Chandler AZ — halal Mediterranean near Chandler Mall and Tempe.
          </p>
          <p className="mb-8 text-sm md:text-base tracking-wide text-[#F5F1E8]/85">
            <span className="text-[#D3AB5E] font-semibold">4.9 ★</span>
            <span className="mx-2 text-[#F5F1E8]/40" aria-hidden="true">
              ·
            </span>
            <span>100+ Google reviews</span>
            <span className="mx-2 text-[#F5F1E8]/40" aria-hidden="true">
              ·
            </span>
            <a
              href={MAZA_GOOGLE_MAPS_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="underline decoration-[#D3AB5E]/50 underline-offset-4 hover:text-[#D3AB5E] transition-colors"
            >
              Read reviews
            </a>
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-block bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-10 py-4 rounded text-lg tracking-wide transition-colors"
            >
              View the Menu
            </Link>
            <a
              href={TAKEOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-10 py-4 rounded text-lg tracking-wide transition-colors"
            >
              Order Takeout
            </a>
            <a
              href={deliveryUrl("home_hero")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#D3AB5E] text-[#D3AB5E] font-semibold px-10 py-4 rounded text-lg tracking-wide hover:bg-[#D3AB5E] hover:text-[#0A1F1E] transition-colors"
            >
              <DeliveryIcon className="w-5 h-5" />
              Delivery
            </a>
            <Link
              href="/contact"
              className="inline-block border border-[#D3AB5E] text-[#D3AB5E] font-semibold px-10 py-4 rounded text-lg tracking-wide hover:bg-[#D3AB5E] hover:text-[#0A1F1E] transition-colors"
            >
              Find Us
            </Link>
          </div>
        </div>
      </section>

      {/* Highlights */}
      <section className="py-20 px-6 bg-[#0F2A28]">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Made In-House", text: "Everything from our marinades to our sauces is made fresh daily. No shortcuts." },
              { title: "Generous Portions", text: "Plates come with two kebabs, rice, salad, hummus, and tahini. You leave full." },
              { title: "Real Ingredients", text: "Quality olive oil, fresh spices, and real food — never frozen, never processed." },
            ].map((item, i) => (
              <div key={i} className="card p-8 rounded-lg text-center">
                <h3 className="font-display text-2xl text-[#D3AB5E] mb-4 tracking-wide">{item.title}</h3>
                <p className="text-[#F5F1E8]/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Catering promo — advertises the /catering page and request form */}
      <section className="py-20 px-6 bg-[#0A1F1E] border-t border-[#D3AB5E]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="overflow-hidden rounded-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/maza/catering-hero-shish-grill.webp"
                alt="Shish kebabs over open flame on the Maza grill"
                width={1920}
                height={1080}
                decoding="async"
                className="h-full w-full object-cover"
              />
            </div>
            <div>
              <h2 className="font-display text-3xl text-[#D3AB5E] tracking-wide mb-4">
                Catering by Maza
              </h2>
              <p className="text-[#F5F1E8]/90 text-lg mb-6">
                Shish kebab, rice, hummus, baba ghanoush, tzatziki and salad
                trays for offices, parties, weddings and schools. 100% halal,
                fresh from our grill, family-meal size.
              </p>
              <div className="space-y-4">
                <Link
                  href="/catering"
                  className="inline-block bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-8 py-3.5 rounded text-base tracking-wide transition-colors"
                >
                  Request Catering
                </Link>
                <PhoneLink className="inline-block border border-[#D3AB5E] text-[#D3AB5E] font-semibold px-8 py-3.5 rounded text-base tracking-wide hover:bg-[#D3AB5E] hover:text-[#0A1F1E] transition-colors" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Internal link hub — Jev link audit 2026-09-20 */}
      <section className="py-12 px-6 bg-[#0A1F1E] border-t border-[#D3AB5E]/20">
        <div className="max-w-5xl mx-auto">
          <RelatedLinks routeKey="home" heading="Popular at Maza" />
        </div>
      </section>

      {/* Local SEO block targeting GSC queries: "mediterranean food near me", "maza near me", "best new restaurants tempe", "best restaurants near chandler mall", "recently opened restaurants near me" */}
      <section className="py-10 px-6 bg-[#0F2A28] border-t border-[#D3AB5E]/20">
        <div className="max-w-5xl mx-auto text-center">
          <p className="text-[#F5F1E8]/90 text-lg md:text-xl">
            New to the area? Looking for <strong>Mediterranean food near me</strong> or the best restaurants near Chandler Mall?
            Maza is a recently opened, family-owned spot bringing authentic halal Mediterranean cuisine to Chandler, AZ and the East Valley (including Tempe).
          </p>
        </div>
      </section>

      {/* Find Us Teaser (homepage map for local SEO + quick location) */}
      <section className="py-16 px-6 bg-[#0F2A28] border-t border-[#D3AB5E]/20">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h2 className="font-display text-3xl text-[#D3AB5E] tracking-wide mb-4">Find Us</h2>
              <div className="space-y-1 text-[#F5F1E8]/80 mb-3">
                <p>3491 W Frye Rd, Suite 2</p>
                <p>Chandler, AZ 85226</p>
              </div>
              <p className="text-[#B8B8B8] mb-6">Tue–Sun 10am–10pm • Closed Mondays</p>
              <Link
                href="/contact"
                className="inline-block text-[#D3AB5E] hover:text-[#F5F1E8] transition-colors font-medium"
              >
                Full contact details &amp; message form →
              </Link>
            </div>
            <MapEmbed />
          </div>
        </div>
      </section>

      {/* Hours */}
      <section className="py-16 px-6 text-center border-t border-[#D3AB5E]/20">
        <h2 className="font-display text-4xl text-[#D3AB5E] tracking-wide mb-4">Open Tue–Sun, 10am–10pm</h2>
        <p className="text-[#F5F1E8]/80 text-lg">Dine in or grab it to go. Closed Mondays.</p>
        <p className="mt-4 text-[#F5F1E8]/80">
          Rated{" "}
          <span className="text-[#D3AB5E] font-semibold">4.9 ★</span> from 100+
          Google reviews.{" "}
          <a
            href={MAZA_GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-[#D3AB5E]/50 underline-offset-4 hover:text-[#D3AB5E] transition-colors"
          >
            See what guests say →
          </a>
        </p>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0A1F1E] py-20 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-[#F5F1E8]/80 mb-8 text-lg">Dine in or grab it to go. Closed Mondays.</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-block bg-[#D3AB5E] hover:bg-[#A87C3D] text-[#0A1F1E] font-semibold px-10 py-4 rounded text-lg tracking-wide transition-colors"
            >
              See the Full Menu
            </Link>
            <a
              href={TAKEOUT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-10 py-4 rounded text-lg tracking-wide transition-colors"
            >
              Order Takeout
            </a>
            <a
              href={deliveryUrl("home_final")}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-[#D3AB5E] text-[#D3AB5E] font-semibold px-10 py-4 rounded text-lg tracking-wide hover:bg-[#D3AB5E] hover:text-[#0A1F1E] transition-colors"
            >
              <DeliveryIcon className="w-5 h-5" />
              Delivery
            </a>
            <PhoneLink
              className="inline-block border border-[#D3AB5E] text-[#D3AB5E] font-semibold px-10 py-4 rounded text-lg tracking-wide hover:bg-[#D3AB5E] hover:text-[#0A1F1E] transition-colors"
            >
              Call to Order
            </PhoneLink>
          </div>
        </div>
      </section>
    </div>
  );
}
