export interface MenuItem {
  name: string;
  description?: string;
  price: string;
  note?: string;
  notes?: string[];
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
      { name: "Beef Gyro", price: "$10.49" },
      { name: "Beef Shawarma Wrap", price: "$12.49" },
      { name: "Beef Shish Kebab Wrap", price: "$12.49" },
      { name: "Chicken Shawarma Wrap", price: "$11.99" },
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
      { name: "Combo Upgrade", price: "+$4.99", note: "Includes Fries + Drink" },
    ],
  },
  {
    category: "Plates",
    subtitle: "All come with 2 kebabs unless otherwise noted, rice, salad, hummus + tahini",
    items: [
      {
        name: "Appetizer Plate",
        price: "$12.99",
        notes: ["Hummus, baba ghanoush, tabbouleh, dolma, and falafel"],
      },
      { name: "Beef Shish Kebab", price: "$17.49" },
      { name: "Chicken Shish Kebab", price: "$16.99" },
      { name: "Mix Kebab", price: "$17.99", notes: ["1 chicken shish kebab and 1 beef shish kebab"] },
      { name: "Falafel", price: "$13.99" },
      { name: "Maza Grill", price: "$24.99", notes: ["Includes chicken tikka, beef shish kebab, and chicken shish kebab"] },
    ],
  },
  {
    category: "Specials",
    items: [
      {
        name: "Maza Special",
        price: "$39.99",
        notes: [
          "Includes: 4 kebabs — chicken tikka, ribeye tikka, beef shish kebab, and chicken shish kebab — served with hummus, tabbouleh, rice, salad, hummus + tahini",
        ],
      },
    ],
  },
  {
    category: "Burgers",
    subtitle: "Handmade in House, never frozen",
    items: [
      { name: "Beef Burger", price: "$11.99" },
      { name: "Grilled Chicken", price: "$11.99" },
    ],
  },
  {
    category: "Sides",
    items: [
      { name: "Dolma", price: "$5.99" },
      { name: "Fries", price: "$3.49" },
      { name: "Hummus with tahini and pita", price: "$5.99" },
      { name: "Loaded Shawarma Fries", price: "$14.99" },
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