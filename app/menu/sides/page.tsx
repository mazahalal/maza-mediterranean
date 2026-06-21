import { menuData } from "@/data/menu"

export const metadata = {
  title: "Sides | Maza Mediterranean Cuisine",
  description: "Fresh sides — hummus, rice, dolma, fries, tabouleh, samosa. Perfect additions to any plate or wrap.",
}

const sides = menuData.find(c => c.category === "Sides")

export default function SidesPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#D3AB5E] mb-4 tracking-wider">
            Sides
          </h1>
          <p className="text-[#B8B8B8] text-lg max-w-2xl mx-auto">
            Real ingredients, made fresh daily. The perfect companions to our plates and wraps.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {sides?.items.map((item, index) => (
            <div key={index} className="bg-[#0F2A28] border border-[#D3AB5E]/20 rounded-xl p-6 hover:border-[#D3AB5E]/40 transition-colors">
              <div className="flex justify-between items-start mb-3">
                <h3 className="font-semibold text-xl text-[#F5F1E8]">{item.name}</h3>
                <span className="font-mono text-[#D3AB5E] font-medium whitespace-nowrap">{item.price}</span>
              </div>
              {item.note && <p className="text-[#B8B8B8] text-sm">{item.note}</p>}
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
