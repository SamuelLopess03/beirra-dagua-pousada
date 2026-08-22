import { Link } from "wouter";
import { ArrowRight, Check, SlidersHorizontal } from "lucide-react";
import { SectionLabel } from "@/components/layout/section-label";
import { useRoomFilters } from "@/hooks/use-room-filters";
import { useBooking } from "@/hooks/use-booking";

export function Quartos() {
  const { openBooking } = useBooking();
  const {
    page,
    setPage,
    roomsPerPage: ROOMS_PER_PAGE,
    searchQuery,
    updateSearch,
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
                onChange={(e) => updateSearch(e.target.value)}
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
                onChange={(e) => updateMaxPrice(Number(e.target.value))}
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
            onClick={openBooking}
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
