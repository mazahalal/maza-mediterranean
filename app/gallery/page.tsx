const galleryImages = [
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop", alt: "Lamb shawarma plate" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop", alt: "Fresh Mediterranean salad" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28d40f0d6d8?w=600&h=400&fit=crop", alt: "Grilled kebabs" },
  { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop", alt: "Falafel plate" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop", alt: "Freshly baked pita" },
  { src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop", alt: "Hummus and tahini" },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop", alt: "Restaurant interior" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop", alt: "Chicken shish kebab" },
  { src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop", alt: "Mediterranean platter" },
];

const imageObjects = galleryImages.map((img, index) => ({
  "@type": "ImageObject",
  "@id": `${img.src}#image-${index}`,
  "url": img.src,
  "name": img.alt,
  "description": img.alt,
  "width": 600,
  "height": 400,
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
