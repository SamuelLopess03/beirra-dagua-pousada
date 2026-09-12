export type ParkPackage = {
  id: string;
  price: number;
};

export const parkPackages: ParkPackage[] = [
  {
    id: "day-pass",
    price: 180,
  },
  {
    id: "family",
    price: 620,
  },
  {
    id: "sunset",
    price: 120,
  },
];

