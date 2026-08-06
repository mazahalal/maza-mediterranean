import GalleryMosaic from "./GalleryMosaic";
import { galleryImages } from "./gallery-images";

const imageObjects = galleryImages.map((img, index) => ({
  "@type": "ImageObject",
  "@id": `${img.src}#image-${index}`,
  url: img.src,
  name: img.alt,
  description: img.alt,
  encodingFormat: "image/jpeg",
}));

export const metadata = {
  alternates: { canonical: "https://mazahalalfood.com/gallery" },
  title: "Gallery | Maza Mediterranean Cuisine",
  description: "Real food, real portions. See what we're serving at Maza.",
};

export default function GalleryPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: "Maza Mediterranean Cuisine Gallery",
    description:
      "Real food, real ingredients, real portions. These are the dishes we serve every day.",
    image: imageObjects,
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
              Real food, real ingredients, real portions. Tap any photo to view
              it full-screen.
            </p>
          </div>

          <GalleryMosaic />
        </div>
      </div>
    </>
  );
}
