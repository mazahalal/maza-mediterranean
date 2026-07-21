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
      { name: "Beef Gyro", price: "$10.91", notes: ["Served on pita or wrap (saj)"] },
      { name: "Beef + Lamb Shish Kebab Wrap", price: "$12.99" },
      { name: "Chicken Shish Kebab Wrap", price: "$12.99" },
      { name: "Chicken Tikka Wrap", price: "$11.43" },
      { name: "Crispy Chicken Wrap", price: "$14.55" },
      { name: "Falafel Wrap", price: "$9.35" },
      { name: "Lamb Tikka Wrap", price: "$13.51" },
      { name: "Arayes Lahm", price: "$15.55", notes: ["Flat grilled sandwich with beef, lamb and cheese. Served with salad."] },
      { name: "Ribeye Tikka Wrap", price: "$14.55" },
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
      { name: "Beef + Lamb Shish Kebab", price: "$20.19", notes: ["2 Beef + Lamb Shish Kebab, 1 Pita, rice, salad & hummus + tahini"] },
      { name: "Chicken Shish Kebab", price: "$19.67", notes: ["2 Chicken Shish Kebab, 1 Pita, rice, salad & hummus + tahini"] },
      { name: "Chicken Tikka Plate", price: "$19.67", notes: ["2 Chicken Tikka, 1 Pita, rice, salad & hummus + tahini"] },
      { name: "Lamb Tikka Plate", price: "$20.71", notes: ["2 Lamb Tikka, 1 Pita, rice, salad & hummus + tahini"] },
      { name: "Ribeye Tikka Plate", price: "$24.87", notes: ["2 Ribeye Tikka, 1 Pita, rice, salad & hummus + tahini"] },
      { name: "Mix Kebab", price: "$20.71", notes: ["1 Chicken Shish Kebab and 1 Beef + Lamb Shish Kebab, 1 Pita, rice, salad & hummus + tahini"] },
      { name: "Falafel", price: "$16.55", image: "/images/maza/menu/opt-PXL_20260601_224012118.jpg", notes: ["Falafel, 1 Pita, rice, salad & hummus + tahini"] },
      { name: "Appetizer Plate", price: "$15.51", notes: ["Hummus + Tahini, Dolma, Falafel, Baba Ghanoush, 1 Pita and Salad"] },
      { name: "Maza Grill", price: "$27.99", image: "/images/maza/menu/opt-Jun_6_2026_5_29_23.jpg", notes: ["1 Chicken Tikka, 1 Beef + Lamb Shish Kebab, 1 Chicken Shish Kebab, 1 Pita, rice, salad & hummus + tahini"] },
      { name: "Grilled Chicken Teriyaki Plate", price: "$28.99", notes: ["2 Grilled Teriyaki Chicken Cutlets, 1 Pita, rice, salad, baba ghanoush & hummus + tahini"] },
      { name: "Shredded Chicken Plate", price: "$18.49", notes: ["Maza in-house shredded chicken over a bed of rice, 1 Pita, salad, baba ghanoush and hummus + tahini", "Choose up to 3 sauces: Tahini, Garlic Sauce, Sriracha Mayo, Maza Special Sauce. Sauce on the side available."] },
      { name: "Shredded Steak Plate", price: "$19.99", notes: ["Maza in-house shredded steak over a bed of rice, 1 Pita, salad, baba ghanoush and hummus + tahini", "Choose up to 3 sauces: Tahini, Garlic Sauce, Sriracha Mayo, Maza Special Sauce. Sauce on the side available."] }
    ],
  },
  {
    category: "Loaded Fries",
    items: [
      { name: "Shredded Chicken", price: "$11.49" },
      { name: "Shredded Steak", price: "$12.89" },
      { name: "Gyro", price: "$12.89" }
    ],
  },
  {
    category: "Loaded Hummus",
    items: [
      { name: "Shredded Chicken", price: "$11.49" },
      { name: "Shredded Steak", price: "$12.89" },
      { name: "Gyro", price: "$12.89" }
    ],
  },
  {
    category: "Specials",
    items: [
      { name: "Maza Special", price: "$48.45", notes: ["1x Chicken Tikka, 1x Lamb Tikka, 1x Beef + Lamb Shish Kebab, 1x Chicken Shish Kebab (4 total), +2 Pita, Rice, Salad, Hummus + Tahini, Baba Ghanoush"] },
      { name: "Family Meal", price: "$87.49", notes: ["2x Beef + Lamb Shish Kebab, 2x Chicken Shish Kebab, 2x Chicken Tikka, 2x Lamb Tikka, 2x Ribeye Tikka (10 total), +4 Pita, Rice, Salad, Hummus + Tahini, Baba Ghanoush"] }
    ],
  },
  {
    category: "Burgers",
    subtitle: "Handmade in House, never frozen",
    items: [
      { name: "Beef Burger", price: "$12.47", image: "/images/maza/menu/opt-PXL_20260606_223538010.jpg" },
      { name: "Grilled Chicken", price: "$12.47" }
    ],
  },
  {
    category: "Kids Meals",
    subtitle: "Comes with Fries",
    items: [
      { name: "Crispy Chicken Sandwich", price: "$11.85", note: "Kids Meal — Comes with Fries" },
      { name: "All Beef Burger", price: "$11.85", note: "Kids Meal — Comes with Fries" }
    ],
  },
  {
    category: "Sides",
    items: [
      { name: "Dolma", price: "$5.99" },
      { name: "Fries", price: "$3.49" },
      { name: "Falafel (4pc)", price: "$3.99" },
      { name: "Hummus with tahini and pita", price: "$5.99" },
      { name: "Pita", price: "$1.25" },
      { name: "Rice", price: "$3.99" },
      { name: "Tzatziki", price: "SM $1.99 | LG $4.99" },
      { name: "Muhammara", price: "SM $1.99 | LG $4.99" },
      { name: "Baba Ghanoush", price: "$4.99" },
      { name: "Sambusah (2pc)", price: "$9.49" },
      { name: "Tabouleh", price: "$4.99" },
      { name: "Side Salad", price: "$3.99" },
      { name: "Kibbeh (3pc)", price: "$11.99" },
      { name: "Maza Salad", price: "$13.99", note: "Choose from: Chicken or Steak" }
    ],
  },
  {
    category: "Desserts & Drinks",
    items: [
      { name: "Baklava (Large)", price: "$3.99", notes: ["Pistachio or Dubai"] },
      { name: "Cake / Cheesecake", price: "$7.99", notes: ["Flavors: Dubai Chocolate, New York Cheesecake, Red Velvet Cake, Chocolate Mousse Cake, or Nutella Cheesecake"] },
      { name: "Bottled Water", price: "$1.49" },
      { name: "Fountain Drink", price: "$2.49" },
      { name: "Middle Eastern Black Tea", price: "$2.99" }
    ],
  }
];
