import { Link, useLocation } from "wouter";
import { useState } from "react";
import {
  ArrowDownRight,
  ArrowRight,
  Search,
  Sparkles,
  Waves,
} from "lucide-react";
import { SectionLabel } from "@/components/layout/section-label";
import { ContactSection } from "@/components/contact-section";
import { LocationCard } from "@/components/location-card";
import { Carousel } from "@/components/carousel/carousel";
import { useBooking } from "@/hooks/booking-context";
import { atmosphereSlides, foodSlides } from "@/data/slides";
import heroImage from "@assets/img_hero.jpeg";
import galleryOne from "@assets/image_1787066780463.png";
import galleryTwo from "@assets/image_1787066829752.png";
import parkSlideTwo from "@assets/image_1787137489426.png";

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

function HomeRoomSearch() {
  const [, setLocation] = useLocation();
  const [capacity, setCapacity] = useState("");
  const [meal, setMeal] = useState("");
  const [maxPrice, setMaxPrice] = useState("2000");

  const searchRooms = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams();

    if (capacity) params.set("capacity", capacity);
    if (meal) params.set("meal", meal);
    if (maxPrice !== "2000") params.set("maxPrice", maxPrice);

    const query = params.toString();
    setLocation(query ? `/quartos?${query}` : "/quartos");
  };

  return (
    <section
      className="home-room-search page-width"
      aria-label="Buscar quartos"
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
          <span>Pessoas</span>
          <select
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
            aria-label="Quantidade de pessoas"
          >
            <option value="">Qualquer quantidade</option>
            <option value="2">2 pessoas</option>
            <option value="4">Até 4 pessoas</option>
          </select>
        </label>
        <label className="home-room-search-field">
          <span>Refeições</span>
          <select
            value={meal}
            onChange={(event) => setMeal(event.target.value)}
            aria-label="Preferência de refeições"
          >
            <option value="">Qualquer opção</option>
            <option value="Café da manhã">Café da manhã</option>
            <option value="Meia pensão">Meia pensão</option>
            <option value="Pensão completa">Pensão completa</option>
          </select>
        </label>
        <label className="home-room-search-field">
          <span>Valor máximo</span>
          <select
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            aria-label="Valor máximo por noite"
          >
            <option value="2000">Sem limite</option>
            <option value="600">Até R$ 600</option>
            <option value="900">Até R$ 900</option>
            <option value="1200">Até R$ 1.200</option>
          </select>
        </label>
        <button className="button home-room-search-submit" type="submit">
          Buscar quartos <Search size={16} />
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
