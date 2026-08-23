import galleryOne from "@assets/room-blue-bed.png";
import galleryTwo from "@assets/room-white-bed.png";
import heroImage from "@assets/pousada-aerea.jpeg";

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
  {
    slug: "quarto-vento",
    name: "Quarto Vento",
    type: "Para dois",
    desc: "Um quarto claro e silencioso para desacelerar sem pressa.",
    image: galleryOne,
    details: ["Cama queen", "Rede na varanda", "Vista para o jardim"],
    gallery: [galleryOne, galleryTwo, heroImage],
    price: 560,
    capacity: 2,
    meals: ["Café da manhã", "Meia pensão"],
  },
  {
    slug: "suite-sol",
    name: "Suíte Sol",
    type: "Para dois",
    desc: "Luz entrando devagar, espaço para ficar e uma varanda só sua.",
    image: galleryTwo,
    details: ["Cama king", "Varanda privativa", "Vista para a lagoa"],
    gallery: [galleryTwo, heroImage, galleryOne],
    price: 980,
    capacity: 2,
    meals: ["Café da manhã", "Pensão completa"],
  },
  {
    slug: "casa-mar",
    name: "Casa Mar",
    type: "Para até quatro",
    desc: "Um espaço generoso para compartilhar dias leves perto da água.",
    image: heroImage,
    details: ["Dois ambientes", "Cozinha de apoio", "Acesso à lagoa"],
    gallery: [heroImage, galleryOne, galleryTwo],
    price: 1450,
    capacity: 4,
    meals: ["Café da manhã", "Meia pensão", "Pensão completa"],
  },
  {
    slug: "bangalo-lua",
    name: "Bangalo Lua",
    type: "Para dois",
    desc: "Um refúgio reservado para ouvir a água e deixar o tempo passar.",
    image: galleryTwo,
    details: ["Cama queen", "Sala de estar", "Varanda privativa"],
    gallery: [galleryTwo, galleryOne, heroImage],
    price: 1750,
    capacity: 2,
    meals: ["Café da manhã", "Pensão completa"],
  },
];
