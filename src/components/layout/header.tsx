import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { navItems } from "@/data/navigation";
import logo from "@assets/logo-little-beach.jpg";

export function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isInternal = location !== "/";
  const isPark = location === "/little-beach";

  return (
    <header
      className={`site-header ${isScrolled ? "is-scrolled" : ""} ${isInternal ? "is-internal" : ""} ${isPark ? "is-park" : ""}`}
      data-testid="header-site"
    >
      <div className="header-inner">
        <Link href="/" className="brand-link" data-testid="link-logo">
          <img
            src={logo}
            alt="Beira D’Água Little Beach"
            className="brand-logo"
          />
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`nav-link ${item.special ? "nav-link-special" : ""} ${location === item.href ? "is-active" : ""}`}
              data-testid={`link-nav-${item.label.toLowerCase().replaceAll(" ", "-")}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="menu-toggle"
          onClick={() => setMobileOpen((value) => !value)}
          aria-label="Abrir menu"
          data-testid="button-menu-mobile"
        >
          {mobileOpen ? <X size={23} /> : <Menu size={23} />}
        </button>
      </div>
      <div className={`mobile-nav ${mobileOpen ? "is-open" : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            onClick={() => setMobileOpen(false)}
            className={`mobile-nav-link ${item.special ? "mobile-nav-link-special" : ""} ${location === item.href ? "is-active" : ""}`}
            data-testid={`link-mobile-${item.label.toLowerCase().replaceAll(" ", "-")}`}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
