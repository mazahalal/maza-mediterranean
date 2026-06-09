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
    items: [
      { name: "Beef Gyro", price: "$10.49", description: "Classic beef gyro with tomatoes, onions, and tzatziki" },
      { name: "Beef Shawarma Wrap", price: "$12.49", description: "Slow-roasted beef shawarma with fresh vegetables and sauce" },
      { name: "Beef Shish Kebab Wrap", price: "$12.49" },
      { name: "Chicken Shawarma Wrap", price: "$11.99", description: "Marinated chicken shawarma with lettuce, tomato, and garlic sauce" },
      { name: "Chicken Shish Kebab Wrap", price: "$12.49" },
      { name: "Chicken Tikka Wrap", price: "$10.99" },
      { name: "Lamb Tikka Wrap", price: "$12.99" },
      { name: "Mix Shawarma Wrap", price: "$12.49" },
      { name: "Ribeye Tikka Wrap", price: "$13.99" },
    ],
  },
  {
    category: "Wrap Upgrades",
    subtitle: "Upgrades apply to wraps only",
    items: [
      { name: "Combo Upgrade", price: "+$4.99", description: "Includes fries and a drink" },
    ],
  },
  {
    category: "Plates",
    subtitle: "All come with 2 kebabs unless otherwise noted, rice, salad, hummus + tahini",
    items: [
      {
        name: "Appetizer Plate",
        price: "$12.99",
        description: "Hummus with tahini, dolma, falafel, baba ghanoush, and salad",
      },
      { name: "Beef Shish Kebab", price: "$17.49", description: "Two beef shish kebabs served with rice, salad, hummus and tahini" },
      { name: "Chicken Shish Kebab", price: "$16.99", description: "Two chicken shish kebabs served with rice, salad, hummus and tahini" },
      { name: "Chicken Tikka Plate", price: "$16.99", description: "Two chicken tikka skewers served with rice, salad, hummus and tahini" },
      { name: "Lamb Tikka Plate", price: "$17.99", description: "Two lamb tikka skewers served with rice, salad, hummus and tahini" },
      { name: "Ribeye Tikka Plate", price: "$18.99", description: "Two ribeye tikka skewers served with rice, salad, hummus and tahini" },
      { name: "Mix Kebab", price: "$17.99", description: "One chicken shish kebab and one beef shish kebab, served with rice, salad, hummus and tahini" },
      { name: "Falafel", price: "$13.99", image: "/images/maza/menu/opt-PXL_20260601_224012118.jpg", description: "Crispy falafel served with rice, salad, hummus and tahini" },
      { name: "Maza Grill", price: "$24.99", image: "/images/maza/menu/opt-Jun_6_2026_5_29_23.jpg", description: "Chicken tikka, beef shish kebab, and chicken shish kebab with rice, salad, hummus and tahini" },
    ],
  },
  {
    category: "Specials",
    items: [
      {
        name: "Maza Special",
        price: "$39.99",
        description: "Four kebabs — chicken tikka, ribeye tikka, beef shish kebab, and chicken shish kebab — served with hummus, tabbouleh, rice, salad, and tahini"
      },
    ],
  },
  {
    category: "Burgers",
    subtitle: "Handmade in House, never frozen",
    items: [
      { name: "Beef Burger", price: "$11.99", description: "Handmade beef patty with fresh toppings", image: "/images/maza/menu/opt-PXL_20260606_223538010.jpg" },
      { name: "Grilled Chicken", price: "$11.99" },
    ],
  },
  {
    category: "Sides",
    items: [
      { name: "Dolma", price: "$5.99" },
      { name: "Fries", price: "$3.49" },
      { name: "Hummus with tahini and pita", price: "$5.99" },
      { name: "Loaded Shawarma Fries", price: "$14.99", description: "Crispy fries topped with shawarma meat, cheese, and sauces" },
      { name: "Pita", price: "Free" },
      { name: "Rice", price: "$3.99" },
      { name: "Tzatziki", price: "$1.99" },
      { name: "Samosa (Regular or Veggie)", price: "$5.99" },
      { name: "Tabouleh", price: "$4.99" },
    ],
  },
  {
    category: "Desserts & Drinks",
    items: [
      { name: "Baklava (2pc)", price: "$4.99" },
      { name: "Ayran", price: "$2.49" },
      { name: "H2O (Water)", price: "$1.99" },
      { name: "Fountain Drink", price: "$2.49" },
    ],
  },
];