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
  key: "attraction01" | "attraction02" | "attraction03";
};

export const parkSlides: ParkSlide[] = [
  {
    image: parkSlideOne,
    key: "attraction01",
  },
  {
    image: parkSlideTwo,
    key: "attraction02",
  },
  {
    image: parkSlideThree,
    key: "attraction03",
  },
];
