export type ParkPackage = {
  id: string;
  name: string;
  description: string;
  price: number;
  note: string;
  benefits: string[];
};

export const parkPackages: ParkPackage[] = [
  {
    id: "day-pass",
    name: "Day Pass",
    description: "Um dia inteiro para aproveitar o Little Beach.",
    price: 180,
    note: "por pessoa",
    benefits: [
      "Acesso ao parque durante o dia",
      "Uso das áreas de lazer",
      "Válido de segunda a domingo",
    ],
  },
  {
    id: "family",
    name: "Família na água",
    description: "Diversão para reunir todo mundo sem pressa.",
    price: 620,
    note: "até 4 pessoas",
    benefits: [
      "Acesso ao parque durante o dia",
      "Área reservada para a família",
      "Uma bebida não alcoólica por pessoa",
    ],
  },
  {
    id: "sunset",
    name: "Fim de tarde",
    description: "A última onda do dia, com calma e céu bonito.",
    price: 120,
    note: "por pessoa",
    benefits: [
      "Acesso a partir das 15h",
      "Uso das áreas de lazer",
      "Experiência sujeita à disponibilidade",
    ],
  },
];
