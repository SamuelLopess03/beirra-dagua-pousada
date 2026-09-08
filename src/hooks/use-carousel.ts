import { useCallback, useEffect, useRef, useState } from "react";

type UseCarouselOptions = {
  slideCount: number;
  /** Intervalo do autoplay em ms. Use 0 para desativar. */
  autoPlayInterval?: number;
  /** Tempo de pausa do autoplay após interação do usuário (ms). */
  pauseDuration?: number;
};

export function useCarousel({
  slideCount,
  autoPlayInterval = 0,
  pauseDuration = 5000,
}: UseCarouselOptions) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);
  const pausedRef = useRef(false);
  const pauseTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

  const updateActiveSlide = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    const closestIndex = cards.reduce((closest, card, index) => {
      const currentDistance = Math.abs(card.offsetLeft - track.scrollLeft);
      const closestDistance = Math.abs(
        cards[closest].offsetLeft - track.scrollLeft,
      );
      return currentDistance < closestDistance ? index : closest;
    }, 0);
    setActiveSlide(closestIndex);
  }, []);

  const goToSlide = useCallback(
    (index: number, userInteraction = false) => {
      const track = trackRef.current;
      const card = track?.children[index] as HTMLElement | undefined;
      if (!track || !card) return;
      track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
      setActiveSlide(index);
      if (userInteraction) {
        pausedRef.current = true;
        if (pauseTimeoutRef.current) {
          clearTimeout(pauseTimeoutRef.current);
        }
        pauseTimeoutRef.current = setTimeout(() => {
          pausedRef.current = false;
        }, pauseDuration);
      }
    },
    [pauseDuration],
  );

  const goToPrevious = useCallback(
    (userInteraction = false) =>
      goToSlide((activeSlide - 1 + slideCount) % slideCount, userInteraction),
    [activeSlide, slideCount, goToSlide],
  );

  const goToNext = useCallback(
    (userInteraction = false) =>
      goToSlide((activeSlide + 1) % slideCount, userInteraction),
    [activeSlide, slideCount, goToSlide],
  );

  useEffect(() => {
    if (autoPlayInterval <= 0) return;
    const interval = setInterval(() => {
      if (pausedRef.current) return;
      setActiveSlide((current) => {
        const next = (current + 1) % slideCount;
        const track = trackRef.current;
        const card = track?.children[next] as HTMLElement | undefined;
        if (track && card) {
          track.scrollTo({ left: card.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlayInterval, slideCount]);

  useEffect(() => {
    return () => {
      if (pauseTimeoutRef.current) {
        clearTimeout(pauseTimeoutRef.current);
      }
    };
  }, []);

  return {
    trackRef,
    activeSlide,
    updateActiveSlide,
    goToSlide,
    goToPrevious,
    goToNext,
  };
}
