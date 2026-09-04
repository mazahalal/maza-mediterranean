import CategoryTracker from "@/components/CategoryTracker";
import { menuData } from "@/data/menu"

export const metadata = {
  alternates: { canonical: "https://mazahalalfood.com/menu/desserts-drinks" },
  title: "Desserts & Drinks | Maza Mediterranean Cuisine",
  description: "Baklava, Kunāfah, sharbat, and fountain drinks. The perfect finish to any meal.",
}

const dessertCats = ["Baklava", "Kunāfah", "Drinks", "Sharbat"] as const
const dessertSections = dessertCats
  .map((cat) => menuData.find((c) => c.category === cat))
  .filter(Boolean)

export default function DessertsDrinksPage() {
  return (
    <div className="py-16 px-4">
      <CategoryTracker category="desserts-drinks" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#D3AB5E] mb-4 tracking-wider">
            Desserts & Drinks
          </h1>
          <p className="text-[#B8B8B8] text-lg max-w-2xl mx-auto">
            The perfect finish to any meal.
          </p>
        </div>

        <div className="space-y-12">
          {dessertSections.map((section) => (
            <div key={section!.category}>
              <h2 className="font-display text-2xl font-bold text-[#D3AB5E] mb-6 tracking-wider">
                {section!.category}
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {section!.items.map((item, index) => (
                  <div
                    key={`${section!.category}-${index}`}
                    className="bg-[#0F2A28] border border-[#D3AB5E]/20 rounded-xl p-6 hover:border-[#D3AB5E]/40 transition-colors"
                  >
                    <div className="flex justify-between items-start mb-3 gap-3">
                      <h3 className="font-semibold text-xl text-[#F5F1E8]">{item.name}</h3>
                      <span className="font-mono text-[#D3AB5E] font-medium whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    {item.description ? (
                      <p className="text-[#B8B8B8] text-sm leading-relaxed">{item.description}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center space-y-4">
          <a
            href="tel:4805346550"
            className="inline-block px-8 py-4 bg-[#D3AB5E] text-[#0A1F1E] font-semibold rounded-lg hover:bg-[#C49A4D] transition-colors text-lg"
          >
            Call to Order: (480) 534-6550
          </a>
          <div>
            <a href="/menu" className="text-[#D3AB5E] hover:underline">← Back to full menu</a>
          </div>
        </div>
      </div>
    </div>
  )
}
