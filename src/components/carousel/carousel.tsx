import type { ReactNode } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarousel } from "@/hooks/use-carousel";

export type CarouselSlide = {
  image: string;
  alt: string;
};

type CarouselProps<T extends CarouselSlide> = {
  slides: T[];
  ariaLabel: string;
  autoPlayInterval?: number;
  className?: string;
  /** Conteúdo extra renderizado sobre cada slide (ex.: legenda). */
  renderSlideOverlay?: (slide: T) => ReactNode;
  /** Elemento flutuante entre a trilha e os controles (ex.: "photo-tag"). */
  floatingTag?: ReactNode;
  /** Texto de dica exibido abaixo dos controles. */
  hint?: string;
};

export function Carousel<T extends CarouselSlide>({
  slides,
  ariaLabel,
  autoPlayInterval = 0,
  className = "",
  renderSlideOverlay,
  floatingTag,
  hint,
}: CarouselProps<T>) {
  const {
    trackRef,
    activeSlide,
    updateActiveSlide,
    goToSlide,
    goToPrevious,
    goToNext,
  } = useCarousel({ slideCount: slides.length, autoPlayInterval });

  return (
    <div className={`atmosphere-carousel ${className}`.trim()}>
      <div
        ref={trackRef}
        className="atmosphere-carousel-track"
        onScroll={updateActiveSlide}
        onKeyDown={(event) => {
          if (event.key === "ArrowRight")
            goToSlide(Math.min(slides.length - 1, activeSlide + 1));
          if (event.key === "ArrowLeft")
            goToSlide(Math.max(0, activeSlide - 1));
        }}
        tabIndex={0}
        aria-label={ariaLabel}
      >
        {slides.map((slide, index) => (
          <div
            className={`atmosphere-slide ${index === activeSlide ? "is-active" : ""}`}
            key={slide.alt}
          >
            <img src={slide.image} alt={slide.alt} />
            {renderSlideOverlay?.(slide)}
          </div>
        ))}
      </div>
      {floatingTag}
      <div
        className="atmosphere-carousel-controls"
        style={renderSlideOverlay ? { zIndex: 10 } : undefined}
      >
        <div className="atmosphere-carousel-dots" aria-label="Escolher imagem">
          {slides.map((slide, index) => (
            <button
              key={slide.alt}
              className={index === activeSlide ? "is-active" : ""}
              onClick={() => goToSlide(index, true)}
              aria-label={`Ir para imagem ${index + 1}`}
              aria-current={index === activeSlide ? "true" : undefined}
            />
          ))}
        </div>
        <div className="atmosphere-carousel-arrows">
          <button
            onClick={() => goToPrevious(true)}
            aria-label="Imagem anterior"
          >
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => goToNext(true)} aria-label="Próxima imagem">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>
      {hint && <span className="atmosphere-carousel-hint">{hint}</span>}
    </div>
  );
}
