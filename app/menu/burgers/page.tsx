import Link from "next/link";
import CategoryTracker from "@/components/CategoryTracker";
import { menuData } from "@/data/menu";
import { buildMenuJsonLd, SITE } from "@/lib/menu-schema";
import RelatedLinks from "@/components/RelatedLinks";
import { linkForMenuItem } from "@/lib/menu-item-links";

export const metadata = {
  alternates: { canonical: "https://mazahalalfood.com/menu/burgers" },
  title: "Burgers | Maza Mediterranean Cuisine",
  description: "Handmade in-house burgers — never frozen. Beef or grilled chicken. Call to order.",
}

const burgers = menuData.find(c => c.category === "Burgers")

const burgersJsonLd = buildMenuJsonLd(burgers ? [burgers] : [], {
  url: `${SITE}/menu/burgers`,
  name: "Maza Mediterranean Cuisine | Burgers Menu",
  description: "Handmade in house burgers, never frozen. Beef or grilled chicken. Halal-certified Mediterranean food in Chandler, AZ.",
});

export default function BurgersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(burgersJsonLd) }}
      />
      <div className="py-16 px-4">
      <CategoryTracker category="burgers" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-display text-4xl md:text-5xl font-bold text-[#D3AB5E] mb-4 tracking-wider">
            Burgers
          </h1>
          <p className="text-[#B8B8B8] text-lg max-w-2xl mx-auto">
            Handmade in house, never frozen.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {burgers?.items.map((item, index) => (
            <div key={index} className="bg-[#0F2A28] border border-[#D3AB5E]/20 rounded-xl p-6 hover:border-[#D3AB5E]/40 transition-colors">
              <div className="flex justify-between items-start mb-3">
                {(() => {
                  const dishLink = linkForMenuItem(item.name);
                  return dishLink ? (
                    <h3 className="font-semibold text-xl text-[#F5F1E8]">
                      <Link href={dishLink.href} className="hover:text-[#D3AB5E] transition-colors">
                        {item.name}
                      </Link>
                    </h3>
                  ) : (
                    <h3 className="font-semibold text-xl text-[#F5F1E8]">{item.name}</h3>
                  );
                })()}
                <span className="font-mono text-[#D3AB5E] font-medium whitespace-nowrap">{item.price}</span>
              </div>
            </div>
          ))}
        </div>

        
        <RelatedLinks routeKey="menu/burgers" heading="Burgers" />
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
    </>
  )
}
