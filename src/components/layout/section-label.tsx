import type { ReactNode } from "react";

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="section-label">
      <span className="eyebrow-dot" />
      {children}
    </div>
  );
}
