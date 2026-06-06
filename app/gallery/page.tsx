const galleryImages = [
  { src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop", alt: "Lamb shawarma plate with rice and vegetables" },
  { src: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=600&h=400&fit=crop", alt: "Fresh Mediterranean salad" },
  { src: "https://images.unsplash.com/photo-1565299624946-b28d40f0d6d8?w=600&h=400&fit=crop", alt: "Gourmet pizza" },
  { src: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop", alt: "Vibrant healthy bowl" },
  { src: "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=600&h=400&fit=crop", alt: "Stack of pancakes" },
  { src: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=600&h=400&fit=crop", alt: "Falafel with tahini" },
  { src: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop", alt: "Restaurant interior ambiance" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600&h=400&fit=crop", alt: "Grilled kebabs" },
  { src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop", alt: "Mediterranean pasta dish" },
];

export const metadata = {
  title: "Gallery | Maza Mediterranean Cuisine",
  description: "Explore photos of our authentic Mediterranean dishes, restaurant atmosphere, and dining experience.",
};

export default function GalleryPage() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="font-serif text-4xl md:text-5xl font-bold text-[#8B4513] mb-4">
            Gallery
          </h1>
          <p className="text-[#2C1810] text-lg max-w-2xl mx-auto">
            A visual journey through our kitchen, dishes, and the warm atmosphere that makes Maza a Chandler favorite.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-200 group"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-white text-sm font-medium">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}