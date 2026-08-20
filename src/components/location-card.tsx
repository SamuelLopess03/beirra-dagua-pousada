import { ArrowUpRight } from "lucide-react";
import mapPin from "@/assets/map-pin.png";

export type LocationCardProps = {
  eyebrow?: string;
  title?: string;
  highlight?: string;
  description?: string;
  address?: string;
  city?: string;
  zip?: string;
  mapUrl?: string;
};

export function LocationCard({
  eyebrow = "07 · Como chegar",
  title = "Onde encontrar a",
  highlight = "Berra D'água.",
  description = "A poucos passos do mar, num canto tranquilo do litoral.",
  address = "Praia de Barrinha - Aranau",
  city = "Acaraú - CE",
  zip = "CEP 62580-000",
  mapUrl = "https://maps.app.goo.gl/HmK9hrGraFM9mfM1A",
}: LocationCardProps) {
  return (
    <section className="page-width py-24">
      <div className="flex flex-col gap-6">
        <div className="section-label" style={{ marginBottom: 0 }}>
          <span className="eyebrow-dot" />
          {eyebrow}
        </div>

        <article
          className="relative overflow-hidden rounded-[36px] px-10 py-12 shadow-2xl sm:px-16 sm:py-16 flex flex-col md:flex-row items-center gap-10 md:gap-16"
          style={{ background: "#2b7fc1" }}
        >
          <img
            src={mapPin}
            alt="Mapa com marcador da localização da pousada"
            loading="lazy"
            className="w-40 h-40 md:w-48 md:h-48 object-contain drop-shadow-2xl shrink-0"
          />

          <div className="flex-1 text-[#f8f3e9]">
            <h2 className="font-serif text-4xl md:text-5xl leading-none text-[#f8f3e9] mb-4">
              {title} <em className="italic">{highlight}</em>
            </h2>
            <p className="text-[14px] text-[#f8f3e9]/80 mb-6 max-w-md leading-relaxed">
              {description}
            </p>
            <div className="text-[13px] text-[#f8f3e9]/90 space-y-1">
              <p>{address}</p>
              <p>
                {city} · {zip}
              </p>
            </div>
          </div>

          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button button-gold shrink-0 self-center"
          >
            Ver mapa <ArrowUpRight size={16} />
          </a>
        </article>
      </div>
    </section>
  );
}
