import { Link } from "wouter";
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
import { useState } from "react";
import type { Room } from "@/data/rooms";

function DetailIcon({ detail }: { detail: string }) {
  const normalizedDetail = detail.toLowerCase();

  if (normalizedDetail.includes("cama")) return <BedDouble size={16} />;
  if (normalizedDetail.includes("varanda")) return <Sun size={16} />;
  if (normalizedDetail.includes("vista")) return <Trees size={16} />;
  if (normalizedDetail.includes("sala")) return <Armchair size={16} />;
  return <Waves size={16} />;
}

function RoomGallery({ room, roomNumber }: { room: Room; roomNumber: number }) {
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
        alt={`${room.name} — imagem ${activeImage + 1}`}
      />
      <span className="room-card-index">0{roomNumber}</span>
      {imageCount > 1 && (
        <>
          <div className="room-gallery-arrows">
            <button
              type="button"
              onClick={() => moveImage(-1)}
              aria-label={`Imagem anterior de ${room.name}`}
            >
              <ArrowLeft size={15} />
            </button>
            <button
              type="button"
              onClick={() => moveImage(1)}
              aria-label={`Próxima imagem de ${room.name}`}
            >
              <ArrowRight size={15} />
            </button>
          </div>
          <div className="room-gallery-dots" aria-label="Imagens da acomodação">
            {room.gallery.map((_, index) => (
              <button
                type="button"
                key={index}
                className={index === activeImage ? "is-active" : ""}
                onClick={() => setActiveImage(index)}
                aria-label={`Ver imagem ${index + 1}`}
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
            Hospedagens com o essencial bem pensado, cercadas pelo verde e pelo
            barulho bom da água.
          </p>
        </div>
        <div className="page-hero-note">
          <span>02</span>
          <i />
          <span>
            hospedagens para
            <br />
            viver devagar
          </span>
        </div>
      </section>
      <section className="room-guide page-width">
        <div className="room-guide-intro">
          <span className="side-note">Acomodações</span>
          <p>
            Não existe acomodação melhor. Existe a acomodação que combina com o
            jeito que você quer descansar. Veja os nossos cantos e envie sua
            preferência — os valores são consultados caso a caso.
          </p>
        </div>

        <div className="room-results-toolbar">
          <div>
            <span className="room-results-kicker">Sua estadia</span>
            <strong>{filteredRooms.length} hospedagens encontradas</strong>
          </div>
          <div className="room-toolbar-actions">
            <span className="room-results-note">
              Valores por noite · consulte disponibilidade
            </span>
            <button
              type="button"
              className={`room-filter-toggle${filtersOpen ? " is-open" : ""}`}
              onClick={() => setFiltersOpen((open) => !open)}
              aria-expanded={filtersOpen}
              aria-controls="room-filter-panel"
            >
              <SlidersHorizontal size={15} />
              {filtersOpen ? "Fechar filtros" : "Filtrar hospedagens"}
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
            aria-label="Filtros de hospedagem"
            aria-hidden={!filtersOpen}
          >
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
            <button
              type="button"
              className="room-filter-close"
              onClick={() => setFiltersOpen(false)}
            >
              Fechar filtros
            </button>
            <div className="filter-search">
              <input
                type="text"
                placeholder="Buscar acomodação..."
                value={searchQuery}
                onChange={(e) => updateSearch(e.target.value)}
              />
            </div>

            <div className="filter-group">
              <span className="filter-title">Adultos:</span>
              <div className="filter-number-input">
                <button type="button" onClick={() => updateAdults(Math.max(0, adults - 1))}>-</button>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={adults}
                  onChange={(e) => updateAdults(Math.max(0, Number(e.target.value)))}
                  aria-label="Filtrar por quantidade de adultos"
                />
                <button type="button" onClick={() => updateAdults(Math.min(20, adults + 1))}>+</button>
              </div>
              {adults === 0 && <span className="filter-note">Sem filtro</span>}
            </div>

            <div className="filter-group">
              <span className="filter-title">Crianças:</span>
              <div className="filter-number-input">
                <button type="button" onClick={() => updateChildren(Math.max(0, children - 1))}>-</button>
                <input
                  type="number"
                  min="0"
                  max="20"
                  value={children}
                  onChange={(e) => updateChildren(Math.max(0, Number(e.target.value)))}
                  aria-label="Filtrar por quantidade de crianças"
                />
                <button type="button" onClick={() => updateChildren(Math.min(20, children + 1))}>+</button>
              </div>
            </div>

            <div className="filter-group">
              <span className="filter-title">Valor da Refeição:</span>
              <select
                value={mealPrice}
                onChange={(e) => updateMealPrice(e.target.value)}
                aria-label="Filtrar por valor ou tipo de refeição"
              >
                <option value="">Qualquer opção</option>
                <option value="incluso">Café incluso (R$ 0)</option>
                <option value="80">Meia pensão (R$ 80 / pessoa)</option>
                <option value="150">Pensão completa (R$ 150 / pessoa)</option>
              </select>
            </div>

            <div className="filter-group">
              <span className="filter-title">Capacidade da Acomodação:</span>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCapacities.includes(2)}
                  onChange={() => toggleCapacity(2)}
                />{" "}
                Até 2 pessoas
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={selectedCapacities.includes(4)}
                  onChange={() => toggleCapacity(4)}
                />{" "}
                Até 4 pessoas
              </label>
            </div>

            <div className="filter-group">
              <span className="filter-title">Refeições inclusas:</span>
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
              <span className="filter-title">Valor máx por diária (R$ {maxPrice}):</span>
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
                Nenhuma hospedagem encontrada com esses critérios. Tente limpar
                os filtros.
              </div>
            ) : (
              <div className="room-list">
                {visibleRooms.map((room, index) => (
                  <article
                    className="room-card"
                    key={room.name}
                    data-testid={`card-quarto-${page * ROOMS_PER_PAGE + index}`}
                  >
                    <RoomGallery
                      room={room}
                      roomNumber={page * ROOMS_PER_PAGE + index + 1}
                    />
                    <div className="room-card-body">
                      <div className="room-card-top">
                        <span className="room-type">{room.type}</span>
                        <span className="room-number">
                          acomodação {page * ROOMS_PER_PAGE + index + 1}
                        </span>
                      </div>
                      <h2>{room.name}</h2>
                      <p>{room.desc}</p>
                      <div className="room-details">
                        {room.details.map((detail) => (
                          <span key={detail}>
                            <DetailIcon detail={detail} /> {detail}
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
                  aria-label="Hospedagens anteriores"
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
                  aria-label="Próximas hospedagens"
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
            onClick={() => openBooking()}
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
