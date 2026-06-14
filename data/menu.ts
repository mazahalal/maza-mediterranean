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
      { name: "Beef Shawarma Wrap", price: "$12.99" },
      { name: "Beef Shish Kebab Wrap", price: "$12.99" },
      { name: "Chicken Shawarma Wrap", price: "$12.47" },
      { name: "Chicken Shish Kebab Wrap", price: "$12.99" },
      { name: "Chicken Tikka Wrap", price: "$11.43" },
      { name: "Crispy Chicken Wrap", price: "$14.55" },
      { name: "Falafel Wrap", price: "$9.35" },
      { name: "Lamb Tikka Wrap", price: "$13.51" },
      { name: "Mix Shawarma Wrap", price: "$12.99" },
      { name: "Ribeye Tikka Wrap", price: "$14.55" },
    ],
  },
  {
    category: "Wrap Upgrades",
    subtitle: "Upgrades apply to wraps only",
    items: [
      { name: "Combo Upgrade", price: "$4.99", note: "Includes Fries + Drink" },
    ],
  },
  {
    category: "Plates",
    items: [
      { name: "Beef Shish Kebab", price: "$20.19", notes: ["2 Beef Shish Kebab, rice, salad & hummus + tahini"] },
      { name: "Chicken Shish Kebab", price: "$19.67", notes: ["2 Chicken Shish Kebab, rice, salad & hummus + tahini"] },
      { name: "Chicken Tikka Plate", price: "$19.67", notes: ["2 Chicken Tikka, rice, salad & hummus + tahini"] },
      { name: "Lamb Tikka Plate", price: "$20.71", notes: ["2 Lamb Tikka, rice, salad & hummus + tahini"] },
      { name: "Ribeye Tikka Plate", price: "$24.87", notes: ["2 Ribeye Tikka, rice, salad & hummus + tahini"] },
      { name: "Mix Kebab", price: "$20.71", notes: ["1 Chicken Shish Kebab and 1 Beef Shish Kebab, rice, salad & hummus + tahini"] },
      { name: "Falafel", price: "$16.55", image: "/images/maza/menu/opt-PXL_20260601_224012118.jpg", notes: ["Falafel, rice, salad & hummus + tahini"] },
      { name: "Appetizer Plate", price: "$15.51", notes: ["Hummus + Tahini, Dolma, Falafel, Baba Ghanoush and Salad"] },
      { name: "Maza Grill", price: "$27.99", image: "/images/maza/menu/opt-Jun_6_2026_5_29_23.jpg", notes: ["1 Chicken Tikka, 1 Beef Shish Kebab, 1 Chicken Shish Kebab, rice, salad & hummus + tahini"] },
    ],
  },
  {
    category: "Specials",
    items: [
      {
        name: "Maza Special",
        price: "$41.59",
        notes: ["1x Chicken Tikka, 1x Ribeye Tikka, 1x Beef Shish Kebab, 1x Chicken Shish Kebab (4 total), +2 Pita, Rice, Salad, Hummus + Tahini, Baba Ghanoush, Tabbouleh"],
      },
      {
        name: "Family Meal",
        price: "$87.49",
        notes: ["2x Beef Shish Kebab, 2x Chicken Shish Kebab, 2x Chicken Tikka, 2x Lamb Tikka, 2x Ribeye Tikka (10 total), +4 Pita, Rice, Salad, Hummus + Tahini, Baba Ghanoush, Tabbouleh"],
      },
    ],
  },
  {
    category: "Burgers",
    subtitle: "Handmade in House, never frozen",
    items: [
      { name: "Beef Burger", price: "$12.47", image: "/images/maza/menu/opt-PXL_20260606_223538010.jpg" },
      { name: "Grilled Chicken", price: "$12.47" },
      { name: "Crispy Chicken Sandwich", price: "$12.47", note: "Comes with fries" },
    ],
  },
  {
    category: "Sides",
    items: [
      { name: "Dolma", price: "$5.99" },
      { name: "Fries", price: "$3.49" },
      { name: "Falafel (4pc)", price: "$3.99" },
      { name: "Hummus with tahini and pita", price: "$5.99" },
      { name: "Pita", price: "Free" },
      { name: "Rice", price: "$3.99" },
      { name: "Tzatziki", price: "$1.99" },
      { name: "Samosa (Regular or Veggie)", price: "$5.99" },
      { name: "Tabouleh", price: "$4.99" },
      { name: "Side Salad", price: "$3.99" },
    ],
  },
  {
    category: "Desserts & Drinks",
    items: [
      { name: "Baklava", price: "$2.99" },
      { name: "Bottled Water", price: "$1.49" },
      { name: "Fountain Drink", price: "$2.49" },
      { name: "Middle Eastern Black Tea", price: "$2.99" },
    ],
  },
];
