import { useCallback, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Clock3, Utensils } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionLabel } from "@/components/layout/section-label";
import { useBooking } from "@/hooks/booking-context";
import { menuCategoryKeys, menuItems, type MenuCategoryKey } from "@/data/menu";
import plateImage from "@assets/grilled-meal.png";
import seafoodImage from "@assets/seafood-platter.png";

const ITEMS_PER_PAGE = 5;

export function Cardapio() {
  const { t } = useTranslation();
  const { openBooking } = useBooking();
  const [category, setCategory] = useState<MenuCategoryKey>("all");
  const [page, setPage] = useState(0);
  const listTopRef = useRef<HTMLElement>(null);
  const filtered = useMemo(
    () =>
      category === "all"
        ? menuItems
        : menuItems.filter((item) => item.categoryKey === category),
    [category],
  );
  const totalPages = useMemo(
    () => Math.ceil(filtered.length / ITEMS_PER_PAGE),
    [filtered],
  );
  const visibleItems = useMemo(
    () =>
      filtered.slice(page * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE + ITEMS_PER_PAGE),
    [filtered, page],
  );

  const selectCategory = useCallback((nextCategory: MenuCategoryKey) => {
    setCategory(nextCategory);
    setPage(0);
  }, []);

  const selectPage = useCallback((nextPage: number) => {
    setPage(Math.max(0, Math.min(nextPage, totalPages - 1)));
    // Ao paginar, volta ao início da listagem dos pratos em vez de
    // manter o scroll lá embaixo na paginação.
    requestAnimationFrame(() => {
      const anchor = listTopRef.current;
      if (!anchor) return;
      const top = anchor.getBoundingClientRect().top + window.scrollY - 96;
      window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
    });
  }, [totalPages]);

  return (
    <main className="inner-page menu-page">
      <section className="menu-hero page-width">
        <div className="menu-hero-copy">
          <SectionLabel>{t("cardapioPage.eyebrow")}</SectionLabel>
          <h1>
            {t("cardapioPage.titleLine1")}
            <br />
            <em>{t("cardapioPage.titleHighlight")}</em>
          </h1>
          <p>
            {t("cardapioPage.heroCopy")}
          </p>
        </div>
        <div className="menu-hero-image">
          <img src={plateImage} alt={t("cardapioPage.heroImageAlt")} />
          <span>{t("cardapioPage.heroImageLabel")}</span>
        </div>
      </section>
      <section className="menu-introduction page-width">
        <div className="menu-intro-statement">
          <span className="side-note">{t("cardapioPage.introKicker")}</span>
          <h2>
            {t("cardapioPage.introTitleLine1")}
            <br />
            <em>{t("cardapioPage.introTitleHighlight")}</em>
          </h2>
        </div>
        <div>
          <p>
            {t("cardapioPage.introCopy")}
          </p>
          <div className="service-note">
            <Clock3 size={16} />
            <span>
              {t("cardapioPage.serviceLine1")}
              <br />
              <b>{t("cardapioPage.serviceLine2")}</b>
            </span>
          </div>
        </div>
      </section>
      <section className="menu-listing page-width" id="lista-pratos" ref={listTopRef}>
        <div
          className="category-tabs"
          role="tablist"
          aria-label={t("cardapioPage.categoriesAriaLabel")}
        >
          {menuCategoryKeys.map((key) => (
            <button
              key={key}
              className={category === key ? "is-selected" : ""}
              onClick={() => selectCategory(key)}
              role="tab"
              aria-selected={category === key}
              data-testid={`button-categoria-${key}`}
            >
              {t(`menuCategories.${key}`)}
            </button>
          ))}
        </div>
        {filtered.length ? (
          <>
            <div className="menu-items">
              {visibleItems.map((item, index) => (
                <article
                  className="menu-item"
                  key={item.id}
                  data-testid={`item-cardapio-${page * ITEMS_PER_PAGE + index}`}
                >
                  <div className="menu-item-content">
                    <div className="menu-item-image">
                      <img src={item.image} alt={t(`menu.items.${item.id}.name`)} />
                    </div>
                    <div className="menu-item-text">
                      <span className="menu-item-category">
                        {t(`menuCategories.${item.categoryKey}`)}
                      </span>
                      <h3>
                        {t(`menu.items.${item.id}.name`)}
                        {item.hasMark && <small>{t(`menu.items.${item.id}.mark`)}</small>}
                      </h3>
                      <p>{t(`menu.items.${item.id}.description`)}</p>
                    </div>
                  </div>
                  <span className="menu-item-line" />
                </article>
              ))}
            </div>
            {totalPages > 1 && (
              <nav
                className="menu-pagination"
                aria-label={t("cardapioPage.paginationAriaLabel")}
              >
                <button
                  type="button"
                  className="menu-pagination-arrow"
                  onClick={() => selectPage(page - 1)}
                  disabled={page === 0}
                  aria-label={t("cardapioPage.previousDishes")}
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
                      aria-label={t("cardapioPage.pageLabel", { number: index + 1 })}
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
                  aria-label={t("cardapioPage.nextDishes")}
                >
                  <ArrowRight size={16} />
                </button>
                <span className="menu-pagination-label">
                  {t("cardapioPage.resultsRange", {
                    from: page * ITEMS_PER_PAGE + 1,
                    to: Math.min((page + 1) * ITEMS_PER_PAGE, filtered.length),
                    total: filtered.length,
                  })}
                </span>
              </nav>
            )}
          </>
        ) : (
          <div className="menu-empty" data-testid="empty-cardapio">
            <Utensils size={22} />
            <h3>{t("cardapioPage.emptyTitle")}</h3>
            <p>
              {t("cardapioPage.emptyCopy")}
            </p>
          </div>
        )}
      </section>
      <section className="menu-image-break">
        <img src={seafoodImage} alt={t("cardapioPage.breakImageAlt")} />
        <div>
          <div className="menu-image-break-copy">
            <span>{t("cardapioPage.breakKicker")}</span>
            <h2>
              {t("cardapioPage.breakTitleLine1")}
              <br />
              <em>{t("cardapioPage.breakTitleHighlight")}</em>
            </h2>
          </div>
          <button
            type="button"
            className="button menu-image-break-cta"
            onClick={() => openBooking()}
            data-testid="button-cardapio-cta"
          >
            {t("cardapioPage.sendPreference")} <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
