export type NavItem = {
  href: string;
  labelKey: string;
  special?: boolean;
};

export const navItems: NavItem[] = [
  { href: "/", labelKey: "common.nav.home" },
  { href: "/quartos", labelKey: "common.nav.stays" },
  { href: "/cardapio", labelKey: "common.nav.gastronomy" },
  { href: "/little-beach", labelKey: "common.nav.littleBeach", special: true },
];
