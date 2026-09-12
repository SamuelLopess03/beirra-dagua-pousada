import { useMemo, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { SectionLabel } from "@/components/layout/section-label";
import { useBooking } from "@/hooks/booking-context";
import NotFound from "@/pages/not-found";
import { roomOptions } from "@/data/rooms";

export function QuartoDetalhe({ slug }: { slug: string }) {
  const { t } = useTranslation();
  const { openBooking } = useBooking();
  const room = roomOptions.find((item) => item.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  const roomName = room ? t(`rooms.items.${room.slug}.name`) : "";
  const roomType = room ? t(`rooms.items.${room.slug}.type`) : "";
  const roomDesc = room ? t(`rooms.items.${room.slug}.desc`) : "";
  const mealLabels = room ? room.mealKeys.map((key) => t(`mealPlans.${key}`)) : [];
  const detailLabels = room ? room.detailKeys.map((key) => t(`roomDetails.${key}`)) : [];

  const whatsappMessage = useMemo(
    () =>
      room
        ? [
            t("quartoDetalhe.whatsappInterest", { name: roomName }),
            t("quartoDetalhe.whatsappDetails"),
            t("quartoDetalhe.whatsappCapacity", { count: room.capacity }),
            t("quartoDetalhe.whatsappIncludes", { meals: mealLabels.join(" e ") }),
          ].join("\n")
        : "",
    [room, roomName, mealLabels, t],
  );

  if (!room) return <NotFound />;

  const whatsappUrl = `https://wa.me/5588981338506?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <main className="room-detail-page inner-page">
      <section className="room-detail-header page-width">
        <Link href="/quartos" className="room-back-link">
          <ArrowRight size={15} /> {t("quartoDetalhe.back")}
        </Link>
        <div className="room-detail-heading">
          <div>
            <SectionLabel>
              Beira D’Água · {roomType.toLowerCase()}
            </SectionLabel>
            <h1>{roomName}</h1>
            <p>{roomDesc}</p>
          </div>
          <span className="room-detail-index">{t("quartoDetalhe.indexLabel")}</span>
        </div>
      </section>

      <section className="room-detail-gallery page-width">
        <div className="room-detail-main-image">
          <img
            src={room.gallery[selectedImage]}
            alt={`${roomName} - vista ${selectedImage + 1}`}
          />
          <span>
            {String(selectedImage + 1).padStart(2, "0")} /{" "}
            {String(room.gallery.length).padStart(2, "0")}
          </span>
        </div>
        <div
          className="room-detail-thumbs"
          aria-label={t("quartoDetalhe.galleryAriaLabel", { name: roomName })}
        >
          {room.gallery.map((image, index) => (
            <button
              type="button"
              key={image}
              className={selectedImage === index ? "is-active" : ""}
              onClick={() => setSelectedImage(index)}
              aria-label={t("quartoDetalhe.viewImage", { number: index + 1 })}
              aria-current={selectedImage === index ? "true" : undefined}
            >
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      </section>

      <section className="room-detail-info page-width">
        <div className="room-detail-copy">
          <span className="side-note">{t("quartoDetalhe.sideNote")}</span>
          <h2>{t("quartoDetalhe.title")}</h2>
          <p>
            {t("quartoDetalhe.copy")}
          </p>
        </div>
        <div className="room-detail-features">
          <div className="room-detail-feature">
            <span>{t("quartoDetalhe.capacity")}</span>
            <strong>
              {t("quartoDetalhe.guest", { count: room.capacity })}
            </strong>
          </div>
          <div className="room-detail-feature">
            <span>{t("quartoDetalhe.includes")}</span>
            <strong>{mealLabels.join(" · ")}</strong>
          </div>
          <div className="room-detail-feature room-detail-feature-wide">
            <span>{t("quartoDetalhe.offers")}</span>
            <div>
              {detailLabels.map((detail) => (
                <span key={detail}>
                  <Check size={14} /> {detail}
                </span>
              ))}
            </div>
            <button
              type="button"
              className="button button-outline room-detail-reserve"
              onClick={() => openBooking(room)}
              data-testid="button-reservar-quarto"
            >
              {t("quartoDetalhe.reserve")} <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      <section className="room-detail-booking">
        <div className="page-width room-detail-booking-inner">
          <div>
            <span className="section-label">{t("quartoDetalhe.consultStay")}</span>
            <h2>{t("quartoDetalhe.consultTitle")}</h2>
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="button button-dark"
            data-testid="button-whatsapp-quarto"
          >
            {t("quartoDetalhe.talkAboutStay")} <MessageCircle size={16} />
          </a>
        </div>
      </section>
    </main>
  );
}
