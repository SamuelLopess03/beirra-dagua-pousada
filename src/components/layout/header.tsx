import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { useTranslation } from "react-i18next";
import { Menu, X, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { navItems } from "@/data/navigation";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import logo from "@assets/logo-little-beach.jpg";

export function Header() {
  const { t } = useTranslation();
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
              <span>{t("common.checkoutBenefits.pix")}</span>
            </div>
            <div className="checkout-benefit-item">
              <Zap size={16} />
              <span>{t("common.checkoutBenefits.site")}</span>
            </div>
            <div className="checkout-benefit-item">
              <Sparkles size={16} />
              <span>{t("common.checkoutBenefits.installments")}</span>
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
                data-testid={`link-nav-${item.href === "/" ? "home" : item.href.replace(/\//g, "")}`}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </nav>
        )}
        <LanguageSwitcher />
        {!isCheckout && (
          <button
            className="menu-toggle"
            onClick={() => setMobileOpen((value) => !value)}
            aria-label={t("common.menu.open")}
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
              data-testid={`link-mobile-${item.href === "/" ? "home" : item.href.replace(/\//g, "")}`}
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
