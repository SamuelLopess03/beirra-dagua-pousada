import { useState } from "react";
import { Clock3, Utensils } from "lucide-react";
import { SectionLabel } from "@/components/layout/section-label";
import { menuCategories, menuItems, type MenuCategory } from "@/data/menu";
import plateImage from "@assets/image_1787066729847.png";
import seafoodImage from "@assets/image_1787066742218.png";

export function Cardapio() {
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
          {menuCategories.map((item) => (
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
                <div className="menu-item-content">
                  <div className="menu-item-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="menu-item-text">
                    <span className="menu-item-category">{item.category}</span>
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
