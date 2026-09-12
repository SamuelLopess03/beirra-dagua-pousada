import { Link } from "wouter";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useBooking } from "@/hooks/booking-context";
import logo from "@assets/logo-little-beach.jpg";

export function Footer() {
  const { openBooking } = useBooking();
  const { t } = useTranslation();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <img src={logo} alt="Beira D’Água" className="footer-logo" />
          <p>
            {t("common.footer.tagline")}
            <br />
            {t("common.footer.taglineHighlight")}
          </p>
        </div>
        <div className="footer-links">
          <span className="footer-heading">{t("common.footer.exploreHeading")}</span>
          <Link href="/quartos" data-testid="link-footer-quartos">
            {t("common.nav.stays")}
          </Link>
          <Link href="/cardapio" data-testid="link-footer-cardapio">
            {t("common.nav.gastronomy")}
          </Link>
          <Link href="/little-beach" data-testid="link-footer-little-beach">
            {t("common.nav.littleBeach")}
          </Link>
        </div>
        <div className="footer-links">
          <span className="footer-heading">{t("common.footer.contactHeading")}</span>
          <button
            onClick={() => openBooking()}
            data-testid="button-footer-reserva"
          >
            {t("common.footer.reserveButton")} <ArrowRight size={14} />
          </button>
          <a href="mailto:oi@beiradagua.com" data-testid="link-footer-email">
            oi@beiradagua.com
          </a>
        </div>
        <div className="footer-links">
          <span className="footer-heading">{t("common.footer.rhythmHeading")}</span>
          <span className="footer-note">
            <MapPin size={14} /> {t("common.footer.location")}
          </span>
          <span className="footer-note">
            <Clock3 size={14} /> {t("common.footer.schedule")}
          </span>
          <a
            href="#"
            className="social-link"
            aria-label="Instagram"
            data-testid="link-instagram"
          ></a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} {t("common.footer.copyright")}</span>
        <span>{t("common.footer.madeFor")}</span>
      </div>
    </footer>
  );
}
