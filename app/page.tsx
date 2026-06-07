import Link from 'next/link'

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center bg-[#0A1F1E]">
        <div className="text-center px-6">
          <div className="mb-4">
            <span className="font-display text-6xl md:text-8xl tracking-[0.2em] text-[#D3AB5E]">MAZA</span>
          </div>
          <div className="font-display text-2xl md:text-4xl tracking-[0.3em] text-[#F5F1E8] mb-6">MEDITERRANEAN CUISINE</div>
          <p className="text-xl md:text-2xl text-[#F5F1E8]/90 mb-8">
            Big portions. Real ingredients.<br />Honest prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/menu" 
              className="inline-block bg-[#D3AB5E] hover:bg-[#C49A4D] text-[#0A1F1E] font-semibold px-10 py-4 rounded text-lg tracking-wide transition-colors"
            >
              View the Menu
            </Link>
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

      {/* Hours */}
      <section className="py-16 px-6 text-center border-t border-[#D3AB5E]/20">
        <h2 className="font-display text-4xl text-[#D3AB5E] tracking-wide mb-4">Open Daily, 10am–8pm</h2>
        <p className="text-[#F5F1E8]/80 text-lg">Dine in or grab it to go. We’re here every day.</p>
      </section>

      {/* Final CTA */}
      <section className="bg-[#0A1F1E] py-20 px-6 text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="font-display text-4xl text-[#D3AB5E] tracking-wide mb-4">Open Daily, 10am–8pm</h2>
          <p className="text-[#F5F1E8]/80 mb-8 text-lg">Dine in or grab it to go. We’re here every day.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="inline-block bg-[#D3AB5E] hover:bg-[#A87C3D] text-[#0A1F1E] font-semibold px-10 py-4 rounded text-lg tracking-wide"
            >
              See the Full Menu
            </Link>
            <a 
              href="tel:4805346550" 
              className="inline-block border border-[#D3AB5E] text-[#D3AB5E] font-semibold px-10 py-4 rounded text-lg tracking-wide hover:bg-[#D3AB5E] hover:text-[#0A1F1E] transition-colors"
            >
              Call to Order
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
