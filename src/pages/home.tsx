import { Link, useLocation } from "wouter";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  ArrowDownRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minus,
  Plus,
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
import heroBackgroundImage from "@assets/pousada.png";
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
  const { t } = useTranslation();
  return (
    <Carousel
      slides={atmosphereSlides}
      ariaLabel={t("home.atmosphere.ariaLabel")}
      autoPlayInterval={2000}
      floatingTag={
        <div className="photo-tag">
          {t("home.atmosphere.photoTag")} <ArrowUpRightIcon />
        </div>
      }
      hint={t("home.atmosphere.hint")}
    />
  );
}

function FoodCarousel() {
  const { t } = useTranslation();
  return (
    <Carousel
      slides={foodSlides}
      ariaLabel={t("home.food.ariaLabel")}
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

const stayVideoAssets = [
  {
    titleKey: "video1Title",
    source: videoOne,
    poster: heroImage,
  },
  {
    titleKey: "video2Title",
    source: videoTwo,
    poster: galleryOne,
  },
  {
    titleKey: "video3Title",
    source: videoThree,
    poster: galleryTwo,
  },
];

function StayVideoCoverflow() {
  const { t } = useTranslation();
  const stayVideos = stayVideoAssets.map((video) => ({
    ...video,
    title: t(`home.stayVideos.${video.titleKey}`),
  }));
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

  const moveVideo = (direction: number) => {
    setActiveVideo(
      (current) =>
        (current + direction + stayVideos.length) % stayVideos.length,
    );
  };

  return (
    <div className="stay-video-coverflow" aria-label={t("home.stayVideos.ariaLabel")}>
      <div className="stay-video-coverflow-heading">
        <span>{t("home.stayVideos.watchClosely")}</span>
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
              aria-label={`${t("home.stayVideos.watch")}: ${video.title}`}
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
              {index !== activeVideo && <i>{t("home.stayVideos.select")}</i>}
              {index === activeVideo && (
                <button
                  type="button"
                  className="stay-video-expand"
                  onClick={(event) => {
                    event.stopPropagation();
                    setExpandedVideo(index);
                  }}
                  aria-label={`${t("home.stayVideos.expand")}: ${video.title}`}
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
            aria-label={t("home.stayVideos.previous")}
          >
            <ChevronLeft size={17} />
          </button>
          <div aria-label={t("home.stayVideos.selectVideo")}>
            {stayVideos.map((video, index) => (
              <button
                type="button"
                key={video.title}
                className={index === activeVideo ? "is-active" : ""}
                onClick={() => setActiveVideo(index)}
                aria-label={`${t("home.stayVideos.video")} ${index + 1}`}
                aria-current={index === activeVideo ? "true" : undefined}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={() => moveVideo(1)}
            aria-label={t("home.stayVideos.next")}
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
          aria-label={`${t("home.stayVideos.expanded")}: ${stayVideos[expandedVideo].title}`}
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
              aria-label={t("home.stayVideos.close")}
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
  const { t } = useTranslation();
  const [, setLocation] = useLocation();
  const [adults, setAdults] = useState("2");
  const [children, setChildren] = useState("0");
  const [mealPrice, setMealPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("2000");

  const updateGuestCount = (
    value: string,
    onChange: (nextValue: string) => void,
    direction: -1 | 1,
    minimum: number,
  ) => {
    const currentValue = Number(value);
    const nextValue = Number.isFinite(currentValue)
      ? currentValue + direction
      : minimum;
    onChange(String(Math.max(minimum, Math.min(20, nextValue))));
  };

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
      aria-label={t("home.search.ariaLabel")}
    >
      <form className="home-room-search-card" onSubmit={searchRooms}>
        <div className="home-room-search-intro">
          <span className="home-room-search-kicker">{t("home.search.kicker")}</span>
          <h2>
            {t("home.search.titleLine1")} <em>{t("home.search.titleHighlight")}</em>
          </h2>
          <p>{t("home.search.subtitle")}</p>
        </div>
        <div className="home-room-search-field">
          <label htmlFor="home-adults-input">{t("home.search.adults")}</label>
          <div className="home-room-search-stepper">
            <button
              type="button"
              className="home-room-search-stepper-button"
              onClick={() => updateGuestCount(adults, setAdults, -1, 1)}
              aria-label={t("home.search.decreaseAdults")}
            >
              <Minus size={14} />
            </button>
            <input
              id="home-adults-input"
              type="number"
              min="1"
              max="20"
              value={adults}
              onChange={(event) => setAdults(event.target.value)}
              aria-label={t("home.search.adultsLabel")}
              className="home-room-search-number"
            />
            <button
              type="button"
              className="home-room-search-stepper-button"
              onClick={() => updateGuestCount(adults, setAdults, 1, 1)}
              aria-label={t("home.search.increaseAdults")}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
        <div className="home-room-search-field">
          <label htmlFor="home-children-input">{t("home.search.children")}</label>
          <div className="home-room-search-stepper">
            <button
              type="button"
              className="home-room-search-stepper-button"
              onClick={() => updateGuestCount(children, setChildren, -1, 0)}
              aria-label={t("home.search.decreaseChildren")}
            >
              <Minus size={14} />
            </button>
            <input
              id="home-children-input"
              type="number"
              min="0"
              max="20"
              value={children}
              onChange={(event) => setChildren(event.target.value)}
              aria-label={t("home.search.childrenLabel")}
              className="home-room-search-number"
            />
            <button
              type="button"
              className="home-room-search-stepper-button"
              onClick={() => updateGuestCount(children, setChildren, 1, 0)}
              aria-label={t("home.search.increaseChildren")}
            >
              <Plus size={14} />
            </button>
          </div>
        </div>
        <label className="home-room-search-field">
          <span>{t("home.search.mealPrice")}</span>
          <select
            value={mealPrice}
            onChange={(event) => setMealPrice(event.target.value)}
            aria-label={t("home.search.mealAriaLabel")}
            title={
              mealPrice === "incluso"
                ? t("home.search.mealIncludedTitle")
                : mealPrice === "80"
                  ? t("home.search.mealHalfTitle")
                  : mealPrice === "150"
                    ? t("home.search.mealFullTitle")
                    : t("home.search.mealAny")
            }
          >
            <option value="">{t("home.search.mealAny")}</option>
            <option value="incluso">{t("home.search.mealIncluded")}</option>
            <option value="80">{t("home.search.mealHalf")}</option>
            <option value="150">{t("home.search.mealFull")}</option>
          </select>
        </label>
        <label className="home-room-search-field">
          <span>{t("home.search.maxPrice")}</span>
          <select
            value={maxPrice}
            onChange={(event) => setMaxPrice(event.target.value)}
            aria-label={t("home.search.maxPriceAriaLabel")}
          >
            <option value="2000">{t("home.search.maxPriceUnlimited")}</option>
            <option value="600">{t("home.search.maxPrice600")}</option>
            <option value="900">{t("home.search.maxPrice900")}</option>
            <option value="1200">{t("home.search.maxPrice1200")}</option>
            <option value="1800">{t("home.search.maxPrice1800")}</option>
          </select>
        </label>
        <button className="button home-room-search-submit" type="submit">
          {t("home.search.submit")} <Search size={16} />
        </button>
      </form>
    </section>
  );
}

export function Home() {
  const { openBooking } = useBooking();
  const { t } = useTranslation();

  return (
    <main>
      <section className="home-hero">
        <img
          src={heroBackgroundImage}
          alt="Lagoa de águas claras da Beira D’Água"
          className="hero-image"
        />
        <div className="hero-wash" />
        <div className="hero-content page-width">
          <p className="hero-overline">
            {t("home.hero.overline")} <span>·</span> {t("home.hero.overlineSuffix")}
          </p>
          <h1>
            {t("home.hero.titleLine1")}
            <br />
            <em>{t("home.hero.titleLine2")}</em>
          </h1>
          <p className="hero-copy">
            {t("home.hero.copy")}
          </p>
          <div className="hero-actions">
            <button
              className="button button-gold"
              onClick={() => openBooking()}
              data-testid="button-hero-reserva"
            >
              {t("home.hero.planStay")} <ArrowRight size={17} />
            </button>
            <a
              href="#experiencia"
              className="scroll-link"
              data-testid="link-hero-experiencia"
            >
              <span className="scroll-ring">
                <ArrowDownRight size={16} />
              </span>{" "}
              {t("home.hero.knowPousada")}
            </a>
          </div>
        </div>
        <div className="hero-aside">
          <span>01</span>
          <i />
          <span>03</span>
        </div>
        <div className="hero-caption">
          <Waves size={15} /> {t("home.hero.caption")}
        </div>
      </section>
      <HomeRoomSearch />
      <section className="intro-section page-width" id="experiencia">
        <div className="intro-content">
          <div className="intro-number">
            {t("home.intro.number")} <span>—</span> {t("home.intro.kicker")}
          </div>
          <div className="intro-copy">
            <h2>
              {t("home.intro.titleLine1")}
              <br />
              <em>{t("home.intro.titleHighlight")}</em>
            </h2>
            <p>
              {t("home.intro.copy")}
            </p>
            <a
              href="#ritmo"
              className="text-link"
              data-testid="link-intro-ritmo"
            >
              {t("home.intro.link")} <ArrowDownRight size={17} />
            </a>
          </div>
        </div>
        <StayVideoCoverflow />
      </section>
      <section className="atmosphere-section" id="ritmo">
        <AtmosphereCarousel />
        <div className="atmosphere-copy">
          <SectionLabel>{t("home.atmosphere.sectionLabel")}</SectionLabel>
          <h2>
            {t("home.atmosphere.titleLine1")}
            <br />
            <em>{t("home.atmosphere.titleLine2")}</em>
          </h2>
          <p>
            {t("home.atmosphere.copy")}
          </p>
          <div className="ritual-list">
            <div>
              <span>01</span>
              <p>
                <b>{t("home.atmosphere.item1Title")}</b>
                <br />
                {t("home.atmosphere.item1Copy")}
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <b>{t("home.atmosphere.item2Title")}</b>
                <br />
                {t("home.atmosphere.item2Copy")}
              </p>
            </div>
            <div>
              <span>03</span>
              <p>
                <b>{t("home.atmosphere.item3Title")}</b>
                <br />
                {t("home.atmosphere.item3Copy")}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="rooms-teaser page-width">
        <div className="teaser-heading">
          <div>
            <SectionLabel>{t("home.roomsTeaser.sectionLabel")}</SectionLabel>
            <h2>
              {t("home.roomsTeaser.titleLine1")}
              <br />
              <em>{t("home.roomsTeaser.titleHighlight")}</em>
            </h2>
          </div>
          <Link
            href="/quartos"
            className="text-link"
            data-testid="link-home-quartos"
          >
            {t("home.roomsTeaser.seeAll")} <ArrowRight size={16} />
          </Link>
        </div>
        <div className="rooms-feature">
          <div className="room-feature-image">
            <img src={galleryOne} alt="Interior e área externa da pousada" />
            <span className="image-index">01 / 03</span>
          </div>
          <div className="room-feature-copy">
            <span className="room-type">{t("home.roomsTeaser.roomType")}</span>
            <h3>
              {t("home.roomsTeaser.titleFeatureLine1")}
              <br />
              <em>{t("home.roomsTeaser.titleFeatureHighlight")}</em>
            </h3>
            <p>
              {t("home.roomsTeaser.copy")}
            </p>
            <Link
              href="/quartos"
              className="button button-dark"
              data-testid="button-conhecer-quarto"
            >
              {t("home.roomsTeaser.cta")} <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
      <section className="food-section">
        <div className="food-copy">
          <SectionLabel>{t("home.food.sectionLabel")}</SectionLabel>
          <h2>
            {t("home.food.titleLine1")}
            <br />
            <em>{t("home.food.titleHighlight")}</em>
          </h2>
          <p>
            {t("home.food.copy")}
          </p>
          <Link
            href="/cardapio"
            className="button button-outline-light"
            data-testid="button-home-cardapio"
          >
            {t("home.food.cta")} <ArrowRight size={16} />
          </Link>
        </div>
        <FoodCarousel />
      </section>
      <section className="park-teaser page-width">
        <div className="park-teaser-image">
          <img src={parkSlideTwo} alt="Área aquática com toboáguas e lagoa" />
          <div className="park-teaser-stamp">
            <Waves size={16} /> {t("home.park.stampLine1")}
            <br />
            <b>{t("home.park.stampLine2")}</b>
          </div>
        </div>
        <div className="park-teaser-copy">
          <div className="park-teaser-kicker">
            <Sparkles size={13} /> {t("home.park.kicker")}
          </div>
          <h2>
            {t("home.park.titleLine1")}
            <br />
            <em>{t("home.park.titleHighlight")}</em>
          </h2>
          <p>
            {t("home.park.copy")}
          </p>
          <Link
            href="/little-beach"
            className="button park-teaser-button"
            data-testid="button-home-little-beach"
          >
            {t("home.park.cta")} <ArrowRight size={16} />
          </Link>
        </div>
      </section>
      <section className="gallery-section page-width">
        <div className="gallery-intro">
          <SectionLabel>{t("home.gallery.sectionLabel")}</SectionLabel>
          <h2>
            {t("home.gallery.titleLine1")}
            <br />
            <em>{t("home.gallery.titleHighlight")}</em>
          </h2>
          <p>{t("home.gallery.copy")}</p>
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
              {t("home.gallery.detailLine1")}
              <br />
              {t("home.gallery.detailLine2")}
            </span>
          </div>
        </div>
      </section>
      <LocationCard />
      <ContactSection />
    </main>
  );
}
