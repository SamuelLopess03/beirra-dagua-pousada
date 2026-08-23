import { Link } from "wouter";
import { ArrowRight, Clock3, MapPin } from "lucide-react";
import { useBooking } from "@/hooks/booking-context";
import logo from "@assets/images_1787066687889.jpg";

export function Footer() {
  const { openBooking } = useBooking();

  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <img src={logo} alt="Beira D’Água" className="footer-logo" />
          <p>
            Um pequeno intervalo
            <br />à beira d’água.
          </p>
        </div>
        <div className="footer-links">
          <span className="footer-heading">Explore</span>
          <Link href="/quartos" data-testid="link-footer-quartos">
            Quartos
          </Link>
          <Link href="/cardapio" data-testid="link-footer-cardapio">
            Cardápio
          </Link>
          <Link href="/little-beach" data-testid="link-footer-little-beach">
            Little Beach
          </Link>
        </div>
        <div className="footer-links">
          <span className="footer-heading">Converse com a gente</span>
          <button
            onClick={() => openBooking()}
            data-testid="button-footer-reserva"
          >
            Consultar estadia <ArrowRight size={14} />
          </button>
          <a href="mailto:oi@beiradagua.com" data-testid="link-footer-email">
            oi@beiradagua.com
          </a>
        </div>
        <div className="footer-links">
          <span className="footer-heading">Encontre o seu ritmo</span>
          <span className="footer-note">
            <MapPin size={14} /> Litoral brasileiro
          </span>
          <span className="footer-note">
            <Clock3 size={14} /> Todos os dias, sem pressa
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
        <span>© {new Date().getFullYear()} Beira D’Água Little Beach</span>
        <span>Feito para dias que ficam</span>
      </div>
    </footer>
  );
}
