import heroImage from "@assets/pousada-aerea.jpeg";
import lagoonImage from "@assets/lagoon-waterfall.png";
import plateImage from "@assets/grilled-meal.png";
import seafoodImage from "@assets/seafood-platter.png";
import galleryTwo from "@assets/room-white-bed.png";
import parkSlideOne from "@assets/waterslide-tower.png";
import parkSlideTwo from "@assets/water-park-aerial.png";
import parkSlideThree from "@assets/lagoon-slide.png";

export type AtmosphereSlide = {
  image: string;
  alt: string;
};

export const atmosphereSlides: AtmosphereSlide[] = [
  { image: lagoonImage, alt: "Lagoa, queda d’água e palmeiras" },
  {
    image: heroImage,
    alt: "Lagoa transparente com espreguiçadeiras e quiosques",
  },
  { image: galleryTwo, alt: "Detalhe tropical da pousada" },
];

export type FoodSlide = AtmosphereSlide & {
  caption: string;
  subcaption: string;
};

export const foodSlides: FoodSlide[] = [
  {
    image: seafoodImage,
    alt: "Prato de frutos do mar grelhados",
    caption: "Da brasa para a mesa",
    subcaption: "com o pé na areia",
  },
  {
    image: plateImage,
    alt: "Refeição servida à beira da água",
    caption: "Sabores frescos",
    subcaption: "do nosso litoral",
  },
];

export type ParkSlide = {
  image: string;
  label: string;
  title: string;
  description: string;
};

export const parkSlides: ParkSlide[] = [
  {
    image: parkSlideOne,
    label: "Atração 01",
    title: "Desça no grito.",
    description:
      "Curvas, velocidade e água gelada para transformar qualquer tarde em história.",
  },
  {
    image: parkSlideTwo,
    label: "Atração 02",
    title: "Mergulhe na aventura.",
    description: "Espaço para brincar, relaxar e deixar o sol fazer o resto.",
  },
  {
    image: parkSlideThree,
    label: "Atração 03",
    title: "Vá mais longe.",
    description:
      "A lagoa é o ponto de encontro entre a pousada e a sua próxima lembrança.",
  },
];
