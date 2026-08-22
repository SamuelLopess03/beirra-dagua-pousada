export type NavItem = {
  href: string;
  label: string;
  special?: boolean;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/quartos", label: "Quartos" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/little-beach", label: "Little Beach", special: true },
];
