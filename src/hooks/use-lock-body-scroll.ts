import { useEffect } from "react";

let lockCount = 0;
let previousOverflow = "";

/**
 * Trava o scroll do <body> enquanto um overlay (modal, lightbox, menu
 * mobile) estiver ativo. Usa contador de referência para não destravar
 * cedo caso dois overlays estejam empilhados.
 */
export function useLockBodyScroll(active = true) {
  useEffect(() => {
    if (!active || typeof document === "undefined") return;
    if (lockCount === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    lockCount += 1;
    return () => {
      lockCount = Math.max(0, lockCount - 1);
      if (lockCount === 0) {
        document.body.style.overflow = previousOverflow;
      }
    };
  }, [active]);
}
