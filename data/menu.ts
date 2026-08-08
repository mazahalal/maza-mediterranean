export interface MenuItem {
  name: string;
  description?: string;
  price: string;
  note?: string;
  notes?: string[];
  image?: string;
}

export interface MenuCategory {
  category: string;
  subtitle?: string;
  items: MenuItem[];
}

export const menuData: MenuCategory[] = [
  {
    category: "Wraps",
    subtitle: "Wrapped with hummus, tomato, onion, lettuce, pickle, and garlic sauce",
    items: [
      { name: "Beef Gyro", price: "$10.91", image: "/images/maza/menu/opt-beef-gyro-vertical.jpg", notes: ["Served on pita or as a wrap"] },
      { name: "Beef + Lamb Shish Kebab Wrap", price: "$12.99", image: "/images/maza/menu/opt-beef-shish-kebab-wrap-vertical.jpg" },
      { name: "Chicken Shish Kebab Wrap", price: "$12.99", image: "/images/maza/menu/opt-chicken-shish-kebab-wrap-vertical.jpg" },
      { name: "Chicken Tikka Wrap", price: "$11.43" },
      { name: "Crispy Chicken Wrap", price: "$14.55", image: "/images/maza/menu/opt-crispy-chicken-wrap.jpg" },
      { name: "Falafel Wrap", price: "$9.35", image: "/images/maza/menu/opt-falafel-wrap-vertical.jpg" },
      { name: "Lamb Tikka Wrap", price: "$13.51" },
      { name: "Arayes Lahm or Dajaj", price: "$15.55", image: "/images/maza/menu/opt-arayes-lahm-vertical.jpg", notes: ["Flat grilled sandwich with cheese. Choose beef + lamb or chicken. Served with salad."] },
      { name: "Ribeye Tikka Wrap", price: "$14.55", image: "/images/maza/menu/opt-ribeye-tikka-wrap-vertical.jpg" },
      { name: "Shredded Chicken Wrap", price: "$12.49" },
      { name: "Shredded Steak Wrap", price: "$14.89" }
    ],
  },
  {
    category: "Wrap Upgrades",
    subtitle: "Upgrade any meal to a combo",
    items: [
      { name: "Combo Upgrade", price: "$4.99", note: "Includes Fries + Drink" }
    ],
  },
  {
    category: "Plates",
    items: [
      { name: "Beef + Lamb Shish Kebab", price: "$20.19", image: "/images/maza/menu/opt-beef-shish-plate.jpg", notes: ["2 Beef + Lamb Shish Kebab, 1 Pita, rice, salad, baba ghanoush & hummus + tahini"] },
      { name: "Chicken Shish Kebab", price: "$19.67", image: "/images/maza/menu/opt-chicken-shish-plate.jpg", notes: ["2 Chicken Shish Kebab, 1 Pita, rice, salad, baba ghanoush & hummus + tahini"] },
      { name: "Chicken Tikka Plate", price: "$19.67", image: "/images/maza/menu/opt-chicken-tikka-plate.jpg", notes: ["2 Chicken Tikka, 1 Pita, rice, salad, baba ghanoush & hummus + tahini"] },
      { name: "Lamb Tikka Plate", price: "$20.71", image: "/images/maza/menu/opt-lamb-tikka-plate.jpg", notes: ["2 Lamb Tikka, 1 Pita, rice, salad, baba ghanoush & hummus + tahini"] },
      { name: "Ribeye Tikka Plate", price: "$24.87", notes: ["2 Ribeye Tikka, 1 Pita, rice, salad, baba ghanoush & hummus + tahini"] },
      { name: "Mix Kebab", price: "$20.71", image: "/images/maza/menu/opt-mix-kebab-plate.jpg", notes: ["1 Chicken Shish Kebab and 1 Beef + Lamb Shish Kebab, 1 Pita, rice, salad, baba ghanoush & hummus + tahini"] },
      { name: "Falafel", price: "$16.55", image: "/images/maza/menu/opt-PXL_20260601_224012118.jpg", notes: ["Falafel, 1 Pita, salad, baba ghanoush & hummus + tahini"] },
      { name: "Appetizer Plate", price: "$15.51", image: "/images/maza/menu/opt-appetizer-plate.jpg", notes: ["Hummus + Tahini, Dolma, Falafel, Baba Ghanoush, 1 Pita and Salad"] },
      { name: "Maza Grill", price: "$27.99", image: "/images/maza/menu/opt-Jun_6_2026_5_29_23.jpg", notes: ["1 Chicken Tikka, 1 Beef + Lamb Shish Kebab, 1 Chicken Shish Kebab, 1 Pita, rice, salad, baba ghanoush & hummus + tahini"] },
      { name: "Grilled Chicken Teriyaki Plate", price: "$28.99", image: "/images/maza/menu/opt-chicken-teriyaki-plate.jpg", notes: ["2 Grilled Teriyaki Chicken Cutlets, 1 Pita, rice, salad, baba ghanoush & hummus + tahini"] },
      { name: "Shredded Chicken Plate", price: "$18.49", image: "/images/maza/menu/opt-shredded-chicken-plate-vertical.jpg", notes: ["Maza in-house shredded chicken over a bed of rice, 1 Pita, salad, baba ghanoush and hummus + tahini", "Choose up to 3 sauces: Tahini, Garlic Sauce, Sriracha Mayo, Maza Special Sauce, Pomegranate Molasses. Sauce on the side available."] },
      { name: "Shredded Steak Plate", price: "$19.99", image: "/images/maza/menu/opt-shredded-steak-plate.jpg", notes: ["Maza in-house shredded steak over a bed of rice, 1 Pita, salad, baba ghanoush and hummus + tahini", "Choose up to 3 sauces: Tahini, Garlic Sauce, Sriracha Mayo, Maza Special Sauce, Pomegranate Molasses. Sauce on the side available."] }
    ],
  },
  {
    category: "Loaded Fries",
    subtitle: "Choose up to 3 sauces: Tahini, Garlic Sauce, Sriracha Mayo, Maza Special Sauce, Pomegranate Molasses. Sauce on the side available.",
    items: [
      { name: "Shredded Chicken", price: "$11.49" },
      { name: "Shredded Steak", price: "$12.89", image: "/images/maza/menu/opt-loaded-fries-steak.jpg" },
      { name: "Gyro", price: "$12.89", image: "/images/maza/menu/opt-loaded-fries-gyro.jpg" }
    ],
  },
  {
    category: "Loaded Hummus",
    subtitle: "Choose up to 3 sauces: Tahini, Garlic Sauce, Sriracha Mayo, Maza Special Sauce, Pomegranate Molasses. Sauce on the side available.",
    items: [
      { name: "Shredded Chicken", price: "$11.49", image: "/images/maza/menu/opt-loaded-hummus-chicken.jpg" },
      { name: "Shredded Steak", price: "$12.89", image: "/images/maza/menu/opt-loaded-hummus-steak.jpg" },
      { name: "Gyro", price: "$12.89" }
    ],
  },
  {
    category: "Specials",
    items: [
      { name: "Maza Special", price: "$48.45", image: "/images/maza/menu/opt-maza-special-vertical.jpg", notes: ["1x Chicken Tikka, 1x Lamb Tikka, 1x Beef + Lamb Shish Kebab, 1x Chicken Shish Kebab (4 total), +2 Pita, Rice, Salad, Hummus + Tahini, Baba Ghanoush"] },
      { name: "Family Meal", price: "$87.49", notes: ["2x Beef + Lamb Shish Kebab, 2x Chicken Shish Kebab, 2x Chicken Tikka, 2x Lamb Tikka, 2x Ribeye Tikka (10 total), +4 Pita, Rice, Salad, Hummus + Tahini, Baba Ghanoush"] },
      { name: "Samak Tandoor", price: "$38.97", image: "/images/maza/menu/opt-samak-promo.jpg", notes: ["Whole large fish with rice and salad", "Please allow 1 hour to prepare"] }
    ],
  },
  {
    category: "Burgers",
    subtitle: "Handmade in House, never frozen",
    items: [
      { name: "Beef Burger", price: "$12.47", image: "/images/maza/menu/opt-PXL_20260606_223538010.jpg" },
      { name: "Grilled Chicken", price: "$12.47", image: "/images/maza/menu/opt-grilled-chicken-burger.jpg" }
    ],
  },
  {
    category: "Kids Meals",
    subtitle: "Comes with Fries",
    items: [
      { name: "Crispy Chicken Sandwich", price: "$11.85", image: "/images/maza/menu/opt-kids-crispy-chicken.jpg", note: "Kids Meal — Comes with Fries" },
      { name: "All Beef Burger", price: "$11.85", note: "Kids Meal — Comes with Fries" }
    ],
  },
  {
    category: "Sides",
    items: [
      { name: "Dolma", price: "$5.99" },
      { name: "Fries", price: "$3.49", image: "/images/maza/menu/opt-side-fries-vertical.jpg" },
      { name: "Falafel (4pc)", price: "$3.99", image: "/images/maza/menu/opt-falafel-side.jpg" },
      { name: "Hummus with tahini and pita", price: "$5.99", image: "/images/maza/menu/opt-hummus-pita.jpg" },
      { name: "Pita", price: "$1.25" },
      { name: "Rice", price: "$3.99" },
      { name: "Tzatziki", price: "SM $1.99 | LG $4.99" },
      { name: "Muhammara", price: "SM $1.99 | LG $4.99" },
      { name: "Baba Ghanoush", price: "SM $1.99 | LG $4.99" },
      { name: "Sambusah (2pc)", price: "$9.49", image: "/images/maza/menu/opt-sambusah-vertical.jpg" },
      { name: "Tabouleh", price: "$4.99", image: "/images/maza/menu/opt-tabouleh.jpg" },
      { name: "Side Salad", price: "$3.99", image: "/images/maza/menu/opt-side-salad-vertical.jpg" },
      { name: "Kibbeh (3pc)", price: "$11.99", image: "/images/maza/menu/opt-kibbeh.jpg" },
      { name: "Maza Salad", price: "$13.99", note: "Choose from: Chicken or Steak" }
    ],
  },
  {
    category: "Baklava",
    items: [
      { name: "Walnut or Pistachio", price: "$3.99", image: "/images/maza/menu/opt-baklava.jpg" }
    ],
  },
  {
    category: "Drinks",
    items: [
      { name: "Bottled Water", price: "$1.49" },
      { name: "Fountain Drink", price: "$2.49", note: "20oz, refillable" },
      { name: "Middle Eastern Black Tea", price: "$2.99" },
      { name: "Peace Tea Raspberry", price: "$2.25", note: "16oz can" },
      { name: "Minute Maid Apple Juice", price: "$2.75", note: "10oz" },
      { name: "Minute Maid Orange Juice 100%", price: "$2.75", note: "10oz" },
      { name: "Mexican Coke", price: "$3.99", note: "355ml glass" },
      { name: "Mexican Fanta Grape", price: "$3.99", note: "355ml glass" }
    ],
  },
  {
    category: "Sharbat",
    subtitle: "House-made · no refill",
    items: [
      { name: "Karkadeh", price: "SM $1.99 | LG $3.99", note: "Hibiscus · SM 12oz · LG 24oz" },
      { name: "Iced Chai", price: "SM $1.99 | LG $3.99", note: "Ceylon black tea · SM 12oz · LG 24oz" }
    ],
  }
];
