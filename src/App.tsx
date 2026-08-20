import { useEffect, useRef, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Route,
  Switch,
  Link,
  useLocation,
  Router as WouterRouter,
} from "wouter";
import {
  ArrowDownRight,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Menu,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Sun,
  Utensils,
  Waves,
  X,
  Zap,
} from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import logo from "@assets/images_1787066687889.jpg";
import heroImage from "@assets/img_hero.jpeg";
import lagoonImage from "@assets/image_1787066717007.png";
import plateImage from "@assets/image_1787066729847.png";
import seafoodImage from "@assets/image_1787066742218.png";
import galleryOne from "@assets/image_1787066780463.png";
import galleryTwo from "@assets/image_1787066829752.png";
import parkSlideOne from "@assets/image_1787137460695.png";
import parkSlideTwo from "@assets/image_1787137489426.png";
import parkSlideThree from "@assets/image_1787137557063.png";
import { ContactSection } from "./components/contact-section";
import { LocationCard } from "./components/location-card";

const queryClient = new QueryClient();

type BookingDialogProps = { onClose: () => void };

const navItems = [
  { href: "/", label: "Início" },
  { href: "/quartos", label: "Quartos" },
  { href: "/cardapio", label: "Cardápio" },
  { href: "/little-beach", label: "Little Beach", special: true },
];

function Header() {
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

  return (
    <header
      className={`site-header ${isScrolled ? "is-scrolled" : ""} ${isInternal ? "is-internal" : ""}`}
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

function BookingDialog({ onClose }: BookingDialogProps) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    arrival: "",
    departure: "",
    guests: "2",
    name: "",
    email: "",
    note: "",
  });
  const update = (field: string, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));
  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        className="booking-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        data-testid="dialog-reserva"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label="Fechar"
          data-testid="button-fechar-reserva"
        >
          <X size={19} />
        </button>
        {!sent ? (
          <>
            <div className="panel-kicker">
              <span className="eyebrow-dot" /> Reserva sob medida
            </div>
            <h2 id="booking-title">
              Vamos encontrar
              <br />
              <em>seu lugar.</em>
            </h2>
            <p className="panel-intro">
              Conte como você imagina seus dias por aqui. A gente responde com
              calma, detalhes e as melhores possibilidades.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
              }}
              className="booking-form"
            >
              <div className="form-grid">
                <label>
                  Chegada
                  <input
                    required
                    type="date"
                    value={form.arrival}
                    onChange={(event) => update("arrival", event.target.value)}
                    data-testid="input-chegada"
                  />
                </label>
                <label>
                  Saída
                  <input
                    required
                    type="date"
                    value={form.departure}
                    onChange={(event) =>
                      update("departure", event.target.value)
                    }
                    data-testid="input-saida"
                  />
                </label>
              </div>
              <label>
                Hóspedes
                <select
                  value={form.guests}
                  onChange={(event) => update("guests", event.target.value)}
                  data-testid="select-hospedes"
                >
                  <option value="1">1 hóspede</option>
                  <option value="2">2 hóspedes</option>
                  <option value="3">3 hóspedes</option>
                  <option value="4">4 hóspedes</option>
                </select>
              </label>
              <div className="form-grid">
                <label>
                  Seu nome
                  <input
                    required
                    type="text"
                    placeholder="Como podemos chamar você?"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    data-testid="input-nome"
                  />
                </label>
                <label>
                  E-mail
                  <input
                    required
                    type="email"
                    placeholder="voce@email.com"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    data-testid="input-email"
                  />
                </label>
              </div>
              <label>
                Alguma preferência? <span className="optional">(opcional)</span>
                <textarea
                  rows={3}
                  placeholder="Uma ocasião especial, dúvidas ou vontade de conhecer..."
                  value={form.note}
                  onChange={(event) => update("note", event.target.value)}
                  data-testid="input-preferencia"
                />
              </label>
              <button
                className="button button-gold button-full"
                type="submit"
                data-testid="button-enviar-reserva"
              >
                Enviar preferência <ArrowRight size={17} />
              </button>
            </form>
          </>
        ) : (
          <div className="success-state" data-testid="status-reserva-enviada">
            <div className="success-mark">
              <Check size={24} />
            </div>
            <div className="panel-kicker">Pedido recebido</div>
            <h2>
              Até já,
              <br />
              <em>{form.name.split(" ")[0] || "viajante"}.</em>
            </h2>
            <p>
              Recebemos sua preferência. Vamos cuidar dos detalhes e retornar
              para você pelo e-mail informado.
            </p>
            <button
              className="button button-outline"
              onClick={onClose}
              data-testid="button-concluir-reserva"
            >
              Voltar para o site <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="section-label">
      <span className="eyebrow-dot" />
      {children}
    </div>
  );
}

function Footer({ onBooking }: { onBooking: () => void }) {
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
          <button onClick={onBooking} data-testid="button-footer-reserva">
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

const atmosphereSlides = [
  { image: lagoonImage, alt: "Lagoa, queda d’água e palmeiras" },
  {
    image: heroImage,
    alt: "Lagoa transparente com espreguiçadeiras e quiosques",
  },
  { image: galleryTwo, alt: "Detalhe tropical da pousada" },
];

function AtmosphereCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const pausedRef = useRef(false);

  const updateActiveSlide = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const closestIndex = cards.reduce((closest, card, index) => {
      const currentDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      const closestDistance = Math.abs(
        cards[closest].offsetLeft - track.scrollLeft,
      );
      return currentDistance < closestDistance ? index : closest;
    }, 0);
    setActiveSlide(closestIndex);
  };

  const goToSlide = (index: number, userInteraction = false) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveSlide(index);
    if (userInteraction) {
      pausedRef.current = true;
      setTimeout(() => {
        pausedRef.current = false;
      }, 5000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setActiveSlide((current) => {
        const next = (current + 1) % atmosphereSlides.length;
        const track = trackRef.current;
        const card = track?.children[next] as HTMLElement | undefined;
        if (track && card) {
          track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="atmosphere-carousel">
      <div
        ref={trackRef}
        className="atmosphere-carousel-track"
        onScroll={updateActiveSlide}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight")
            goToSlide(Math.min(atmosphereSlides.length - 1, activeSlide + 1));
          if (event.key === "ArrowLeft")
            goToSlide(Math.max(0, activeSlide - 1));
        }}
        tabIndex={0}
        aria-label="Imagens do ritmo da pousada"
      >
        {atmosphereSlides.map((slide, index) => (
          <div
            className={`atmosphere-slide ${index === activeSlide ? "is-active" : ""}`}
            key={slide.alt}
          >
            <img src={slide.image} alt={slide.alt} />
          </div>
        ))}
      </div>
      <div className="photo-tag">
        o nosso quintal <ArrowUpRightIcon />
      </div>
      <div className="atmosphere-carousel-controls">
        <div className="atmosphere-carousel-dots" aria-label="Escolher imagem">
          {atmosphereSlides.map((slide, index) => (
            <button
              key={slide.alt}
              className={index === activeSlide ? "is-active" : ""}
              onClick={() => goToSlide(index, true)}
              aria-label={`Ir para imagem ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </div>
        <div className="atmosphere-carousel-arrows">
          <button
            onClick={() =>
              goToSlide(
                (activeSlide - 1 + atmosphereSlides.length) %
                  atmosphereSlides.length,
                true,
              )
            }
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() =>
              goToSlide((activeSlide + 1) % atmosphereSlides.length, true)
            }
            aria-label="Próxima imagem"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      <span className="atmosphere-carousel-hint">deslize para ver mais</span>
    </div>
  );
}

const foodSlides = [
  {
    image: seafoodImage,
    alt: "Prato de frutos do mar grelhados",
    caption: "Da brasa para a mesa",
    subcaption: "com o pé na areia",
  },
  {
    image: plateImage,
    alt: "Refeição servida à beira da água",
    caption: "Sabores frescos",
    subcaption: "do nosso litoral",
  },
];

function FoodCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const pausedRef = useRef(false);

  const updateActiveSlide = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const closestIndex = cards.reduce((closest, card, index) => {
      const currentDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      const closestDistance = Math.abs(
        cards[closest].offsetLeft - track.scrollLeft,
      );
      return currentDistance < closestDistance ? index : closest;
    }, 0);
    setActiveSlide(closestIndex);
  };

  const goToSlide = (index: number, userInteraction = false) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveSlide(index);
    if (userInteraction) {
      pausedRef.current = true;
      setTimeout(() => {
        pausedRef.current = false;
      }, 5000);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setActiveSlide((current) => {
        const next = (current + 1) % foodSlides.length;
        const track = trackRef.current;
        const card = track?.children[next] as HTMLElement | undefined;
        if (track && card) {
          track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="atmosphere-carousel food-carousel">
      <div
        ref={trackRef}
        className="atmosphere-carousel-track"
        onScroll={updateActiveSlide}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight")
            goToSlide(Math.min(foodSlides.length - 1, activeSlide + 1));
          if (event.key === "ArrowLeft")
            goToSlide(Math.max(0, activeSlide - 1));
        }}
        tabIndex={0}
        aria-label="Imagens da gastronomia da pousada"
      >
        {foodSlides.map((slide, index) => (
          <div
            className={`atmosphere-slide ${index === activeSlide ? "is-active" : ""}`}
            key={slide.alt}
          >
            <img src={slide.image} alt={slide.alt} />
            <div className="food-image-caption" style={{ zIndex: 10 }}>
              {slide.caption}
              <br />
              <span>{slide.subcaption}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="atmosphere-carousel-controls" style={{ zIndex: 10 }}>
        <div className="atmosphere-carousel-dots" aria-label="Escolher imagem">
          {foodSlides.map((slide, index) => (
            <button
              key={slide.alt}
              className={index === activeSlide ? "is-active" : ""}
              onClick={() => goToSlide(index, true)}
              aria-label={`Ir para imagem ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </div>
        <div className="atmosphere-carousel-arrows">
          <button
            onClick={() =>
              goToSlide(
                (activeSlide - 1 + foodSlides.length) % foodSlides.length,
                true,
              )
            }
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() =>
              goToSlide((activeSlide + 1) % foodSlides.length, true)
            }
            aria-label="Próxima imagem"
          >
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Home({ onBooking }: { onBooking: () => void }) {
  return (
    <main>
      <section className="home-hero">
        <img
          src={heroImage}
          alt="Lagoa de águas claras da Beira D’Água"
          className="hero-image"
        />
        <div className="hero-wash" />
        <div className="hero-content page-width">
          <p className="hero-overline">
            Beira D’Água Little Beach <span>·</span> um refúgio brasileiro
          </p>
          <h1>
            Deixe o dia
            <br />
            <em>ficar leve.</em>
          </h1>
          <p className="hero-copy">
            Uma pousada pequena, uma lagoa transparente e o tempo
            <br className="desktop-only" /> necessário para voltar a ouvir o que
            importa.
          </p>
          <div className="hero-actions">
            <button
              className="button button-gold"
              onClick={onBooking}
              data-testid="button-hero-reserva"
            >
              Planejar minha estadia <ArrowRight size={17} />
            </button>
            <a
              href="#experiencia"
              className="scroll-link"
              data-testid="link-hero-experiencia"
            >
              <span className="scroll-ring">
                <ArrowDownRight size={16} />
              </span>{" "}
              conhecer a pousada
            </a>
          </div>
        </div>
        <div className="hero-aside">
          <span>01</span>
          <i />
          <span>03</span>
        </div>
        <div className="hero-caption">
          <Waves size={15} /> Água calma, sombra boa, mesa posta.
        </div>
      </section>
      <section className="intro-section page-width" id="experiencia">
        <div className="intro-number">
          01 <span>—</span> a experiência
        </div>
        <div className="intro-copy">
          <h2>
            Tem lugar que
            <br />
            <em>desacelera a gente.</em>
          </h2>
          <p>
            Entre o verde que abraça e a água que convida, a Beira D’Água é
            feita para quem quer sair do automático. Aqui, cada quarto abre para
            um pedaço de natureza, cada refeição chega com gosto de litoral e
            cada tarde pode durar o quanto quiser.
          </p>
          <a href="#ritmo" className="text-link" data-testid="link-intro-ritmo">
            Sinta o lugar <ArrowDownRight size={17} />
          </a>
        </div>
        <div className="intro-stamp">
          <span>
            Pequeno
            <br />
            por escolha
          </span>
          <strong>BD</strong>
          <span>
            Desde sempre
            <br />
            perto da água
          </span>
        </div>
      </section>
      <section className="atmosphere-section" id="ritmo">
        <AtmosphereCarousel />
        <div className="atmosphere-copy">
          <SectionLabel>02 · o ritmo daqui</SectionLabel>
          <h2>
            Manhã de água.
            <br />
            <em>Tarde de sombra.</em>
          </h2>
          <p>
            Não há programação obrigatória, nem despertador tocando cedo. Há um
            banho demorado, um livro aberto na varanda e a chance de fazer nada
            — com muito prazer.
          </p>
          <div className="ritual-list">
            <div>
              <span>01</span>
              <p>
                <b>Água por perto</b>
                <br />
                Para mergulhar antes do café.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <b>Quarto que acolhe</b>
                <br />
                Simples, bonito e cheio de silêncio.
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <b>Mesa com memória</b>
                <br />
                Sabores frescos do nosso litoral.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="rooms-teaser page-width">
        <div className="teaser-heading">
          <div>
            <SectionLabel>03 · dormir bem</SectionLabel>
            <h2>
              Uma pausa
              <br />
              <em>do seu jeito.</em>
            </h2>
          </div>
          <Link
            href="/quartos"
            className="text-link"
            data-testid="link-home-quartos"
          >
            Ver todos os quartos <ArrowRight size={16} />
          </Link>
        </div>
        <div className="rooms-feature">
          <div className="room-feature-image">
            <img src={galleryOne} alt="Interior e área externa da pousada" />
            <span className="image-index">01 / 03</span>
          </div>
          <div className="room-feature-copy">
            <span className="room-type">Quarto · para dois</span>
            <h3>
              Janela para
              <br />
              <em>o verde.</em>
            </h3>
            <p>
              Um canto silencioso para acordar sem pressa. Cama gostosa, luz
              natural e a natureza como companhia.
            </p>
            <Link
              href="/quartos"
              className="button button-dark"
              data-testid="button-conhecer-quarto"
            >
              Conhecer os quartos <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="food-section">
        <div className="food-copy">
          <SectionLabel>04 · comer por aqui</SectionLabel>
          <h2>
            O mar também
            <br />
            <em>chega à mesa.</em>
          </h2>
          <p>
            Receitas que respeitam o ingrediente e o lugar. Peixes, mariscos,
            calor de brasa e aquela vontade de ficar mais um pouco depois do
            almoço.
          </p>
          <Link
            href="/cardapio"
            className="button button-outline-light"
            data-testid="button-home-cardapio"
          >
            Abrir o cardápio <ArrowRight size={16} />
          </Link>
        </div>
        <FoodCarousel />
      </section>
      <section className="park-teaser page-width">
        <div className="park-teaser-image">
          <img src={parkSlideTwo} alt="Área aquática com toboáguas e lagoa" />
          <div className="park-teaser-stamp">
            <Waves size={16} /> água
            <br />
            <b>+ aventura</b>
          </div>
        </div>
        <div className="park-teaser-copy">
          <div className="park-teaser-kicker">
            <Sparkles size={13} /> 05 · modo aventura
          </div>
          <h2>
            Um mergulho
            <br />
            <em>fora do roteiro.</em>
          </h2>
          <p>
            Quando a vontade é brincar, o Little Beach entra em cena: toboáguas,
            lagoa e um dia inteiro para rir sem olhar o relógio.
          </p>
          <Link
            href="/little-beach"
            className="button park-teaser-button"
            data-testid="button-home-little-beach"
          >
            Conhecer o Little Beach <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="gallery-section page-width">
        <div className="gallery-intro">
          <SectionLabel>06 · guardar na memória</SectionLabel>
          <h2>
            Vá embora com
            <br />
            <em>água nos olhos.</em>
          </h2>
          <p>Ou volte logo. Algumas paisagens a gente reconhece como casa.</p>
        </div>
        <div className="gallery-grid">
          <div className="gallery-tall">
            <img src={galleryTwo} alt="Detalhe tropical da pousada" />
          </div>
          <div className="gallery-wide">
            <img src={heroImage} alt="Lagoa e espreguiçadeiras" />
          </div>
          <div className="gallery-detail">
            <div className="detail-art">BD</div>
            <span>
              dias simples
              <br />
              são dias grandes
            </span>
          </div>
        </div>
      </section>
      <LocationCard />
      <ContactSection />
    </main>
  );
}

function ArrowUpRightIcon() {
  return <ArrowDownRight size={18} className="rotate-arrow" />;
}

const roomOptions = [
  {
    slug: "quarto-brisa",
    name: "Quarto Brisa",
    type: "Para dois",
    desc: "Intimidade, luz natural e a sensação gostosa de acordar perto da água.",
    image: galleryOne,
    details: ["Cama queen", "Varanda privativa", "Vista para o jardim"],
    gallery: [galleryOne, heroImage, galleryTwo],
    price: 450,
    capacity: 2,
    meals: ["Café da manhã"],
  },
  {
    slug: "suite-mare",
    name: "Suíte Maré",
    type: "Para dois",
    desc: "Mais espaço para esticar o tempo, com um canto de descanso só seu.",
    image: galleryTwo,
    details: ["Cama queen", "Sala de estar", "Vista para a lagoa"],
    gallery: [galleryTwo, galleryOne, heroImage],
    price: 850,
    capacity: 2,
    meals: ["Café da manhã", "Meia pensão"],
  },
  {
    slug: "casa-areia",
    name: "Casa Areia",
    type: "Para até quatro",
    desc: "Um jeito inteiro de viver a pousada, com espaço para reunir quem você gosta.",
    image: heroImage,
    details: ["Dois ambientes", "Varanda ampla", "Acesso à lagoa"],
    gallery: [heroImage, galleryTwo, galleryOne],
    price: 1200,
    capacity: 4,
    meals: ["Café da manhã", "Pensão completa"],
  },
];

function Quartos({ onBooking }: { onBooking: () => void }) {
  const ROOMS_PER_PAGE = 5;
  const [page, setPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCapacities, setSelectedCapacities] = useState<number[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(2000);

  const toggleCapacity = (cap: number) => {
    setSelectedCapacities((prev) =>
      prev.includes(cap) ? prev.filter((c) => c !== cap) : [...prev, cap],
    );
    setPage(0);
  };

  const toggleMeal = (meal: string) => {
    setSelectedMeals((prev) =>
      prev.includes(meal) ? prev.filter((m) => m !== meal) : [...prev, meal],
    );
    setPage(0);
  };

  const filteredRooms = roomOptions.filter((room) => {
    const matchesSearch = room.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCapacity =
      selectedCapacities.length === 0 ||
      selectedCapacities.includes(room.capacity);
    const matchesMeal =
      selectedMeals.length === 0 ||
      selectedMeals.some((meal) => room.meals.includes(meal));
    const matchesPrice = room.price <= maxPrice;

    return matchesSearch && matchesCapacity && matchesMeal && matchesPrice;
  });

  const totalPages = Math.ceil(filteredRooms.length / ROOMS_PER_PAGE);
  const visibleRooms = filteredRooms.slice(
    page * ROOMS_PER_PAGE,
    page * ROOMS_PER_PAGE + ROOMS_PER_PAGE,
  );
  const activeFilterCount =
    selectedCapacities.length +
    selectedMeals.length +
    (maxPrice < 2000 ? 1 : 0);
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCapacities([]);
    setSelectedMeals([]);
    setMaxPrice(2000);
    setPage(0);
  };
  return (
    <main className="inner-page">
      <section className="page-hero page-width">
        <div>
          <SectionLabel>Beira D’Água · ficar</SectionLabel>
          <h1>
            Escolha seu
            <br />
            <em>canto de calma.</em>
          </h1>
          <p>
            Quartos com o essencial bem pensado, cercados pelo verde e pelo
            barulho bom da água.
          </p>
        </div>
        <div className="page-hero-note">
          <span>02</span>
          <i />
          <span>
            quartos para
            <br />
            viver devagar
          </span>
        </div>
      </section>
      <section className="room-guide page-width">
        <div className="room-guide-intro">
          <span className="side-note">Acomodações</span>
          <p>
            Não existe quarto melhor. Existe o quarto que combina com o jeito
            que você quer descansar. Veja os nossos cantos e envie sua
            preferência — os valores são consultados caso a caso.
          </p>
        </div>

        <div className="room-results-toolbar">
          <div>
            <span className="room-results-kicker">Sua estadia</span>
            <strong>{filteredRooms.length} quartos encontrados</strong>
          </div>
          <span className="room-results-note">
            Valores por noite · consulte disponibilidade
          </span>
        </div>

        <div className="room-results-layout">
          <aside className="room-filter-panel" aria-label="Filtros de quartos">
            <div className="room-filter-heading">
              <div>
                <SlidersHorizontal size={16} />
                <strong>Filtrar</strong>
                {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="clear-filters"
                >
                  Limpar
                </button>
              )}
            </div>
            <div className="filter-search">
              <input
                type="text"
                placeholder="Buscar quarto..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(0);
                }}
              />
            </div>

            <div className="filter-group">
              <span className="filter-title">Pessoas:</span>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCapacities.includes(2)}
                  onChange={() => toggleCapacity(2)}
                />{" "}
                2 pessoas
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCapacities.includes(4)}
                  onChange={() => toggleCapacity(4)}
                />{" "}
                4 pessoas
              </label>
            </div>

            <div className="filter-group">
              <span className="filter-title">Refeições:</span>
              <label>
                <input
                  type="checkbox"
                  checked={selectedMeals.includes("Café da manhã")}
                  onChange={() => toggleMeal("Café da manhã")}
                />{" "}
                Café da manhã
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedMeals.includes("Meia pensão")}
                  onChange={() => toggleMeal("Meia pensão")}
                />{" "}
                Meia pensão
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedMeals.includes("Pensão completa")}
                  onChange={() => toggleMeal("Pensão completa")}
                />{" "}
                Pensão completa
              </label>
            </div>

            <div className="filter-group">
              <span className="filter-title">Valor máx (R$ {maxPrice}):</span>
              <input
                type="range"
                min="300"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setPage(0);
                }}
              />
            </div>
          </aside>

          <div className="room-results">
            {filteredRooms.length === 0 ? (
              <div className="room-empty-state">
                Nenhum quarto encontrado com esses critérios. Tente limpar os
                filtros.
              </div>
            ) : (
              <div className="room-list">
                {visibleRooms.map((room, index) => (
                  <article
                    className="room-card"
                    key={room.name}
                    data-testid={`card-quarto-${page * ROOMS_PER_PAGE + index}`}
                  >
                    <div className="room-card-image">
                      <img src={room.image} alt={room.name} />
                      <span>0{page * ROOMS_PER_PAGE + index + 1}</span>
                    </div>
                    <div className="room-card-body">
                      <div className="room-card-top">
                        <span className="room-type">{room.type}</span>
                        <span className="room-number">
                          quarto {page * ROOMS_PER_PAGE + index + 1}
                        </span>
                      </div>
                      <h2>{room.name}</h2>
                      <p>{room.desc}</p>
                      <div className="room-details">
                        {room.details.map((detail) => (
                          <span key={detail}>
                            <Check size={13} /> {detail}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="room-card-price">
                      <span className="room-price-label">A partir de</span>
                      <strong>R$ {room.price.toLocaleString("pt-BR")}</strong>
                      <span className="room-price-period">/ noite</span>
                      <small>{room.meals[0]} incluso</small>
                      <Link
                        href={`/quartos/${room.slug}`}
                        className="button button-dark"
                        data-testid={`button-reservar-quarto-${page * ROOMS_PER_PAGE + index}`}
                      >
                        Consultar <ArrowRight size={15} />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="room-pagination" data-testid="pagination-quartos">
                <button
                  className="room-pagination-btn"
                  onClick={() => setPage((p) => Math.max(0, p - 1))}
                  disabled={page === 0}
                  aria-label="Quartos anteriores"
                >
                  <ArrowRight
                    size={16}
                    style={{ transform: "rotate(180deg)" }}
                  />
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`room-pagination-dot${i === page ? " is-active" : ""}`}
                    onClick={() => setPage(i)}
                    aria-label={`Página ${i + 1}`}
                    aria-current={i === page ? "page" : undefined}
                  />
                ))}
                <button
                  className="room-pagination-btn"
                  onClick={() =>
                    setPage((p) => Math.min(totalPages - 1, p + 1))
                  }
                  disabled={page === totalPages - 1}
                  aria-label="Próximos quartos"
                >
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="room-bottom-cta">
        <div className="room-bottom-cta-inner page-width">
          <div>
            <span className="section-label">Ainda em dúvida?</span>
            <h2>
              Fale com a gente.
              <br />
              <em>É mais simples assim.</em>
            </h2>
          </div>
          <button
            onClick={onBooking}
            className="button button-dark"
            data-testid="button-quartos-cta"
          >
            Enviar minha preferência <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

function QuartoDetalhe({
  slug,
  onBooking,
}: {
  slug: string;
  onBooking: () => void;
}) {
  const room = roomOptions.find((item) => item.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!room) return <NotFound />;

  return (
    <main className="room-detail-page inner-page">
      <section className="room-detail-header page-width">
        <Link href="/quartos" className="room-back-link">
          <ArrowRight size={15} /> Voltar para quartos
        </Link>
        <div className="room-detail-heading">
          <div>
            <SectionLabel>
              Beira D’Água · {room.type.toLowerCase()}
            </SectionLabel>
            <h1>{room.name}</h1>
            <p>{room.desc}</p>
          </div>
          <span className="room-detail-index">01 · quarto</span>
        </div>
      </section>

      <section className="room-detail-gallery page-width">
        <div className="room-detail-main-image">
          <img
            src={room.gallery[selectedImage]}
            alt={`${room.name} - vista ${selectedImage + 1}`}
          />
          <span>
            {String(selectedImage + 1).padStart(2, "0")} /{" "}
            {String(room.gallery.length).padStart(2, "0")}
          </span>
        </div>
        <div
          className="room-detail-thumbs"
          aria-label={`Galeria de ${room.name}`}
        >
          {room.gallery.map((image, index) => (
            <button
              type="button"
              key={image}
              className={selectedImage === index ? "is-active" : ""}
              onClick={() => setSelectedImage(index)}
              aria-label={`Ver imagem ${index + 1}`}
              aria-current={selectedImage === index ? "true" : undefined}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </section>

      <section className="room-detail-info page-width">
        <div className="room-detail-copy">
          <span className="side-note">Um canto para ficar</span>
          <h2>O essencial bem pensado para viver devagar.</h2>
          <p>
            Luz natural, silêncio e espaço para deixar o tempo correr no seu
            ritmo. Cada detalhe foi escolhido para que a estadia seja simples,
            confortável e perto da natureza.
          </p>
        </div>
        <div className="room-detail-features">
          <div className="room-detail-feature">
            <span>Capacidade</span>
            <strong>
              {room.capacity} {room.capacity === 1 ? "hóspede" : "hóspedes"}
            </strong>
          </div>
          <div className="room-detail-feature">
            <span>Inclui</span>
            <strong>{room.meals.join(" · ")}</strong>
          </div>
          <div className="room-detail-feature room-detail-feature-wide">
            <span>O quarto oferece</span>
            <div>
              {room.details.map((detail) => (
                <span key={detail}>
                  <Check size={14} /> {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="room-detail-booking">
        <div className="page-width room-detail-booking-inner">
          <div>
            <span className="section-label">Consulte sua estadia</span>
            <h2>Seu lugar perto da água.</h2>
          </div>
          <button
            type="button"
            onClick={onBooking}
            className="button button-dark"
          >
            Consultar disponibilidade <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}

type MenuCategory =
  | "Tudo"
  | "Para começar"
  | "Do mar"
  | "Da brasa"
  | "Para beber";
const menuItems: {
  name: string;
  category: Exclude<MenuCategory, "Tudo">;
  description: string;
  mark?: string;
  image: string;
}[] = [
  {
    name: "Crocante de tapioca",
    category: "Para começar",
    description: "Com peixe curado, ervas frescas e toque cítrico.",
    mark: "da casa",
    image: plateImage,
  },
  {
    name: "Peixe do dia",
    category: "Do mar",
    description: "Grelhado, com acompanhamentos que mudam com a maré.",
    image: plateImage,
  },
  {
    name: "Moqueca de maré",
    category: "Do mar",
    description: "Leite de coco, dendê suave e cheiro verde.",
    image: plateImage,
  },
  {
    name: "Arroz de frutos do mar",
    category: "Do mar",
    description: "Camarões, polvo e o caldo demorado da nossa cozinha.",
    image: plateImage,
  },
  {
    name: "Brasa do litoral",
    category: "Da brasa",
    description: "Peixe inteiro, camarões e polvo para compartilhar.",
    mark: "para dividir",
    image: plateImage,
  },
  {
    name: "Legumes na brasa",
    category: "Da brasa",
    description: "Abóbora, cebola e folhas com molho de castanhas.",
    image: plateImage,
  },
  {
    name: "Caju com água de coco",
    category: "Para beber",
    description: "Fresco, gelado e sem pressa.",
    image: plateImage,
  },
  {
    name: "Caipirinha da casa",
    category: "Para beber",
    description: "Fruta da estação, cachaça e um pouco de sol.",
    image: plateImage,
  },
];

function Cardapio() {
  const [category, setCategory] = useState<MenuCategory>("Tudo");
  const filtered =
    category === "Tudo"
      ? menuItems
      : menuItems.filter((item) => item.category === category);
  return (
    <main className="inner-page menu-page">
      <section className="menu-hero page-width">
        <div className="menu-hero-copy">
          <SectionLabel>Beira D’Água · à mesa</SectionLabel>
          <h1>
            Comer é parte
            <br />
            <em>do descanso.</em>
          </h1>
          <p>
            Uma cozinha de litoral, feita para acompanhar o céu mudando de cor e
            a conversa se estendendo.
          </p>
        </div>
        <div className="menu-hero-image">
          <img src={plateImage} alt="Peixe servido na mesa à beira da água" />
          <span>05 · sabor de mar</span>
        </div>
      </section>
      <section className="menu-introduction page-width">
        <div className="menu-intro-statement">
          <span className="side-note">Cozinha Beira D’Água</span>
          <h2>
            Fresco, local,
            <br />
            <em>sem cerimônia.</em>
          </h2>
        </div>
        <div>
          <p>
            A gente cozinha com o que encontra de bonito e fresco. O cardápio
            acompanha a estação, a pesca e a vontade do dia — por isso, aqui
            você encontra uma direção de sabores, não uma lista engessada.
          </p>
          <div className="service-note">
            <Clock3 size={16} />
            <span>
              Almoço e fim de tarde
              <br />
              <b>Consulte a disponibilidade no dia</b>
            </span>
          </div>
        </div>
      </section>
      <section className="menu-listing page-width">
        <div
          className="category-tabs"
          role="tablist"
          aria-label="Categorias do cardápio"
        >
          {(
            [
              "Tudo",
              "Para começar",
              "Do mar",
              "Da brasa",
              "Para beber",
            ] as MenuCategory[]
          ).map((item) => (
            <button
              key={item}
              className={category === item ? "is-selected" : ""}
              onClick={() => setCategory(item)}
              role="tab"
              aria-selected={category === item}
              data-testid={`button-categoria-${item.toLowerCase().replaceAll(" ", "-")}`}
            >
              {item}
            </button>
          ))}
        </div>
        {filtered.length ? (
          <div className="menu-items">
            {filtered.map((item, index) => (
              <article
                className="menu-item"
                key={item.name}
                data-testid={`item-cardapio-${index}`}
              >
                <div className="menu-item-content">
                  <div className="menu-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="menu-item-text">
                    <span className="menu-item-category">{item.category}</span>
                    <h3>
                      {item.name}
                      {item.mark && <small>{item.mark}</small>}
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </div>
                <span className="menu-item-line" />
              </article>
            ))}
          </div>
        ) : (
          <div className="menu-empty" data-testid="empty-cardapio">
            <Utensils size={22} />
            <h3>Essa maré ainda está vazia.</h3>
            <p>
              Escolha outra categoria para continuar a descobrir a mesa da casa.
            </p>
          </div>
        )}
      </section>
      <section className="menu-image-break">
        <img src={seafoodImage} alt="Seleção de frutos do mar na brasa" />
        <div>
          <span>Da nossa cozinha</span>
          <h2>
            O melhor tempero
            <br />
            <em>é ficar.</em>
          </h2>
        </div>
      </section>
    </main>
  );
}

const parkSlides = [
  {
    image: parkSlideOne,
    label: "Atração 01",
    title: "Desça no grito.",
    description:
      "Curvas, velocidade e água gelada para transformar qualquer tarde em história.",
  },
  {
    image: parkSlideTwo,
    label: "Atração 02",
    title: "Mergulhe na aventura.",
    description: "Espaço para brincar, relaxar e deixar o sol fazer o resto.",
  },
  {
    image: parkSlideThree,
    label: "Atração 03",
    title: "Vá mais longe.",
    description:
      "A lagoa é o ponto de encontro entre a pousada e a sua próxima lembrança.",
  },
];

function LittleBeach({ onBooking }: { onBooking: () => void }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = parkSlides[activeSlide];

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % parkSlides.length),
      5500,
    );
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className="park-page">
      <section className="park-hero">
        <div className="park-hero-shape park-hero-shape-one" />
        <div className="park-hero-shape park-hero-shape-two" />
        <div className="park-hero-content page-width">
          <div className="park-hero-copy">
            <div className="park-kicker">
              <Sparkles size={14} /> Um dia de pura aventura
            </div>
            <h1>
              Sol, água
              <br />
              <em>e emoção.</em>
            </h1>
            <p>
              O Little Beach da Beira D’Água foi feito para quem gosta de rir
              alto, sair molhado e voltar para a pousada com uma história nova.
            </p>
            <div className="park-hero-actions">
              <a href="#atracoes" className="park-button park-button-orange">
                Explorar atrações <ArrowDownRight size={17} />
              </a>
              <button className="park-text-link" onClick={onBooking}>
                Planejar meu dia <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div className="park-hero-badge">
            <Sun size={25} />
            <strong>
              Modo
              <br />
              aventura
            </strong>
            <span>ON</span>
          </div>
        </div>
        <div className="park-hero-wave" />
      </section>

      <section className="park-intro page-width">
        <div className="park-section-number">
          01 <span>—</span> diversão para todo mundo
        </div>
        <div className="park-intro-copy">
          <span className="park-label">O parque é seu</span>
          <h2>
            Prepare o<br />
            <em>melhor mergulho.</em>
          </h2>
          <p>
            Entre um escorregador e outro, tem sombra, brisa e aquele tipo de
            alegria que não precisa de legenda. Escolha seu ritmo — a aventura
            começa na próxima onda.
          </p>
        </div>
        <div className="park-sticker">
          <Zap size={19} />
          <span>
            Mais
            <br />
            <b>energia</b>
            <br />
            por m²
          </span>
        </div>
      </section>

      <section className="park-showcase" id="atracoes">
        <div className="park-showcase-image">
          <img
            key={slide.image}
            src={slide.image}
            alt={slide.title}
            className="park-slide-image"
          />
          <div className="park-image-overlay" />
          <div className="park-slide-count">
            0{activeSlide + 1} <span>/ 03</span>
          </div>
          <div className="park-showcase-controls">
            <button
              onClick={() =>
                setActiveSlide(
                  (activeSlide - 1 + parkSlides.length) % parkSlides.length,
                )
              }
              aria-label="Atração anterior"
            >
              <ChevronLeft size={19} />
            </button>
            <div className="park-dots">
              {parkSlides.map((item, index) => (
                <button
                  key={item.label}
                  className={activeSlide === index ? "is-active" : ""}
                  onClick={() => setActiveSlide(index)}
                  aria-label={`Ver ${item.label}`}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setActiveSlide((activeSlide + 1) % parkSlides.length)
              }
              aria-label="Próxima atração"
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
        <div className="park-showcase-copy">
          <span className="park-label">{slide.label}</span>
          <h2>{slide.title}</h2>
          <p>{slide.description}</p>
          <div className="park-progress">
            <span
              style={{
                width: `${((activeSlide + 1) / parkSlides.length) * 100}%`,
              }}
            />
          </div>
          <span className="park-swipe-note">
            Troque a atração <ArrowRight size={14} />
          </span>
        </div>
      </section>

      <section className="park-highlights page-width">
        <div className="park-highlights-heading">
          <span className="park-label">Por que entrar nessa?</span>
          <h2>
            Um parque inteiro
            <br />
            <em>de bons motivos.</em>
          </h2>
        </div>
        <div className="park-highlight-grid">
          <article>
            <div className="park-icon">
              <Waves size={21} />
            </div>
            <h3>Água por todos os lados</h3>
            <p>Para correr, boiar, deslizar ou simplesmente molhar os pés.</p>
          </article>
          <article>
            <div className="park-icon">
              <Zap size={21} />
            </div>
            <h3>Adrenalina na medida</h3>
            <p>
              Atrações para quem quer acelerar e também para quem prefere ir
              devagar.
            </p>
          </article>
          <article>
            <div className="park-icon">
              <ShieldCheck size={21} />
            </div>
            <h3>Todo mundo brinca</h3>
            <p>
              Um espaço pensado para juntar famílias, amigos e muitas
              gargalhadas.
            </p>
          </article>
        </div>
      </section>

      <section className="park-cta">
        <div className="park-cta-sun" />
        <div className="page-width park-cta-inner">
          <div>
            <span className="park-label">Seu próximo splash</span>
            <h2>
              O dia pede
              <br />
              <em>um pouco mais.</em>
            </h2>
          </div>
          <button className="park-button park-button-blue" onClick={onBooking}>
            Consultar estadia <ArrowRight size={17} />
          </button>
        </div>
      </section>
    </main>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Shell() {
  const [bookingOpen, setBookingOpen] = useState(false);
  return (
    <>
      <Header />
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/">
            <Home onBooking={() => setBookingOpen(true)} />
          </Route>
          <Route path="/quartos/:slug">
            {(params) => (
              <QuartoDetalhe
                slug={params.slug}
                onBooking={() => setBookingOpen(true)}
              />
            )}
          </Route>
          <Route path="/quartos">
            <Quartos onBooking={() => setBookingOpen(true)} />
          </Route>
          <Route path="/cardapio" component={Cardapio} />
          <Route path="/little-beach">
            <LittleBeach onBooking={() => setBookingOpen(true)} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
      <Footer onBooking={() => setBookingOpen(true)} />
      {bookingOpen && <BookingDialog onClose={() => setBookingOpen(false)} />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Shell />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
