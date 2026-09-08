import { Link, useLocation } from "wouter";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Search,
  Sparkles,
  Waves,
  X,
} from "lucide-react";
import { SectionLabel } from "@/components/layout/section-label";
import { ContactSection } from "@/components/contact-section";
import { LocationCard } from "@/components/location-card";
import { Carousel } from "@/components/carousel/carousel";
import { useBooking } from "@/hooks/booking-context";
import { atmosphereSlides, foodSlides } from "@/data/slides";
import heroImage from "@assets/pousada-aerea.jpeg";
import galleryOne from "@assets/room-blue-bed.png";
import galleryTwo from "@assets/room-white-bed.png";
import parkSlideTwo from "@assets/water-park-aerial.png";
import videoOne from "@assets/promo-video-01.mp4";
import videoTwo from "@assets/promo-video-02.mp4";
import videoThree from "@assets/promo-video-03.mp4";

function ArrowUpRightIcon() {
  return <ArrowDownRight size={18} className="rotate-arrow" />;
}

function AtmosphereCarousel() {
  return (
    <Carousel
      slides={atmosphereSlides}
      ariaLabel="Imagens do ritmo da pousada"
      autoPlayInterval={2000}
      floatingTag={
        <div className="photo-tag">
          o nosso quintal <ArrowUpRightIcon />
        </div>
      }
      hint="deslize para ver mais"
    />
  );
}

function FoodCarousel() {
  return (
    <Carousel
      slides={foodSlides}
      ariaLabel="Imagens da gastronomia da pousada"
      autoPlayInterval={4000}
      className="food-carousel"
      renderSlideOverlay={(slide) => (
        <div className="food-image-caption" style={{ zIndex: 10 }}>
          {slide.caption}
          <br />
          <span>{slide.subcaption}</span>
        </div>
      )}
    />
  );
}

const stayVideos = [
  {
    title: "A lagoa ao amanhecer",
    source: videoOne,
    poster: heroImage,
  },
  {
    title: "Dias perto da água",
    source: videoTwo,
    poster: galleryOne,
  },
  {
    title: "O ritmo da pousada",
    source: videoThree,
    poster: galleryTwo,
  },
];

function StayVideoCoverflow() {
  const [activeVideo, setActiveVideo] = useState(0);
  const [expandedVideo, setExpandedVideo] = useState<number | null>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const videos = stageRef.current?.querySelectorAll("video");
    if (!videos) return;

    videos.forEach((video, index) => {
      if (index === activeVideo && expandedVideo === null) {
        video.play().catch(() => undefined);
      } else {
        video.pause();
      }
    });
  }, [activeVideo, expandedVideo]);

  useEffect(() => {
    if (expandedVideo === null) return;

    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setExpandedVideo(null);
    };
    window.addEventListener("keydown", closeWithEscape);
    return () => window.removeEventListener("keydown", closeWithEscape);
  }, [expandedVideo]);

  const moveVideo = useCallback(
    (direction: number) => {
      setActiveVideo(
        (current) =>
          (current + direction + stayVideos.length) % stayVideos.length,
      );
    },
    [],
  );

  return (
    <div className="stay-video-coverflow" aria-label="Vídeos da pousada">
      <div className="stay-video-coverflow-heading">
        <span>Veja de perto</span>
        <strong>
          0{activeVideo + 1} <small>/ 03</small>
        </strong>
      </div>
      <div className="stay-video-coverflow-stage" ref={stageRef}>
        {stayVideos.map((video, index) => {
          const distance =
            (index - activeVideo + stayVideos.length) % stayVideos.length;
          const position =
            distance === 0 ? "active" : distance === 1 ? "next" : "previous";

          return (
            <article
              key={video.title}
              className={`stay-video-card is-${position}`}
              onClick={() => setActiveVideo(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveVideo(index);
                }
              }}
              role="button"
              tabIndex={0}
              aria-label={`Visualizar vídeo: ${video.title}`}
              aria-pressed={index === activeVideo}
            >
              <video
                src={video.source}
                poster={video.poster}
                muted
                loop
                playsInline
                preload={index === activeVideo ? "auto" : "metadata"}
                autoPlay={index === activeVideo}
                controls={index === activeVideo}
                controlsList="nofullscreen"
              />
              <span>{video.title}</span>
              {index !== activeVideo && <i>Selecionar</i>}
              {index === activeVideo && (
                <button
                  type="button"
                  className="stay-video-expand"
                  onClick={(event) => {
                    event.stopPropagation();
                    setExpandedVideo(index);
                  }}
                  aria-label={`Ampliar vídeo: ${video.title}`}
                >
                  <Maximize2 size={15} />
                </button>
              )}
            </article>
          );
        })}
        <div className="stay-video-coverflow-controls">
          <button
            type="button"
            onClick={() => moveVideo(-1)}
            aria-label="Vídeo anterior"
          >
            <ChevronLeft size={17} />
          </button>
          <div aria-label="Selecionar vídeo">
            {stayVideos.map((video, index) => (
              <button
                type="button"
                key={video.title}
                className={index === activeVideo ? "is-active" : ""}
                onClick={() => setActiveVideo(index)}
                aria-label={`Vídeo ${index + 1}`}
                aria-current={index === activeVideo ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => moveVideo(1)}
            aria-label="Próximo vídeo"
          >
            <ChevronRight size={17} />
          </button>
        </div>
      </div>
      {expandedVideo !== null && (
        <div
          className="stay-video-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={`Vídeo ampliado: ${stayVideos[expandedVideo].title}`}
          onClick={() => setExpandedVideo(null)}
        >
          <div
            className="stay-video-lightbox-content"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="stay-video-lightbox-close"
              onClick={() => setExpandedVideo(null)}
              aria-label="Fechar vídeo ampliado"
            >
              <X size={18} />
            </button>
            <video
              src={stayVideos[expandedVideo].source}
              poster={stayVideos[expandedVideo].poster}
              autoPlay
              controls
              controlsList="nofullscreen"
              playsInline
            />
            <strong>{stayVideos[expandedVideo].title}</strong>
          </div>
        </div>
      )}
    </div>
  );
}

function HomeRoomSearch() {
  const [, setLocation] = useLocation();
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [mealPrice, setMealPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("2000");

  const searchRooms = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (adults) params.set("adults", adults);
    if (children && children !== "0") params.set("children", children);
    if (mealPrice) params.set("mealPrice", mealPrice);
    if (maxPrice !== "2000") params.set("maxPrice", maxPrice);

    const query = params.toString();
    setLocation(query ? `/quartos?${query}` : "/quartos");
  };

  return (
    <section
      className="home-room-search page-width"
      aria-label="Buscar hospedagem"
    >
      <form className="home-room-search-card" onSubmit={searchRooms}>
        <div className="home-room-search-intro">
          <span className="home-room-search-kicker">Sua estadia</span>
          <h2>
            Encontre seu <em>canto.</em>
          </h2>
          <p>Escolha o que combina com os seus dias por aqui.</p>
        </div>
        <label className="home-room-search-field">
          <span>Adultos</span>
          <input
            type="number"
            min="1"
            max="20"
            value={adults}
            onChange={(event) => setAdults(event.target.value)}
            aria-label="Quantidade de adultos"
            className="home-room-search-number"
          />
        </label>
        <label className="home-room-search-field">
          <span>Crianças</span>
          <input
            type="number"
            min="0"
            max="20"
            value={children}
            onChange={(event) => setChildren(event.target.value)}
            aria-label="Quantidade de crianças"
            className="home-room-search-number"
          />
        </label>
        <label className="home-room-search-field">
          <span>Valor da Refeição</span>
          <select
            value={mealPrice}
            onChange={(event) => setMealPrice(event.target.value)}
            aria-label="Valor ou tipo de refeição"
          >
            <option value="">Qualquer opção</option>
            <option value="incluso">Café incluso (R$ 0)</option>
            <option value="80">Meia pensão (R$ 80 / pessoa)</option>
            <option value="150">Pensão completa (R$ 150 / pessoa)</option>
          </select>
        </label>
        <label className="home-room-search-field">
          <span>Valor Máximo</span>
          <select
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            aria-label="Valor máximo por noite"
          >
            <option value="2000">Sem limite</option>
            <option value="600">Até R$ 600</option>
            <option value="900">Até R$ 900</option>
            <option value="1200">Até R$ 1.200</option>
            <option value="1800">Até R$ 1.800</option>
          </select>
        </label>
        <button className="button home-room-search-submit" type="submit">
          Buscar hospedagem <Search size={16} />
        </button>
      </form>
    </section>
  );
}

export function Home() {
  const { openBooking } = useBooking();

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
              onClick={() => openBooking()}
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
      <HomeRoomSearch />
      <section className="intro-section page-width" id="experiencia">
        <div className="intro-content">
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
              feita para quem quer sair do automático. Aqui, cada acomodação
              abre para um pedaço de natureza, cada refeição chega com gosto de
              litoral e cada tarde pode durar o quanto quiser.
            </p>
            <a
              href="#ritmo"
              className="text-link"
              data-testid="link-intro-ritmo"
            >
              Sinta o lugar <ArrowDownRight size={17} />
            </a>
          </div>
        </div>
        <StayVideoCoverflow />
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
            Ver toda a hospedagem <ArrowRight size={16} />
          </Link>
        </div>
        <div className="rooms-feature">
          <div className="room-feature-image">
            <img src={galleryOne} alt="Interior e área externa da pousada" />
            <span className="image-index">01 / 03</span>
          </div>
          <div className="room-feature-copy">
            <span className="room-type">Acomodação · para dois</span>
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
              Conhecer a hospedagem <ArrowRight size={16} />
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
            Conhecer a gastronomia <ArrowRight size={16} />
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
