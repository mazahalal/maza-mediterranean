export const metadata = {
  alternates: { canonical: "https://mazahalalfood.com/about" },
  title: "About Maza Mediterranean | Chandler AZ Mediterranean Restaurant",
  description: "Family-owned Mediterranean restaurant in Chandler AZ. Recently opened to bring authentic halal Mediterranean food, big portions and real ingredients to neighbors near Chandler Mall and the East Valley.",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-4 tracking-wider">
            About Maza
          </h1>
          <p className="text-[#B8B8B8] text-lg">
            Made fresh, in-house, every day.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Our Story
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed">
              Maza started with a simple idea: Mediterranean food should be accessible to everyone. Not fancy, not pretentious — just good food made with real ingredients, generous portions, and honest prices. We recently opened in Chandler because this is where we live, and we wanted a spot our neighbors could count on for solid Mediterranean food near Chandler Mall, Tempe and the East Valley.
            </p>
          </div>

          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              How We Cook
            </h2>
            <p className="text-[#F5F1E8] leading-relaxed">
              Everything here is made from scratch, every day. Our marinades, our seasonings, our sauces — all in-house. No pre-packaged mixes, no frozen anything. Hand-cut kebabs, freshly baked pita, real hummus with tahini. When you eat at Maza, you're tasting food the way it's supposed to taste.
            </p>
          </div>

          <div className="bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)]">
            <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-4 tracking-wide">
              Our Values
            </h2>
            <ul className="text-[#F5F1E8] space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-[#D3AB5E] font-bold">✦</span>
                <span>Made in-house, every single day</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D3AB5E] font-bold">✦</span>
                <span>Generous portions — you leave full</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D3AB5E] font-bold">✦</span>
                <span>Real ingredients, honest prices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D3AB5E] font-bold">✦</span>
                <span>Family-friendly, casual, no pretense</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D3AB5E] font-bold">✦</span>
                <span>Chandler local — we're your neighbors</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
