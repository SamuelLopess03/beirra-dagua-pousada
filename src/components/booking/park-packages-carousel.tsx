import { useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Ticket,
} from "lucide-react";
import { parkPackages } from "@/data/park-packages";

type ParkPackageCarouselProps = {
  onSelectPackage: (packageId: string) => void;
};

export function ParkPackageCarousel({
  onSelectPackage,
}: ParkPackageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const move = (direction: number) => {
    setActiveIndex(
      (current) =>
        (current + direction + parkPackages.length) % parkPackages.length,
    );
  };

  return (
    <div
      className="park-package-carousel"
      aria-label="Pacotes de acesso ao Little Beach"
    >
      <div className="park-package-carousel-heading">
        <span className="park-label">Escolha seu acesso</span>
        <span className="park-package-count">
          0{activeIndex + 1} <span>/ 03</span>
        </span>
      </div>
      <div className="park-package-carousel-viewport">
        <div
          className="park-package-carousel-track"
          style={{ transform: `translateX(-${activeIndex * 80}%)` }}
        >
          {parkPackages.map((item, index) => (
            <article
              className={`park-package-feature-card${index === activeIndex ? " is-active" : ""}`}
              key={item.id}
            >
              <div className="park-package-feature-top">
                <span className="park-package-icon">
                  <Ticket size={19} />
                </span>
                <span>Little Beach</span>
              </div>
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <strong className="park-package-feature-price">
                R$ {item.price.toLocaleString("pt-BR")}
                <small>{item.note}</small>
              </strong>
              <ul>
                {item.benefits.map((benefit) => (
                  <li key={benefit}>
                    <Check size={13} /> {benefit}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                className="park-package-feature-link"
                onClick={() => onSelectPackage(item.id)}
                data-testid={`button-ver-pacote-${item.id}`}
              >
                Ver detalhes do pacote <ArrowRight size={15} />
              </button>
            </article>
          ))}
        </div>
      </div>
      <div className="park-package-carousel-controls">
        <button
          type="button"
          onClick={() => move(-1)}
          aria-label="Pacote anterior"
        >
          <ChevronLeft size={17} />
        </button>
        <div className="park-package-carousel-dots">
          {parkPackages.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={index === activeIndex ? "is-active" : ""}
              onClick={() => setActiveIndex(index)}
              aria-label={`Ver pacote ${index + 1}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => move(1)}
          aria-label="Próximo pacote"
        >
          <ChevronRight size={17} />
        </button>
      </div>
      <span className="park-package-carousel-hint">
        Navegue pelos pacotes <ArrowRight size={13} />
      </span>
    </div>
  );
}
