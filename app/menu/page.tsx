import { menuData } from "@/data/menu";

export const metadata = {
  title: "Menu | Maza Mediterranean Cuisine",
  description: "Wraps, plates, burgers, and sides — made fresh in-house every day. Chandler's Mediterranean spot for big portions and honest prices.",
};

export default function MenuPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-4 tracking-wider">
            Our Menu
          </h1>
          <p className="text-[#B8B8B8] text-lg max-w-2xl mx-auto">
            Big portions. Real ingredients. Honest prices. Made fresh, in-house, every day.
          </p>
        </div>

        <div className="space-y-16">
          {menuData.map((section) => (
            <div key={section.category}>
              <div className="mb-6">
                <div className="flex items-center gap-4 mb-2">
                  <div className="h-px flex-1 bg-[rgba(211,171,94,0.3)]"></div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[#D3AB5E] tracking-wider">
                    {section.category}
                  </h2>
                  <div className="h-px flex-1 bg-[rgba(211,171,94,0.3)]"></div>
                </div>
                {section.subtitle && (
                  <p className="text-[#B8B8B8] text-sm mt-2 text-center">{section.subtitle}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-[#0E0E0E] p-6 rounded-lg border border-[rgba(211,171,94,0.15)] hover:border-[rgba(211,171,94,0.35)] transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-display text-lg text-[#F5F1E8] tracking-wide">{item.name}</h3>
                      <span className="text-[#D3AB5E] font-bold text-lg ml-4">{item.price}</span>
                    </div>
                    {item.note && (
                      <p className="text-[#B8B8B8] text-sm italic">{item.note}</p>
                    )}
                    {item.notes && item.notes.map((note, i) => (
                      <p key={i} className="text-[#B8B8B8] text-sm">{note}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#0E0E0E] p-8 rounded-lg border border-[rgba(211,171,94,0.15)] text-center">
          <p className="text-[#F5F1E8]">
            <strong className="text-[#D3AB5E]">Note:</strong> All plates come with 2 kebabs unless otherwise noted, rice, salad, hummus + tahini. Please inform us of any allergies.
          </p>
        </div>

        <div className="mt-12 text-center">
          <a 
            href="tel:4805346550" 
            className="inline-block px-8 py-4 bg-[#D3AB5E] text-[#0A1F1E] font-semibold rounded-lg hover:bg-[#C49A4D] transition-colors text-lg"
          >
            Call to Order: (480) 534-6550
          </a>
        </div>
      </div>
    </div>
  );
}
