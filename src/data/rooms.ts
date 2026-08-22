import galleryOne from "@assets/image_1787066780463.png";
import galleryTwo from "@assets/image_1787066829752.png";
import heroImage from "@assets/img_hero.jpeg";

export type Room = {
  slug: string;
  name: string;
  type: string;
  desc: string;
  image: string;
  details: string[];
  gallery: string[];
  price: number;
  capacity: number;
  meals: string[];
};

export const roomOptions: Room[] = [
  {
    slug: "quarto-brisa",
    name: "Quarto Brisa",
    type: "Para dois",
    desc: "Intimidade, luz natural e a sensação gostosa de acordar perto da água.",
    image: galleryOne,
    details: ["Cama queen", "Varanda privativa", "Vista para o jardim"],
    gallery: [galleryOne, heroImage, galleryTwo],
    price: 450,
    capacity: 2,
    meals: ["Café da manhã"],
  },
  {
    slug: "suite-mare",
    name: "Suíte Maré",
    type: "Para dois",
    desc: "Mais espaço para esticar o tempo, com um canto de descanso só seu.",
    image: galleryTwo,
    details: ["Cama queen", "Sala de estar", "Vista para a lagoa"],
    gallery: [galleryTwo, galleryOne, heroImage],
    price: 850,
    capacity: 2,
    meals: ["Café da manhã", "Meia pensão"],
  },
  {
    slug: "casa-areia",
    name: "Casa Areia",
    type: "Para até quatro",
    desc: "Um jeito inteiro de viver a pousada, com espaço para reunir quem você gosta.",
    image: heroImage,
    details: ["Dois ambientes", "Varanda ampla", "Acesso à lagoa"],
    gallery: [heroImage, galleryTwo, galleryOne],
    price: 1200,
    capacity: 4,
    meals: ["Café da manhã", "Pensão completa"],
  },
];
