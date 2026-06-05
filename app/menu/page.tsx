import { menuData } from "@/data/menu";

export const metadata = {
  title: "Menu | Maza Halal Food",
  description: "Explore our authentic Mediterranean menu — appetizers, mains, sides, desserts, and drinks.",
};

export default function MenuPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B4513] mb-4">
            Our Menu
          </h1>
          <p className="text-[#2C1810] text-lg max-w-2xl mx-auto">
            From the Mediterranean shores to your table — dishes crafted with authentic recipes, fresh ingredients, and generations of tradition.
          </p>
        </div>

        <div className="space-y-16">
          {menuData.map((section) => (
            <div key={section.category}>
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#D4A017] mb-8 pb-3 border-b-2 border-[#D4A017]/30">
                {section.category}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-[#2C1810]">{item.name}</h3>
                      <span className="text-[#8B4513] font-bold text-lg">{item.price}</span>
                    </div>
                    <p className="text-[#2C1810]/70 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#F5E6D3] p-8 rounded-xl text-center">
          <p className="text-[#2C1810]">
            <strong>Please note:</strong> Our menu rotates seasonally to feature the freshest ingredients available. Contact us for today's seasonal specials!
          </p>
        </div>
      </div>
    </div>
  );
}