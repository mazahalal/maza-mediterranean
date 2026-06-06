import { menuData } from "@/data/menu";

export const metadata = {
  title: "Menu | Maza Mediterranean Cuisine",
  description: "Authentic Mediterranean wraps, plates, burgers, and sides in Chandler, AZ.",
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
            Authentic Mediterranean wraps, plates, and burgers — halal-certified, made fresh daily.
          </p>
        </div>

        <div className="space-y-16">
          {menuData.map((section) => (
            <div key={section.category}>
              <div className="mb-6">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#D4A017] pb-3 border-b-2 border-[#D4A017]/30">
                  {section.category}
                </h2>
                {section.subtitle && (
                  <p className="text-[#2C1810]/60 text-sm mt-2 italic">{section.subtitle}</p>
                )}
              </div>
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
                    {item.note && (
                      <p className="text-[#2C1810]/60 text-sm italic">{item.note}</p>
                    )}
                    {item.notes && item.notes.map((note, i) => (
                      <p key={i} className="text-[#2C1810]/60 text-sm">{note}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#F5E6D3] p-8 rounded-xl text-center">
          <p className="text-[#2C1810]">
            <strong>Note:</strong> All plates come with 2 kebabs unless otherwise noted, rice, salad, hummus + tahini. Please inform us of any allergies.
          </p>
        </div>
      </div>
    </div>
  );
}