import Link from "next/link";

export default function Home() {
  return (
    <div>
      {/* Hero Section - Full dark luxury */}
      <section className="relative bg-[#0A0A0A] text-[#F5E6C8] py-32 px-4 min-h-[80vh] flex flex-col justify-center items-center">
        <div className="max-w-4xl mx-auto text-center">
          <h1 
            className="font-serif font-bold mb-4"
            style={{ 
              fontSize: 'clamp(4rem, 15vw, 12rem)', 
              background: 'linear-gradient(135deg, #F5E6C8 0%, #D4AF37 40%, #8B6914 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent', 
              backgroundClip: 'text',
              lineHeight: 1.1
            }}
          >
            MAZA
          </h1>
          <p className="text-[#8A8A8A] tracking-[0.4em] uppercase text-sm md:text-base mb-12">
            Mediterranean Cuisine
          </p>
          <Link
            href="/menu"
            className="inline-block border border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-[#0A0A0A] font-semibold px-10 py-4 transition-all duration-300 text-lg tracking-wide"
          >
            View Our Menu
          </Link>
        </div>
      </section>

      {/* About Section - Dark card */}
      <section className="py-20 px-4 bg-[#141414]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6">
            Welcome to Maza
          </h2>
          <p className="text-[#F5E6C8] text-lg leading-relaxed">
            Since opening our doors, Maza has been a gathering place for families, friends, and food lovers who share a passion for Mediterranean cuisine. We bring together time-honored recipes passed down through generations, fresh ingredients sourced daily, and the warm hospitality that defines the Mediterranean table.
          </p>
        </div>
      </section>

      {/* Highlights Section - 3 column grid on dark bg */}
      <section className="py-20 px-4 bg-[#0A0A0A]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#141414] p-8 rounded-xl border border-[#2A2A2A] text-center">
              <div className="text-4xl mb-4 text-[#D4AF37]">✦</div>
              <h3 className="font-serif text-xl font-bold text-[#D4AF37] mb-3">Authentic Recipes</h3>
              <p className="text-[#F5E6C8]">
                Traditional dishes from Greece, Turkey, Lebanon, and beyond, prepared the way they were meant to be.
              </p>
            </div>
            <div className="bg-[#141414] p-8 rounded-xl border border-[#2A2A2A] text-center">
              <div className="text-4xl mb-4 text-[#D4AF37]">✦</div>
              <h3 className="font-serif text-xl font-bold text-[#D4AF37] mb-3">Fresh Ingredients</h3>
              <p className="text-[#F5E6C8]">
                We source the finest olive oil, spices, and produce daily to ensure every dish is bursting with flavor.
              </p>
            </div>
            <div className="bg-[#141414] p-8 rounded-xl border border-[#2A2A2A] text-center">
              <div className="text-4xl mb-4 text-[#D4AF37]">✦</div>
              <h3 className="font-serif text-xl font-bold text-[#D4AF37] mb-3">Family Atmosphere</h3>
              <p className="text-[#F5E6C8]">
                A warm, welcoming space where every guest feels like part of the family from the moment they walk in.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-[#141414]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-[#D4AF37] mb-6">
            Ready to Experience Maza?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="bg-[#D4AF37] hover:bg-[#F5E6C8] text-[#0A0A0A] font-semibold px-8 py-4 transition-colors duration-200 text-lg"
            >
              Explore Menu
            </Link>
            <Link
              href="/contact"
              className="bg-transparent hover:bg-[#D4AF37]/10 text-[#D4AF37] font-semibold px-8 py-4 border border-[#D4AF37] transition-colors duration-200 text-lg"
            >
              Find Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}