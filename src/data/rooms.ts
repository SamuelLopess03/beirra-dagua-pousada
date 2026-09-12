import galleryOne from "@assets/room-blue-bed.png";
import galleryTwo from "@assets/room-white-bed.png";
import heroImage from "@assets/pousada-aerea.jpeg";

export type MealPlanKey = "breakfast" | "halfBoard" | "fullBoard";
export type RoomDetailKey =
  | "queenBed"
  | "kingBed"
  | "privateBalcony"
  | "largeBalcony"
  | "hammockBalcony"
  | "gardenView"
  | "lagoonView"
  | "livingRoom"
  | "twoRooms"
  | "lagoonAccess"
  | "supportKitchen";

export type Room = {
  slug: string;
  capacity: 2 | 4;
  price: number;
  image: string;
  gallery: string[];
  detailKeys: RoomDetailKey[];
  mealKeys: MealPlanKey[];
};

export const roomOptions: Room[] = [
  {
    slug: "quarto-brisa",
    image: galleryOne,
    detailKeys: ["queenBed", "privateBalcony", "gardenView"],
    gallery: [galleryOne, heroImage, galleryTwo],
    price: 450,
    capacity: 2,
    mealKeys: ["breakfast"],
  },
  {
    slug: "suite-mare",
    image: galleryTwo,
    detailKeys: ["queenBed", "livingRoom", "lagoonView"],
    gallery: [galleryTwo, galleryOne, heroImage],
    price: 850,
    capacity: 2,
    mealKeys: ["breakfast", "halfBoard"],
  },
  {
    slug: "casa-areia",
    image: heroImage,
    detailKeys: ["twoRooms", "largeBalcony", "lagoonAccess"],
    gallery: [heroImage, galleryTwo, galleryOne],
    price: 1200,
    capacity: 4,
    mealKeys: ["breakfast", "fullBoard"],
  },
  {
    slug: "quarto-vento",
    image: galleryOne,
    detailKeys: ["queenBed", "hammockBalcony", "gardenView"],
    gallery: [galleryOne, galleryTwo, heroImage],
    price: 560,
    capacity: 2,
    mealKeys: ["breakfast", "halfBoard"],
  },
  {
    slug: "suite-sol",
    image: galleryTwo,
    detailKeys: ["kingBed", "privateBalcony", "lagoonView"],
    gallery: [galleryTwo, heroImage, galleryOne],
    price: 980,
    capacity: 2,
    mealKeys: ["breakfast", "fullBoard"],
  },
  {
    slug: "casa-mar",
    image: heroImage,
    detailKeys: ["twoRooms", "supportKitchen", "lagoonAccess"],
    gallery: [heroImage, galleryOne, galleryTwo],
    price: 1450,
    capacity: 4,
    mealKeys: ["breakfast", "halfBoard", "fullBoard"],
  },
  {
    slug: "bangalo-lua",
    image: galleryTwo,
    detailKeys: ["queenBed", "livingRoom", "privateBalcony"],
    gallery: [galleryTwo, galleryOne, heroImage],
    price: 1750,
    capacity: 2,
    mealKeys: ["breakfast", "fullBoard"],
  },
];

