import plateImage from "@assets/grilled-meal.png";

export type MenuCategoryKey = "all" | "starters" | "sea" | "grill" | "drinks";

export type MenuItem = {
  id: string;
  categoryKey: Exclude<MenuCategoryKey, "all">;
  hasMark?: boolean;
  image: string;
};

export const menuCategoryKeys: MenuCategoryKey[] = [
  "all",
  "starters",
  "sea",
  "grill",
  "drinks",
];

export const menuItems: MenuItem[] = [
  {
    id: "tapioca-crisp",
    categoryKey: "starters",
    hasMark: true,
    image: plateImage,
  },
  {
    id: "fish-of-the-day",
    categoryKey: "sea",
    image: plateImage,
  },
  {
    id: "tide-moqueca",
    categoryKey: "sea",
    image: plateImage,
  },
  {
    id: "seafood-rice",
    categoryKey: "sea",
    image: plateImage,
  },
  {
    id: "coastal-grill",
    categoryKey: "grill",
    hasMark: true,
    image: plateImage,
  },
  {
    id: "grilled-vegetables",
    categoryKey: "grill",
    image: plateImage,
  },
  {
    id: "cashew-coconut-water",
    categoryKey: "drinks",
    image: plateImage,
  },
  {
    id: "house-caipirinha",
    categoryKey: "drinks",
    image: plateImage,
  },
];

