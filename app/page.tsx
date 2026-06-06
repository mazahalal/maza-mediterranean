import Link from "next/link";

export default function Home() {
  return (
    <div>
      <section className="relative bg-[#000000] flex items-center justify-center">
        <div className="max-w-5xl mx-auto px-6 py-28 text-center">
          <Image src="/logo.png" alt="Maza Mediterranean Cuisine logo" width={520} height={180} className="mx-auto mb-10" priority />
          <p className="text-sm tracking-[0.35em] uppercase text-[#d4af37] mb-6">
            Mediterranean Cuisine · Since 2011
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed">
            Authentic recipes, warm hospitality, and generous portions. Family-owned in Chandler, AZ.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-block bg-[#d4af37] text-[#000000] px-8 py-3 text-sm font-semibold tracking-wide hover:bg-white transition-colors"
            >
              View full menu
            </Link>
            <Link
              href="/about"
              className="inline-block border border-[rgba(212,175,55,0.5)] text-[#d4af37] px-8 py-3 text-sm tracking-wide hover:border-[#d4af37] transition-colors"
            >
              Our story
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-[#102a3a] border-y border-[rgba(212,175,55,0.2)]">
        <div className="max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-3 gap-10 text-center">
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#d4af37] mb-3">Est. 2011</p>
            <p className="text-white font-semibold">Family owned & operated</p>
            <p className="text-sm text-[#a0a0a0] mt-2">14 years of authentic Mediterranean cooking in Chandler</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#d4af37] mb-3">In-house kitchen</p>
            <p className="text-white font-semibold">Made fresh daily</p>
            <p className="text-sm text-[#a0a0a0] mt-2">No pre-processed mixes — real prep, real flavor</p>
          </div>
          <div>
            <p className="text-xs tracking-[0.3em] uppercase text-[#d4af37] mb-3">Open daily</p>
            <p className="text-white font-semibold">10am – 8pm</p>
            <p className="text-sm text-[#a0a0a0] mt-2">Lunch and dinner · Dine-in or takeout</p>
          </div>
        </div>
      </section>
    </div>
  );
}
