export type NavItem = {
  href: string;
  label: string;
  special?: boolean;
};

export const navItems: NavItem[] = [
  { href: "/", label: "Início" },
  { href: "/quartos", label: "Hospedagem" },
  { href: "/cardapio", label: "Gastronomia" },
  { href: "/little-beach", label: "Little Beach", special: true },
];
