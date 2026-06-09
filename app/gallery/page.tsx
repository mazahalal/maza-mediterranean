const galleryImages = [
  { src: "/images/maza/menu/opt-PXL_20260607_180708446.jpg", alt: "MAZA Special" },
  { src: "/images/maza/menu/opt-PXL_20260601_224012118.jpg", alt: "Falafel Plate with Tabbouleh" },
  { src: "/images/maza/menu/opt-Jun_6_2026_5_29_23.jpg", alt: "MAZA Grill Plate" },
  { src: "/images/maza/menu/opt-PXL_20260606_223538010.jpg", alt: "Burger Combo" },
  { src: "/images/maza/PXL_20260607_012014666.jpg", alt: "MAZA restaurant interior with vertical sign" },
  { src: "/images/maza/PXL_20260607_012032976.jpg", alt: "Bright dining area with open kitchen and mural" },
  { src: "/images/maza/opt-PXL_20260601_232702080.jpg", alt: "Fresh Shawarma Daily" },
  { src: "/images/maza/opt-PXL_20260605_212253975.jpg", alt: "Shawarma rotisserie in action" },
  { src: "/images/maza/opt-PXL_20260607_180609260.jpg", alt: "Fresh, Halal Protein" },
];

const imageObjects = galleryImages.map((img, index) => ({
  "@type": "ImageObject",
  "@id": `${img.src}#image-${index}`,
  "url": img.src,
  "name": img.alt,
  "description": img.alt,
  "width": 1200,
  "height": 800,
  "encodingFormat": "image/jpeg",
}));

export const metadata = {
  title: "Gallery | Maza Mediterranean Cuisine",
  description: "Real food, real portions. See what we're serving at Maza.",
};

export default function GalleryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    "name": "Maza Mediterranean Cuisine Gallery",
    "description": "Real food, real ingredients, real portions. These are the dishes we serve every day.",
    "image": imageObjects,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-gold-gradient mb-4 tracking-wider">
              Gallery
            </h1>
            <p className="text-[#B8B8B8] text-lg max-w-2xl mx-auto">
              Real food, real ingredients, real portions. These are the dishes we serve every day.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className="relative overflow-hidden rounded-lg border border-[rgba(211,171,94,0.15)] hover:border-[rgba(211,171,94,0.4)] transition-colors duration-200 group"
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <p className="text-[#F5F1E8] text-sm">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
