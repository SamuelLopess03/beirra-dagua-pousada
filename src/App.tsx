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
  ArrowUpRight,
  Utensils,
  Waves,
  X,
} from "lucide-react";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import logo from "@assets/images_1787066687889.jpg";
import heroImage from "@assets/image_1787066701325.png";
import lagoonImage from "@assets/image_1787066717007.png";
import plateImage from "@assets/image_1787066729847.png";
import seafoodImage from "@assets/image_1787066742218.png";
import galleryOne from "@assets/image_1787066780463.png";
import galleryTwo from "@assets/image_1787066829752.png";

const queryClient = new QueryClient();

type BookingDialogProps = { open: boolean; onClose: () => void };

const navItems = [
  { href: "/", label: "Início" },
  { href: "/quartos", label: "Quartos" },
  { href: "/cardapio", label: "Cardápio" },
];

function Header({ onBooking }: { onBooking: () => void }) {
  const [location] = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isInnerPage = location !== "/";

  return (
    <header className={`site-header ${scrolled ? 'scrolled' : ''} ${isInnerPage ? 'inner' : ''}`} data-testid="header-site">
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
              className={`nav-link ${location === item.href ? "is-active" : ""}`}
              data-testid={`link-nav-${item.label.toLowerCase()}`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          className="header-cta"
          onClick={onBooking}
          data-testid="button-header-reserva"
        >
          <span>Consultar estadia</span>
          <ArrowDownRight size={16} />
        </button>
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
            className={`mobile-nav-link ${location === item.href ? "is-active" : ""}`}
            data-testid={`link-mobile-${item.label.toLowerCase()}`}
          >
            {item.label}
          </Link>
        ))}
        <a
          href="/#experiencia"
          onClick={() => setMobileOpen(false)}
          className="mobile-nav-link"
          data-testid="link-mobile-experiencia"
        >
          A pousada
        </a>
        <button
          className="mobile-booking"
          onClick={() => {
            setMobileOpen(false);
            onBooking();
          }}
          data-testid="button-mobile-reserva"
        >
          Consultar estadia <ArrowRight size={16} />
        </button>
      </div>
    </header>
  );
}

function BookingDialog({ open, onClose }: BookingDialogProps) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    arrival: "",
    departure: "",
    guests: "2",
    name: "",
    email: "",
    note: "",
  });
  useEffect(() => {
    if (!open) setSent(false);
  }, [open]);
  if (!open) return null;
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
          <a href="/#experiencia" data-testid="link-footer-pousada">
            A pousada
          </a>
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
          >
            <ArrowUpRight size={18} />
          </a>
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

  const goToSlide = (index: number) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
    setActiveSlide(index);
  };

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
              onClick={() => goToSlide(index)}
              aria-label={`Ir para imagem ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </div>
        <div className="atmosphere-carousel-arrows">
          <button
            onClick={() => goToSlide(Math.max(0, activeSlide - 1))}
            disabled={activeSlide === 0}
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={() =>
              goToSlide(Math.min(atmosphereSlides.length - 1, activeSlide + 1))
            }
            disabled={activeSlide === atmosphereSlides.length - 1}
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
        <div className="food-image">
          <img src={seafoodImage} alt="Prato de frutos do mar grelhados" />
          <div className="food-image-caption">
            Da brasa para a mesa
            <br />
            <span>com o pé na areia</span>
          </div>
        </div>
        <div className="food-small-image">
          <img src={plateImage} alt="Refeição servida à beira da água" />
        </div>
      </section>
      <section className="gallery-section page-width">
        <div className="gallery-intro">
          <SectionLabel>05 · guardar na memória</SectionLabel>
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
      <section className="closing-cta">
        <div className="closing-text">
          <span>Seu próximo intervalo</span>
          <h2>
            A água está
            <br />
            <em>te esperando.</em>
          </h2>
          <button
            className="button button-gold"
            onClick={onBooking}
            data-testid="button-closing-reserva"
          >
            Consultar estadia <ArrowRight size={17} />
          </button>
        </div>
        <div className="closing-image">
          <img src={lagoonImage} alt="Praia tranquila ao entardecer" />
        </div>
      </section>
    </main>
  );
}

function ArrowUpRightIcon() {
  return <ArrowDownRight size={18} className="rotate-arrow" />;
}

const roomOptions = [
  {
    name: "Quarto Brisa",
    type: "Para dois",
    desc: "Intimidade, luz natural e a sensação gostosa de acordar perto da água.",
    image: galleryOne,
    details: ["Cama queen", "Varanda privativa", "Vista para o jardim"],
  },
  {
    name: "Suíte Maré",
    type: "Para dois",
    desc: "Mais espaço para esticar o tempo, com um canto de descanso só seu.",
    image: galleryTwo,
    details: ["Cama queen", "Sala de estar", "Vista para a lagoa"],
  },
  {
    name: "Casa Areia",
    type: "Para até quatro",
    desc: "Um jeito inteiro de viver a pousada, com espaço para reunir quem você gosta.",
    image: heroImage,
    details: ["Dois ambientes", "Varanda ampla", "Acesso à lagoa"],
  },
];

function Quartos({ onBooking }: { onBooking: () => void }) {
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
        <div className="room-list">
          {roomOptions.map((room, index) => (
            <article
              className="room-card"
              key={room.name}
              data-testid={`card-quarto-${index}`}
            >
              <div className="room-card-image">
                <img src={room.image} alt={room.name} />
                <span>0{index + 1}</span>
              </div>
              <div className="room-card-body">
                <div className="room-card-top">
                  <span className="room-type">{room.type}</span>
                  <span className="room-number">quarto {index + 1}</span>
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
                <button
                  onClick={onBooking}
                  className="text-link"
                  data-testid={`button-reservar-quarto-${index}`}
                >
                  Consultar este quarto <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="room-principles">
        <div className="page-width principles-inner">
          <SectionLabel>O que acompanha a estadia</SectionLabel>
          <div className="principles-grid">
            <div>
              <Waves size={25} />
              <h3>Tempo para você</h3>
              <p>Um lugar onde a agenda pode ficar na mala.</p>
            </div>
            <div>
              <Utensils size={25} />
              <h3>Sabores da casa</h3>
              <p>Comida fresca para não precisar ir embora.</p>
            </div>
            <div>
              <MapPin size={25} />
              <h3>Perto de tudo</h3>
              <p>Da natureza, do silêncio e do seu descanso.</p>
            </div>
          </div>
        </div>
      </section>
      <section className="room-bottom-cta page-width">
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
}[] = [
  {
    name: "Crocante de tapioca",
    category: "Para começar",
    description: "Com peixe curado, ervas frescas e toque cítrico.",
    mark: "da casa",
  },
  {
    name: "Peixe do dia",
    category: "Do mar",
    description: "Grelhado, com acompanhamentos que mudam com a maré.",
  },
  {
    name: "Moqueca de maré",
    category: "Do mar",
    description: "Leite de coco, dendê suave e cheiro verde.",
  },
  {
    name: "Arroz de frutos do mar",
    category: "Do mar",
    description: "Camarões, polvo e o caldo demorado da nossa cozinha.",
  },
  {
    name: "Brasa do litoral",
    category: "Da brasa",
    description: "Peixe inteiro, camarões e polvo para compartilhar.",
    mark: "para dividir",
  },
  {
    name: "Legumes na brasa",
    category: "Da brasa",
    description: "Abóbora, cebola e folhas com molho de castanhas.",
  },
  {
    name: "Caju com água de coco",
    category: "Para beber",
    description: "Fresco, gelado e sem pressa.",
  },
  {
    name: "Caipirinha da casa",
    category: "Para beber",
    description: "Fruta da estação, cachaça e um pouco de sol.",
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
                <div>
                  <span className="menu-item-category">{item.category}</span>
                  <h3>
                    {item.name}
                    {item.mark && <small>{item.mark}</small>}
                  </h3>
                  <p>{item.description}</p>
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
      <Header onBooking={() => setBookingOpen(true)} />
      <RoutedErrorBoundary>
        <Switch>
          <Route
            path="/"
            component={() => <Home onBooking={() => setBookingOpen(true)} />}
          />
          <Route
            path="/quartos"
            component={() => <Quartos onBooking={() => setBookingOpen(true)} />}
          />
          <Route path="/cardapio" component={Cardapio} />
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
      <Footer onBooking={() => setBookingOpen(true)} />
      <BookingDialog open={bookingOpen} onClose={() => setBookingOpen(false)} />
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
