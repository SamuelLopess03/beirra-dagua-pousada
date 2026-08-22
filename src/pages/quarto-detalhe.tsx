import { useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check } from "lucide-react";
import { SectionLabel } from "@/components/layout/section-label";
import { useBooking } from "@/hooks/use-booking";
import NotFound from "@/pages/not-found";
import { roomOptions } from "@/data/rooms";

export function QuartoDetalhe({ slug }: { slug: string }) {
  const { openBooking } = useBooking();
  const room = roomOptions.find((item) => item.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!room) return <NotFound />;

  return (
    <main className="room-detail-page inner-page">
      <section className="room-detail-header page-width">
        <Link href="/quartos" className="room-back-link">
          <ArrowRight size={15} /> Voltar para quartos
        </Link>
        <div className="room-detail-heading">
          <div>
            <SectionLabel>
              Beira D’Água · {room.type.toLowerCase()}
            </SectionLabel>
            <h1>{room.name}</h1>
            <p>{room.desc}</p>
          </div>
          <span className="room-detail-index">01 · quarto</span>
        </div>
      </section>

      <section className="room-detail-gallery page-width">
        <div className="room-detail-main-image">
          <img
            src={room.gallery[selectedImage]}
            alt={`${room.name} - vista ${selectedImage + 1}`}
          />
          <span>
            {String(selectedImage + 1).padStart(2, "0")} /{" "}
            {String(room.gallery.length).padStart(2, "0")}
          </span>
        </div>
        <div
          className="room-detail-thumbs"
          aria-label={`Galeria de ${room.name}`}
        >
          {room.gallery.map((image, index) => (
            <button
              type="button"
              key={image}
              className={selectedImage === index ? "is-active" : ""}
              onClick={() => setSelectedImage(index)}
              aria-label={`Ver imagem ${index + 1}`}
              aria-current={selectedImage === index ? "true" : undefined}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </section>

      <section className="room-detail-info page-width">
        <div className="room-detail-copy">
          <span className="side-note">Um canto para ficar</span>
          <h2>O essencial bem pensado para viver devagar.</h2>
          <p>
            Luz natural, silêncio e espaço para deixar o tempo correr no seu
            ritmo. Cada detalhe foi escolhido para que a estadia seja simples,
            confortável e perto da natureza.
          </p>
        </div>
        <div className="room-detail-features">
          <div className="room-detail-feature">
            <span>Capacidade</span>
            <strong>
              {room.capacity} {room.capacity === 1 ? "hóspede" : "hóspedes"}
            </strong>
          </div>
          <div className="room-detail-feature">
            <span>Inclui</span>
            <strong>{room.meals.join(" · ")}</strong>
          </div>
          <div className="room-detail-feature room-detail-feature-wide">
            <span>O quarto oferece</span>
            <div>
              {room.details.map((detail) => (
                <span key={detail}>
                  <Check size={14} /> {detail}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="room-detail-booking">
        <div className="page-width room-detail-booking-inner">
          <div>
            <span className="section-label">Consulte sua estadia</span>
            <h2>Seu lugar perto da água.</h2>
          </div>
          <button
            type="button"
            onClick={openBooking}
            className="button button-dark"
          >
            Consultar disponibilidade <ArrowRight size={16} />
          </button>
        </div>
      </section>
    </main>
  );
}
