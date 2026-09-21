import { Link } from "wouter";
import { useTranslation } from "react-i18next";
import {
  Armchair,
  ArrowLeft,
  ArrowRight,
  BedDouble,
  SlidersHorizontal,
  Sun,
  Trees,
  Waves,
} from "lucide-react";
import { SectionLabel } from "@/components/layout/section-label";
import { useRoomFilters } from "@/hooks/use-room-filters";
import { useBooking } from "@/hooks/booking-context";
import { useRef, useState } from "react";
import type { Room, RoomDetailKey } from "@/data/rooms";

const detailIcons: Record<RoomDetailKey, typeof Waves> = {
  queenBed: BedDouble,
  kingBed: BedDouble,
  privateBalcony: Sun,
  largeBalcony: Sun,
  hammockBalcony: Sun,
  gardenView: Trees,
  lagoonView: Trees,
  livingRoom: Armchair,
  twoRooms: Waves,
  lagoonAccess: Waves,
  supportKitchen: Waves,
};

function DetailIcon({ detailKey }: { detailKey: RoomDetailKey }) {
  const Icon = detailIcons[detailKey] ?? Waves;
  return <Icon size={16} />;
}

function RoomGallery({ room, roomNumber, roomName }: { room: Room; roomNumber: number; roomName: string }) {
  const { t } = useTranslation();
  const [activeImage, setActiveImage] = useState(0);
  const imageCount = room.gallery.length;

  const moveImage = (direction: number) => {
    setActiveImage(
      (current) => (current + direction + imageCount) % imageCount,
    );
  };

  return (
    <div className="room-card-image">
      <img
        src={room.gallery[activeImage]}
        alt={`${roomName} — imagem ${activeImage + 1}`}
      />
      <span className="room-card-index">0{roomNumber}</span>
      {imageCount > 1 && (
        <>
          <div className="room-gallery-arrows">
            <button
              type="button"
              onClick={() => moveImage(-1)}
              aria-label={t("quartosPage.previousImage", { name: roomName })}
            >
              <ArrowLeft size={15} />
            </button>
            <button
              type="button"
              onClick={() => moveImage(1)}
              aria-label={t("quartosPage.nextImage", { name: roomName })}
            >
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="room-gallery-dots" aria-label={t("quartosPage.galleryAriaLabel")}>
            {room.gallery.map((_, index) => (
              <button
                type="button"
                key={index}
                className={index === activeImage ? "is-active" : ""}
                onClick={() => setActiveImage(index)}
                aria-label={t("quartosPage.viewImage", { number: index + 1 })}
                aria-current={index === activeImage ? "true" : undefined}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export function Quartos() {
  const { t } = useTranslation();
  const { openBooking } = useBooking();
  const {
    page,
    setPage,
    roomsPerPage: ROOMS_PER_PAGE,
    searchQuery,
    updateSearch,
    adults,
    updateAdults,
    children,
    updateChildren,
    mealPrice,
    updateMealPrice,
    selectedCapacities,
    toggleCapacity,
    selectedMeals,
    toggleMeal,
    maxPrice,
    updateMaxPrice,
    filteredRooms,
    visibleRooms,
    totalPages,
    activeFilterCount,
    clearFilters,
  } = useRoomFilters();
  const [filtersOpen, setFiltersOpen] = useState(activeFilterCount > 0);
  const resultsTopRef = useRef<HTMLDivElement>(null);

  const goToPage = (next: number) => {
    setPage(next);
    // Ao paginar, leva ao início da exibição dos quartos em vez de
    // manter o scroll lá embaixo na paginação.
    requestAnimationFrame(() => {
      const anchor = resultsTopRef.current;
      if (!anchor) return;
      const top =
        anchor.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  };

  return (
    <main className="inner-page">
      <section className="page-hero page-width">
        <div>
          <SectionLabel>{t("quartosPage.eyebrow")}</SectionLabel>
          <h1>
            {t("quartosPage.titleLine1")}
            <br />
            <em>{t("quartosPage.titleHighlight")}</em>
          </h1>
          <p>
            {t("quartosPage.heroCopy")}
          </p>
        </div>
        <div className="page-hero-note">
          <span>{t("quartosPage.heroNoteNumber")}</span>
          <i />
          <span>
            {t("quartosPage.heroNoteLine1")}
            <br />
            {t("quartosPage.heroNoteLine2")}
          </span>
        </div>
      </section>
      <section className="room-guide page-width">
        <div className="room-guide-intro">
          <span className="side-note">{t("quartosPage.guideKicker")}</span>
          <p>
            {t("quartosPage.guideCopy")}
          </p>
        </div>

        <div className="room-results-toolbar" ref={resultsTopRef}>
          <div>
            <span className="room-results-kicker">{t("quartosPage.resultsKicker")}</span>
            <strong>{t("quartosPage.resultsFound", { count: filteredRooms.length })}</strong>
          </div>
          <div className="room-toolbar-actions">
            <span className="room-results-note">
              {t("quartosPage.resultsNote")}
            </span>
            <button
              type="button"
              className={`room-filter-toggle${filtersOpen ? " is-open" : ""}`}
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-controls="room-filter-panel"
            >
              <SlidersHorizontal size={15} />
              {filtersOpen ? t("quartosPage.closeFilters") : t("quartosPage.openFilters")}
              {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
            </button>
          </div>
        </div>

        <div
          className={`room-results-layout${filtersOpen ? "" : " filters-closed"}`}
        >
          <aside
            className="room-filter-panel"
            id="room-filter-panel"
            aria-label={t("quartosPage.filtersAriaLabel")}
            aria-hidden={!filtersOpen}
          >
            <div className="room-filter-heading">
              <div>
                <SlidersHorizontal size={16} />
                <strong>{t("quartosPage.filterHeading")}</strong>
                {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
              </div>
              {activeFilterCount > 0 && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="clear-filters"
                >
                  {t("quartosPage.clear")}
                </button>
              )}
            </div>
            <button
              type="button"
              className="room-filter-close"
              onClick={() => setFiltersOpen(false)}
            >
              {t("quartosPage.closeFilters")}
            </button>
            <div className="filter-search">
              <input
                type="text"
                placeholder={t("quartosPage.searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => updateSearch(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <span className="filter-title">{t("quartosPage.adultsLabel")}</span>
              <div className="filter-number-input">
                <button type="button" onClick={() => updateAdults(Math.max(0, adults - 1))}>-</button>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={adults}
                  onChange={(e) => updateAdults(Math.max(0, Number(e.target.value)))}
                  aria-label={t("quartosPage.adultsAriaLabel")}
                />
                <button type="button" onClick={() => updateAdults(Math.min(20, adults + 1))}>+</button>
              </div>
              {adults === 0 && <span className="filter-note">{t("quartosPage.noFilter")}</span>}
            </div>

            <div className="filter-group">
              <span className="filter-title">{t("quartosPage.childrenLabel")}</span>
              <div className="filter-number-input">
                <button type="button" onClick={() => updateChildren(Math.max(0, children - 1))}>-</button>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={children}
                  onChange={(e) => updateChildren(Math.max(0, Number(e.target.value)))}
                  aria-label={t("quartosPage.childrenAriaLabel")}
                />
                <button type="button" onClick={() => updateChildren(Math.min(20, children + 1))}>+</button>
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-title">{t("quartosPage.mealPriceLabel")}</span>
              <select
                value={mealPrice}
                onChange={(e) => updateMealPrice(e.target.value)}
                aria-label={t("quartosPage.mealPriceAriaLabel")}
              >
                <option value="">{t("quartosPage.mealAny")}</option>
                <option value="incluso">{t("quartosPage.mealIncluded")}</option>
                <option value="80">{t("quartosPage.mealHalf")}</option>
                <option value="150">{t("quartosPage.mealFull")}</option>
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-title">{t("quartosPage.capacityLabel")}</span>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCapacities.includes(2)}
                  onChange={() => toggleCapacity(2)}
                />{" "}
                {t("quartosPage.capacity2")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCapacities.includes(4)}
                  onChange={() => toggleCapacity(4)}
                />{" "}
                {t("quartosPage.capacity4")}
              </label>
            </div>

            <div className="filter-group">
              <span className="filter-title">{t("quartosPage.mealsIncludedLabel")}</span>
              <label>
                <input
                  type="checkbox"
                  checked={selectedMeals.includes("breakfast")}
                  onChange={() => toggleMeal("breakfast")}
                />{" "}
                {t("mealPlans.breakfast")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedMeals.includes("halfBoard")}
                  onChange={() => toggleMeal("halfBoard")}
                />{" "}
                {t("mealPlans.halfBoard")}
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedMeals.includes("fullBoard")}
                  onChange={() => toggleMeal("fullBoard")}
                />{" "}
                {t("mealPlans.fullBoard")}
              </label>
            </div>

            <div className="filter-group">
              <span className="filter-title">{t("quartosPage.maxPriceLabel", { price: maxPrice })}</span>
              <input
                type="range"
                min="300"
                max="2000"
                step="50"
                value={maxPrice}
                onChange={(e) => updateMaxPrice(Number(e.target.value))}
              />
            </div>
          </aside>

          <div className="room-results">
            {filteredRooms.length === 0 ? (
              <div className="room-empty-state">
                {t("quartosPage.emptyState")}
              </div>
            ) : (
              <div className="room-list">
                {visibleRooms.map((room, index) => {
                  const roomName = t(`rooms.items.${room.slug}.name`);
                  return (
                    <article
                      className="room-card"
                      key={room.slug}
                      data-testid={`card-quarto-${page * ROOMS_PER_PAGE + index}`}
                    >
                      <RoomGallery
                        room={room}
                        roomNumber={page * ROOMS_PER_PAGE + index + 1}
                        roomName={roomName}
                      />
                      <div className="room-card-body">
                        <div className="room-card-top">
                          <span className="room-type">{t(`rooms.items.${room.slug}.type`)}</span>
                          <span className="room-number">
                            {t("quartosPage.accommodationLabel", { number: page * ROOMS_PER_PAGE + index + 1 })}
                          </span>
                        </div>
                        <h2>{roomName}</h2>
                        <p>{t(`rooms.items.${room.slug}.desc`)}</p>
                        <div className="room-details">
                          {room.detailKeys.map((detailKey) => (
                            <span key={detailKey}>
                              <DetailIcon detailKey={detailKey} /> {t(`roomDetails.${detailKey}`)}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="room-card-price">
                        <span className="room-price-label">{t("quartosPage.fromPrice")}</span>
                        <strong>R$ {room.price.toLocaleString("pt-BR")}</strong>
                        <span className="room-price-period">{t("quartosPage.perNight")}</span>
                        <small>{t(`mealPlans.${room.mealKeys[0]}`)} {t("quartosPage.included")}</small>
                        <Link
                          href={`/quartos/${room.slug}`}
                          className="button button-dark"
                          data-testid={`button-reservar-quarto-${page * ROOMS_PER_PAGE + index}`}
                        >
                          {t("quartosPage.consult")} <ArrowRight size={15} />
                        </Link>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
            {totalPages > 1 && (
              <div className="room-pagination" data-testid="pagination-quartos">
                <button
                  className="room-pagination-btn"
                  onClick={() => goToPage(Math.max(0, page - 1))}
                  disabled={page === 0}
                  aria-label={t("quartosPage.previousRooms")}
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
                    onClick={() => goToPage(i)}
                    aria-label={t("quartosPage.pageLabel", { number: i + 1 })}
                    aria-current={i === page ? "page" : undefined}
                  />
                ))}
                <button
                  className="room-pagination-btn"
                  onClick={() =>
                    goToPage(Math.min(totalPages - 1, page + 1))
                  }
                  disabled={page === totalPages - 1}
                  aria-label={t("quartosPage.nextRooms")}
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
            <span className="section-label">{t("quartosPage.stillInDoubt")}</span>
            <h2>
              {t("quartosPage.bottomTitleLine1")}
              <br />
              <em>{t("quartosPage.bottomTitleHighlight")}</em>
            </h2>
          </div>
          <button
            onClick={() => openBooking()}
            className="button button-dark"
            data-testid="button-quartos-cta"
          >
            {t("quartosPage.sendPreference")} <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
