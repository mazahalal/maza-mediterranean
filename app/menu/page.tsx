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
          <h1 
            className="font-serif text-4xl md:text-5xl font-bold mb-4"
            style={{ background: 'linear-gradient(135deg, #F5E6C8 0%, #D4AF37 40%, #8B6914 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            Our Menu
          </h1>
          <p className="text-[#8A8A8A] text-lg max-w-2xl mx-auto">
            Authentic Mediterranean wraps, plates, and burgers — halal-certified, made fresh daily.
          </p>
        </div>

        <div className="space-y-16">
          {menuData.map((section) => (
            <div key={section.category}>
              <div className="mb-6">
                <h2 className="font-serif text-2xl md:text-3xl font-bold text-[#D4AF37] pb-3 border-b border-[#2A2A2A]">
                  {section.category}
                </h2>
                {section.subtitle && (
                  <p className="text-[#8A8A8A] text-sm mt-2 italic">{section.subtitle}</p>
                )}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {section.items.map((item) => (
                  <div
                    key={item.name}
                    className="bg-[#141414] p-6 rounded-xl border border-[#2A2A2A] hover:border-[#D4AF37]/50 transition-colors duration-200"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-[#F5E6C8]">{item.name}</h3>
                      <span className="text-[#D4AF37] font-bold text-lg">{item.price}</span>
                    </div>
                    {item.note && (
                      <p className="text-[#8A8A8A] text-sm italic">{item.note}</p>
                    )}
                    {item.notes && item.notes.map((note, i) => (
                      <p key={i} className="text-[#8A8A8A] text-sm">{note}</p>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-[#141414] p-8 rounded-xl border border-[#2A2A2A] text-center">
          <p className="text-[#F5E6C8]">
            <strong className="text-[#D4AF37]">Note:</strong> All plates come with 2 kebabs unless otherwise noted, rice, salad, hummus + tahini. Please inform us of any allergies.
          </p>
        </div>
      </div>
    </div>
  );
}