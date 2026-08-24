import { useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, Utensils } from "lucide-react";
import { SectionLabel } from "@/components/layout/section-label";
import { useBooking } from "@/hooks/booking-context";
import { menuCategories, menuItems, type MenuCategory } from "@/data/menu";
import plateImage from "@assets/grilled-meal.png";
import seafoodImage from "@assets/seafood-platter.png";

export function Cardapio() {
  const { openBooking } = useBooking();
  const [category, setCategory] = useState<MenuCategory>("Tudo");
  const [page, setPage] = useState(0);
  const ITEMS_PER_PAGE = 5;
  const filtered =
    category === "Tudo"
      ? menuItems
      : menuItems.filter((item) => item.category === category);
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const visibleItems = filtered.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE,
  );

  const selectCategory = (nextCategory: MenuCategory) => {
    setCategory(nextCategory);
    setPage(0);
  };

  const selectPage = (nextPage: number) => {
    setPage(Math.max(0, Math.min(nextPage, totalPages - 1)));
  };

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
            A gente cozinha com o que encontra de bonito e fresco. A gastronomia
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
      <section className="menu-listing page-width" id="lista-pratos">
        <div
          className="category-tabs"
          role="tablist"
          aria-label="Categorias da gastronomia"
        >
          {menuCategories.map((item) => (
            <button
              key={item}
              className={category === item ? "is-selected" : ""}
              onClick={() => selectCategory(item)}
              role="tab"
              aria-selected={category === item}
              data-testid={`button-categoria-${item.toLowerCase().replaceAll(" ", "-")}`}
            >
              {item}
            </button>
          ))}
        </div>
        {filtered.length ? (
          <>
            <div className="menu-items">
              {visibleItems.map((item, index) => (
                <article
                  className="menu-item"
                  key={item.name}
                  data-testid={`item-cardapio-${page * ITEMS_PER_PAGE + index}`}
                >
                  <div className="menu-item-content">
                    <div className="menu-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="menu-item-text">
                      <span className="menu-item-category">
                        {item.category}
                      </span>
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
            {totalPages > 1 && (
              <nav
                className="menu-pagination"
                aria-label="Paginação da gastronomia"
              >
                <button
                  type="button"
                  className="menu-pagination-arrow"
                  onClick={() => selectPage(page - 1)}
                  disabled={page === 0}
                  aria-label="Pratos anteriores"
                >
                  <ArrowLeft size={16} />
                </button>
                <div className="menu-pagination-pages">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      type="button"
                      key={index}
                      className={index === page ? "is-active" : ""}
                      onClick={() => selectPage(index)}
                      aria-label={`Página ${index + 1}`}
                      aria-current={index === page ? "page" : undefined}
                    >
                      0{index + 1}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  className="menu-pagination-arrow"
                  onClick={() => selectPage(page + 1)}
                  disabled={page === totalPages - 1}
                  aria-label="Próximos pratos"
                >
                  <ArrowRight size={16} />
                </button>
                <span className="menu-pagination-label">
                  {page * ITEMS_PER_PAGE + 1}–
                  {Math.min((page + 1) * ITEMS_PER_PAGE, filtered.length)} de{" "}
                  {filtered.length} pratos
                </span>
              </nav>
            )}
          </>
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
          <div className="menu-image-break-copy">
            <span>Da nossa cozinha</span>
            <h2>
              O melhor tempero
              <br />
              <em>é ficar.</em>
            </h2>
          </div>
          <button
            type="button"
            className="button menu-image-break-cta"
            onClick={() => openBooking()}
            data-testid="button-cardapio-cta"
          >
            Enviar minha preferência <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
