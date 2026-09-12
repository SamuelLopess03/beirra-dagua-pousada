import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const { openBooking } = useBooking();
  const [activeSlide, setActiveSlide] = useState(0);
  const [packagesOpen, setPackagesOpen] = useState(false);
  const [selectedPackageId, setSelectedPackageId] = useState<string>();
  const slide = parkSlides[activeSlide];
  const slideLabel = t(`parkAttractions.${slide.key}Label`);
  const slideTitle = t(`parkAttractions.${slide.key}Title`);
  const slideDescription = t(`parkAttractions.${slide.key}Description`);

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
              <Sparkles size={14} /> {t("littleBeachPage.kicker")}
            </div>
            <h1>
              {t("littleBeachPage.titleLine1")}
              <br />
              <em>{t("littleBeachPage.titleHighlight")}</em>
            </h1>
            <p>
              {t("littleBeachPage.heroCopy")}
            </p>
            <div className="park-hero-actions">
              <a href="#atracoes" className="park-button park-button-orange">
                {t("littleBeachPage.exploreAttractions")} <ArrowDownRight size={17} />
              </a>
              <div className="park-hero-secondary-actions">
                <button
                  className="park-text-link park-packages-link"
                  onClick={() => setPackagesOpen(true)}
                  data-testid="button-ver-pacotes-hero"
                >
                  {t("littleBeachPage.viewPackages")} <Ticket size={15} />
                </button>
              </div>
            </div>
          </div>
          <div className="park-hero-badge">
            <Sun size={25} />
            <strong>
              {t("littleBeachPage.modeLine1")}
              <br />
              {t("littleBeachPage.modeLine2")}
            </strong>
            <span>{t("littleBeachPage.modeOn")}</span>
          </div>
        </div>
        <div className="park-hero-wave" />
      </section>

      <TicketSearchCard />

      <section className="park-intro page-width">
        <div className="park-intro-copy">
          <span className="park-label">{t("littleBeachPage.introKicker")}</span>
          <h2>
            {t("littleBeachPage.introTitleLine1")}<br />
            <em>{t("littleBeachPage.introTitleHighlight")}</em>
          </h2>
          <p>
            {t("littleBeachPage.introCopy")}
          </p>
        </div>
        <div className="park-intro-aside">
          <div className="park-sticker">
            <Zap size={19} />
            <span>
              {t("littleBeachPage.stickerLine1")}
              <br />
              <b>{t("littleBeachPage.stickerLine2")}</b>
              <br />
              {t("littleBeachPage.stickerLine3")}
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
            alt={slideTitle}
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
              aria-label={t("littleBeachPage.previousAttraction")}
            >
              <ChevronLeft size={19} />
            </button>
            <div className="park-dots">
              {parkSlides.map((item, index) => (
                <button
                  key={item.key}
                  className={activeSlide === index ? "is-active" : ""}
                  onClick={() => setActiveSlide(index)}
                  aria-label={t("littleBeachPage.viewAttraction", { label: t(`parkAttractions.${item.key}Label`) })}
                />
              ))}
            </div>
            <button
              onClick={() =>
                setActiveSlide((activeSlide + 1) % parkSlides.length)
              }
              aria-label={t("littleBeachPage.nextAttraction")}
            >
              <ChevronRight size={19} />
            </button>
          </div>
        </div>
        <div className="park-showcase-copy">
          <span className="park-label">{slideLabel}</span>
          <h2>{slideTitle}</h2>
          <p>{slideDescription}</p>
          <div className="park-progress">
            <span
              style={{ width: `${((activeSlide + 1) / parkSlides.length) * 100}%` }}
            />
          </div>
          <span className="park-swipe-note">
            {t("littleBeachPage.swipeNote")} <ArrowRight size={14} />
          </span>
        </div>
      </section>

      <section className="park-highlights page-width">
        <div className="park-highlights-heading">
          <span className="park-label">{t("littleBeachPage.whyJoinKicker")}</span>
          <h2>
            {t("littleBeachPage.whyJoinTitleLine1")}
            <br />
            <em>{t("littleBeachPage.whyJoinTitleHighlight")}</em>
          </h2>
        </div>
        <div className="park-highlight-grid">
          <article>
            <div className="park-icon">
              <Waves size={21} />
            </div>
            <h3>{t("littleBeachPage.highlight1Title")}</h3>
            <p>{t("littleBeachPage.highlight1Copy")}</p>
          </article>
          <article>
            <div className="park-icon">
              <Zap size={21} />
            </div>
            <h3>{t("littleBeachPage.highlight2Title")}</h3>
            <p>
              {t("littleBeachPage.highlight2Copy")}
            </p>
          </article>
          <article>
            <div className="park-icon">
              <ShieldCheck size={21} />
            </div>
            <h3>{t("littleBeachPage.highlight3Title")}</h3>
            <p>
              {t("littleBeachPage.highlight3Copy")}
            </p>
          </article>
        </div>
      </section>

      <section className="park-cta">
        <div className="park-cta-sun" />
        <div className="page-width park-cta-inner">
          <div>
            <span className="park-label">{t("littleBeachPage.nextSplashKicker")}</span>
            <h2>
              {t("littleBeachPage.nextSplashTitleLine1")}
              <br />
              <em>{t("littleBeachPage.nextSplashTitleHighlight")}</em>
            </h2>
          </div>
          <button
            className="park-button park-button-blue"
            onClick={() => openBooking()}
          >
            {t("littleBeachPage.consultStay")} <ArrowRight size={17} />
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
