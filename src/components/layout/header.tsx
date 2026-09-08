import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { navItems } from "@/data/navigation";
import logo from "@assets/logo-little-beach.jpg";

export function Header() {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const isInternal = location !== "/";
  const isPark = location === "/little-beach";
  const isCheckout = location === "/ingressos";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const showScrolled = isCheckout ? false : isScrolled;

  return (
    <header
      className={`site-header ${showScrolled ? "is-scrolled" : ""} ${isInternal ? "is-internal" : ""} ${isPark ? "is-park" : ""} ${isCheckout ? "is-checkout" : ""}`}
      data-testid="header-site"
    >
      <div className="header-inner">
        <Link href="/" className="brand-link" data-testid="link-logo">
          <img
            src={logo}
            alt="Beira D'Água Little Beach"
            className="brand-logo"
          />
        </Link>

        {isCheckout && (
          <div className="checkout-header-benefits">
            <div className="checkout-benefit-item">
              <ShieldCheck size={16} />
              <span>Desconto para pagamento via Pix</span>
            </div>
            <div className="checkout-benefit-item">
              <Zap size={16} />
              <span>Economize comprando pelo site</span>
            </div>
            <div className="checkout-benefit-item">
              <Sparkles size={16} />
              <span>Parcele em até 10x sem juros</span>
            </div>
          </div>
        )}

        {!isCheckout && (
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
        )}
        {!isCheckout && (
          <button
            className="menu-toggle"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label="Abrir menu"
            data-testid="button-menu-mobile"
          >
            {mobileOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        )}
      </div>
      {!isCheckout && (
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
      )}
    </header>
  );
}
