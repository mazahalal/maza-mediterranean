export const metadata = {
  title: "About | Maza Mediterranean Cuisine",
  description: "Learn about Maza Mediterranean Cuisine — our story, our passion for authentic Mediterranean food, and our Chandler roots.",
};

export default function AboutPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B4513] mb-4">
            About Maza
          </h1>
          <p className="text-[#2C1810] text-lg">
            Our story, our passion, our promise.
          </p>
        </div>

        <div className="space-y-8">
          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#8B4513] mb-4">Our Roots</h2>
            <p className="text-[#2C1810] leading-relaxed">
              Maza began as a dream shared by two families who immigrated from the Eastern Mediterranean — drawn by the same pull that has drawn people to the region for millennia. Food was always at the center of their gatherings: slow-simmered stews, hand-rolled dough, the fragrant steam rising from a pot of rice. When they settled in Chandler, Arizona, they brought those recipes with them — not as museum pieces, but as living traditions meant to be shared.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#8B4513] mb-4">The Mediterranean Table</h2>
            <p className="text-[#2C1810] leading-relaxed">
              The Mediterranean is more than a geography — it's a way of eating, a way of living. Olive oil and lemon, fresh herbs and grilled meats, shared plates and long meals. Studies have long celebrated the Mediterranean diet, but for those of us who grew up with it, it's simply the way food should taste: honest, vibrant, and nourishing. At Maza, we believe every meal should leave you feeling better than when you arrived.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow-sm">
            <h2 className="font-serif text-2xl font-bold text-[#8B4513] mb-4">Made in Chandler</h2>
            <p className="text-[#2C1810] leading-relaxed">
              Chandler has been our home for over a decade now. We've watched it grow, and we've tried to grow with it — welcoming new neighbors, learning their stories, feeding their families. Maza is proud to be part of the fabric of this community. We're located on Germann Road, easy to find, hard to forget. Whether you're stopping in for a quick lunch or settling in for a Saturday evening dinner, you're always welcome at our table.
            </p>
          </div>

          <div className="bg-[#F5E6D3] p-8 rounded-xl">
            <h2 className="font-serif text-2xl font-bold text-[#8B4513] mb-4">Our Promise</h2>
            <ul className="text-[#2C1810] space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-[#D4A017] font-bold">✦</span>
                <span>Every dish made from scratch, every day, using recipes passed down through generations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4A017] font-bold">✦</span>
                <span>Ingredients sourced from trusted suppliers — the best olive oil, the freshest spices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4A017] font-bold">✦</span>
                <span>A team that treats every guest like family, because for us, you are</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#D4A017] font-bold">✦</span>
                <span>A space where the food speaks, the service listens, and the memories last</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}