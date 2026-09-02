import { useEffect, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Sun,
  Ticket,
  Waves,
  Zap,
} from "lucide-react";
import { parkSlides } from "@/data/slides";
import { useBooking } from "@/hooks/booking-context";
import { ParkPackagesDialog } from "@/components/booking/park-packages-dialog";
import { ParkPackageCarousel } from "@/components/booking/park-packages-carousel";
import { TicketSearchCard } from "@/components/booking/ticket-search-card";

export function LittleBeach() {
  const { openBooking } = useBooking();
  const [activeSlide, setActiveSlide] = useState(0);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>();
  const slide = parkSlides[activeSlide];

  const openPackageDetails = (packageId?: string) => {
    setSelectedPackageId(packageId);
    setPackagesOpen(true);
  };

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
              <div className="park-hero-secondary-actions">
                <button
                  className="park-text-link park-packages-link"
                  onClick={() => setPackagesOpen(true)}
                  data-testid="button-ver-pacotes-hero"
                >
                  Ver pacotes de acesso <Ticket size={15} />
                </button>
              </div>
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

      <TicketSearchCard />

      <section className="park-intro page-width">
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
        <div className="park-intro-aside">
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
          <ParkPackageCarousel onSelectPackage={openPackageDetails} />
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
          <button
            className="park-button park-button-blue"
            onClick={() => openBooking()}
          >
            Consultar estadia <ArrowRight size={17} />
          </button>
        </div>
      </section>
      {packagesOpen && (
        <ParkPackagesDialog
          initialPackageId={selectedPackageId}
          onClose={() => setPackagesOpen(false)}
        />
      )}
    </main>
  );
}
