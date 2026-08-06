export interface GalleryImage {
  src: string;
  alt: string;
}

// Ambiance + hero shots
const ambiance: GalleryImage[] = [
  { src: "/images/maza/menu/opt-PXL_20260607_180708446.jpg", alt: "Maza Special — mixed grill platter" },
  { src: "/images/maza/PXL_20260607_012014666.jpg", alt: "Maza dining room — mosaic mural and arched niches" },
  { src: "/images/maza/opt-PXL_20260607_180609260.jpg", alt: "Fresh halal protein on the grill" },
];

// Dish photography (mirrors menu item images)
const dishes: GalleryImage[] = [
  { src: "/images/maza/menu/opt-beef-gyro.jpg", alt: "Beef Gyro wrap" },
  { src: "/images/maza/menu/opt-beef-lamb-shish-wrap.jpg", alt: "Beef + Lamb Shish Kebab wrap" },
  { src: "/images/maza/menu/opt-crispy-chicken-wrap.jpg", alt: "Crispy Chicken wrap" },
  { src: "/images/maza/menu/opt-beef-shish-plate.jpg", alt: "Beef + Lamb Shish Kebab plate" },
  { src: "/images/maza/menu/opt-chicken-shish-plate.jpg", alt: "Chicken Shish Kebab plate" },
  { src: "/images/maza/menu/opt-chicken-tikka-plate.jpg", alt: "Chicken Tikka plate" },
  { src: "/images/maza/menu/opt-lamb-tikka-plate.jpg", alt: "Lamb Tikka plate" },
  { src: "/images/maza/menu/opt-mix-kebab-plate.jpg", alt: "Mix Kebab plate" },
  { src: "/images/maza/menu/opt-PXL_20260601_224012118.jpg", alt: "Falafel plate with tabbouleh" },
  { src: "/images/maza/menu/opt-appetizer-plate.jpg", alt: "Appetizer plate" },
  { src: "/images/maza/menu/opt-Jun_6_2026_5_29_23.jpg", alt: "Maza Grill plate" },
  { src: "/images/maza/menu/opt-chicken-teriyaki-plate.jpg", alt: "Grilled Chicken Teriyaki plate" },
  { src: "/images/maza/menu/opt-shredded-chicken-plate.jpg", alt: "Shredded Chicken plate" },
  { src: "/images/maza/menu/opt-shredded-steak-plate.jpg", alt: "Shredded Steak plate" },
  { src: "/images/maza/menu/opt-loaded-fries-steak.jpg", alt: "Loaded Fries with shredded steak" },
  { src: "/images/maza/menu/opt-loaded-fries-gyro.jpg", alt: "Loaded Fries with gyro" },
  { src: "/images/maza/menu/opt-loaded-hummus-chicken.jpg", alt: "Loaded Hummus with shredded chicken" },
  { src: "/images/maza/menu/opt-loaded-hummus-steak.jpg", alt: "Loaded Hummus with shredded steak" },
  { src: "/images/maza/menu/opt-maza-special.jpg", alt: "Maza Special" },
  { src: "/images/maza/menu/opt-PXL_20260606_223538010.jpg", alt: "Beef Burger combo" },
  { src: "/images/maza/menu/opt-PXL_20260606_223540324.jpg", alt: "Beef Burger with seasoned fries" },
  { src: "/images/maza/menu/opt-grilled-chicken-burger.jpg", alt: "Grilled Chicken burger" },
  { src: "/images/maza/menu/opt-kids-crispy-chicken.jpg", alt: "Kids Crispy Chicken sandwich" },
  { src: "/images/maza/menu/opt-falafel-side.jpg", alt: "Falafel (4pc)" },
  { src: "/images/maza/menu/opt-hummus-pita.jpg", alt: "Hummus with tahini and pita" },
  { src: "/images/maza/menu/opt-sambusah.jpg", alt: "Sambusah (2pc)" },
  { src: "/images/maza/menu/opt-tabouleh.jpg", alt: "Tabouleh" },
  { src: "/images/maza/menu/opt-side-salad.jpg", alt: "Side salad" },
  { src: "/images/maza/menu/opt-kibbeh.jpg", alt: "Kibbeh (3pc)" },
  { src: "/images/maza/menu/opt-baklava.jpg", alt: "Baklava — walnut or pistachio" },
];

export const galleryImages: GalleryImage[] = [...ambiance, ...dishes];
