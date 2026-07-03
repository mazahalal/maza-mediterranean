import Link from "next/link";
import PhoneLink from "@/components/PhoneLink";
import MapEmbed from "@/components/MapEmbed";

export const metadata = {
  alternates: { canonical: "https://mazahalalfood.com" },
  title: "Maza Mediterranean Cuisine | Chandler AZ | Mediterranean Food Chandler",
  description: "Maza Mediterranean Cuisine Chandler AZ. Authentic Mediterranean food near Chandler Mall, Tempe & East Valley. Big portions, real ingredients, honest prices. Halal Mediterranean restaurant. Open Tue-Sun.",
};

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section 
        className="relative h-[70vh] flex items-center justify-center bg-[#0A1F1E] bg-cover bg-center"
        style={{ backgroundImage: "url('/images/maza/hero-brand-1920.jpg')" }}
      >
        <div className="absolute inset-0 bg-[#0A1F1E]/70"></div>
        <div className="relative text-center px-6">
          <div className="mb-4">
            <span className="font-display text-6xl md:text-8xl tracking-[0.2em] text-[#D3AB5E]">MAZA</span>
          </div>
          <div className="font-display text-2xl md:text-4xl tracking-[0.3em] text-[#F5F1E8] mb-6">MEDITERRANEAN CUISINE</div>
          <p className="text-xl md:text-2xl text-[#F5F1E8]/90 mb-8">
            Big portions. Real ingredients.<br />Honest prices.<br />Mediterranean food Chandler AZ — halal Mediterranean near Chandler Mall and Tempe.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/menu" 
              className="inline-block bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-10 py-4 rounded text-lg tracking-wide transition-colors"
            >
              View the Menu
            </Link>
            <a
              href="https://online.skytab.com/s/maza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-[#D3AB5E] text-[#D3AB5E] font-semibold px-10 py-4 rounded text-lg tracking-wide hover:bg-[#D3AB5E] hover:text-[#0A1F1E] transition-colors"
            >
              Order Online
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
              <p className="text-[#B8B8B8] mb-6">Tue–Wed 10am–8pm • Thu–Sun 10am–10pm • Closed Mondays</p>
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
        <h2 className="font-display text-4xl text-[#D3AB5E] tracking-wide mb-4">Open Tue–Sun, 10am–8pm (Thu–Sun until 10pm)</h2>
        <p className="text-[#F5F1E8]/80 text-lg">Dine in or grab it to go. Closed Mondays.</p>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0A1F1E] py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <p className="text-[#F5F1E8]/80 mb-8 text-lg">Dine in or grab it to go. Closed Mondays.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-block bg-[#D3AB5E] hover:bg-[#A87C3D] text-[#0A1F1E] font-semibold px-10 py-4 rounded text-lg tracking-wide"
            >
              See the Full Menu
            </Link>
            <a
              href="https://online.skytab.com/s/maza"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-10 py-4 rounded text-lg tracking-wide transition-colors"
            >
              Order Online
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
