import plateImage from "@assets/grilled-meal.png";

export type MenuCategory =
  | "Tudo"
  | "Para começar"
  | "Do mar"
  | "Da brasa"
  | "Para beber";

export type MenuItem = {
  name: string;
  category: Exclude<MenuCategory, "Tudo">;
  description: string;
  mark?: string;
  image: string;
};

export const menuCategories: MenuCategory[] = [
  "Tudo",
  "Para começar",
  "Do mar",
  "Da brasa",
  "Para beber",
];

export const menuItems: MenuItem[] = [
  {
    name: "Crocante de tapioca",
    category: "Para começar",
    description: "Com peixe curado, ervas frescas e toque cítrico.",
    mark: "da casa",
    image: plateImage,
  },
  {
    name: "Peixe do dia",
    category: "Do mar",
    description: "Grelhado, com acompanhamentos que mudam com a maré.",
    image: plateImage,
  },
  {
    name: "Moqueca de maré",
    category: "Do mar",
    description: "Leite de coco, dendê suave e cheiro verde.",
    image: plateImage,
  },
  {
    name: "Arroz de frutos do mar",
    category: "Do mar",
    description: "Camarões, polvo e o caldo demorado da nossa cozinha.",
    image: plateImage,
  },
  {
    name: "Brasa do litoral",
    category: "Da brasa",
    description: "Peixe inteiro, camarões e polvo para compartilhar.",
    mark: "para dividir",
    image: plateImage,
  },
  {
    name: "Legumes na brasa",
    category: "Da brasa",
    description: "Abóbora, cebola e folhas com molho de castanhas.",
    image: plateImage,
  },
  {
    name: "Caju com água de coco",
    category: "Para beber",
    description: "Fresco, gelado e sem pressa.",
    image: plateImage,
  },
  {
    name: "Caipirinha da casa",
    category: "Para beber",
    description: "Fruta da estação, cachaça e um pouco de sol.",
    image: plateImage,
  },
];
