import { useMemo, useState } from "react";
import { ArrowRight, Check, Coffee, Moon, Users, Utensils, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useLockBodyScroll } from "@/hooks/use-lock-body-scroll";
import type { Room } from "@/data/rooms";

type BookingDialogProps = {
  onClose: () => void;
  room?: Room;
};

function formatDate(value: string, locale: string) {
  return new Date(`${value}T12:00:00`).toLocaleDateString(locale, {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}

export function BookingDialog({ onClose, room }: BookingDialogProps) {
  const { t, i18n } = useTranslation();
  // Modal aberto: a página atrás não rola, o foco fica no modal.
  useLockBodyScroll();
  const roomName = room ? t(`rooms.items.${room.slug}.name`) : "";
  const roomType = room ? t(`rooms.items.${room.slug}.type`) : "";
  const roomDesc = room ? t(`rooms.items.${room.slug}.desc`) : "";
  const roomMealLabels = room ? room.mealKeys.map((key) => t(`mealPlans.${key}`)) : [];
  const [step, setStep] = useState<"form" | "review" | "sent">("form");
  const [dateError, setDateError] = useState("");
  const [form, setForm] = useState({
    arrival: "",
    departure: "",
    adults: "2",
    children: "0",
    mealPlan: "incluso",
    name: "",
    email: "",
    note: "",
  });
  const update = (field: keyof typeof form, value: string) => {
    setDateError("");
    setForm((current) => ({ ...current, [field]: value }));
  };
  const nights = useMemo(
    () =>
      form.arrival && form.departure
        ? Math.max(
            0,
            Math.round(
              (new Date(`${form.departure}T12:00:00`).getTime() -
                new Date(`${form.arrival}T12:00:00`).getTime()) /
                86400000,
            ),
          )
        : 0,
    [form.arrival, form.departure],
  );

  const adultsCount = Number(form.adults) || 1;
  const childrenCount = Number(form.children) || 0;
  const totalGuests = adultsCount + childrenCount;

  const mealPricePerPersonDay = useMemo(
    () =>
      form.mealPlan === "meia" ? 80 : form.mealPlan === "completa" ? 150 : 0,
    [form.mealPlan],
  );
  const mealPlanName = useMemo(
    () =>
      form.mealPlan === "meia"
        ? t("bookingDialog.mealHalfName")
        : form.mealPlan === "completa"
          ? t("bookingDialog.mealFullName")
          : t("bookingDialog.mealIncludedName"),
    [form.mealPlan, t],
  );

  const mealTotal = useMemo(
    () => mealPricePerPersonDay * totalGuests * (nights || 1),
    [mealPricePerPersonDay, totalGuests, nights],
  );
  const roomTotal = useMemo(() => (room ? room.price * (nights || 1) : 0), [room, nights]);
  const totalEstimate = useMemo(
    () => roomTotal + (mealPricePerPersonDay > 0 ? mealTotal : 0),
    [roomTotal, mealPricePerPersonDay, mealTotal],
  );

  return (
    <div
      className="modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.currentTarget === event.target) onClose();
      }}
    >
      <section
        className="booking-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        data-testid="dialog-reserva"
      >
        <button
          className="modal-close"
          onClick={onClose}
          aria-label={t("bookingDialog.close")}
          data-testid="button-fechar-reserva"
        >
          <X size={19} />
        </button>
        {step === "form" ? (
          <>
            <div className="panel-kicker">
              <span className="eyebrow-dot" />{" "}
              {room ? t("bookingDialog.kickerWithRoom") : t("bookingDialog.kickerWithoutRoom")}
            </div>
            <h2 id="booking-title">
              {room ? (
                <>
                  {t("bookingDialog.titleWithRoomLine1")}
                  <br />
                  <em>{t("bookingDialog.titleWithRoomHighlight")}</em>
                </>
              ) : (
                <>
                  {t("bookingDialog.titleWithoutRoomLine1")}
                  <br />
                  <em>{t("bookingDialog.titleWithoutRoomHighlight")}</em>
                </>
              )}
            </h2>
            <p className="panel-intro">
              {room
                ? t("bookingDialog.introWithRoom")
                : t("bookingDialog.introWithoutRoom")}
            </p>
            {room && (
              <div className="booking-room-preview">
                <img src={room.image} alt="" />
                <div>
                  <span className="booking-room-type">{roomType}</span>
                  <strong>{roomName}</strong>
                  <span>{t("bookingDialog.fromPricePerNight", { price: formatPrice(room.price) })}</span>
                </div>
              </div>
            )}
            <form
              onSubmit={(event) => {
                event.preventDefault();
                if (
                  form.arrival &&
                  form.departure &&
                  new Date(form.departure) <= new Date(form.arrival)
                ) {
                  setDateError(t("bookingDialog.dateError"));
                  return;
                }
                setStep("review");
              }}
              className="booking-form"
            >
              <div className="form-grid">
                <label>
                  {t("bookingDialog.arrival")}
                  <input
                    required
                    type="date"
                    value={form.arrival}
                    onChange={(event) => update("arrival", event.target.value)}
                    data-testid="input-chegada"
                  />
                </label>
                <label>
                  {t("bookingDialog.departure")}
                  <input
                    required
                    type="date"
                    value={form.departure}
                    min={form.arrival || undefined}
                    onChange={(event) =>
                      update("departure", event.target.value)
                    }
                    data-testid="input-saida"
                  />
                </label>
              </div>
              {dateError && <p className="booking-date-error">{dateError}</p>}
              
              <div className="form-grid">
                <label>
                  {t("bookingDialog.adults")}
                  <input
                    required
                    type="number"
                    min="1"
                    max="20"
                    value={form.adults}
                    onChange={(event) => update("adults", event.target.value)}
                    data-testid="input-adultos"
                  />
                </label>
                <label>
                  {t("bookingDialog.children")}
                  <input
                    type="number"
                    min="0"
                    max="20"
                    value={form.children}
                    onChange={(event) => update("children", event.target.value)}
                    data-testid="input-criancas"
                  />
                </label>
              </div>

              <label>
                {t("bookingDialog.mealPlanLabel")}
                <select
                  value={form.mealPlan}
                  onChange={(event) => update("mealPlan", event.target.value)}
                  data-testid="select-refeicao"
                >
                  <option value="incluso">{t("bookingDialog.mealIncludedOption")}</option>
                  <option value="meia">{t("bookingDialog.mealHalfOption")}</option>
                  <option value="completa">{t("bookingDialog.mealFullOption")}</option>
                </select>
              </label>

              <div className="form-grid">
                <label>
                  {t("bookingDialog.name")}
                  <input
                    required
                    type="text"
                    placeholder={t("bookingDialog.namePlaceholder")}
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    data-testid="input-nome"
                  />
                </label>
                <label>
                  {t("bookingDialog.email")}
                  <input
                    required
                    type="email"
                    placeholder={t("bookingDialog.emailPlaceholder")}
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    data-testid="input-email"
                  />
                </label>
              </div>
              <label>
                {t("bookingDialog.notePreference")} <span className="optional">{t("bookingDialog.optional")}</span>
                <textarea
                  rows={3}
                  placeholder={t("bookingDialog.notePlaceholder")}
                  value={form.note}
                  onChange={(event) => update("note", event.target.value)}
                  data-testid="input-preferencia"
                />
              </label>
              <button
                className="button button-gold button-full"
                type="submit"
                data-testid="button-enviar-reserva"
              >
                {t("bookingDialog.reviewBooking")} <ArrowRight size={17} />
              </button>
            </form>
          </>
        ) : step === "review" ? (
          <div className="booking-review">
            <div className="panel-kicker">
              <span className="eyebrow-dot" /> {t("bookingDialog.confirmKicker")}
            </div>
            <h2 id="booking-title">
              {t("bookingDialog.confirmTitleLine1")}
              <br />
              <em>{t("bookingDialog.confirmTitleHighlight")}</em>
            </h2>
            {room && (
              <div className="booking-review-room">
                <img src={room.image} alt="" />
                <div>
                  <span className="booking-room-type">{roomType}</span>
                  <strong>{roomName}</strong>
                  <span>{roomDesc}</span>
                </div>
              </div>
            )}
            <div className="booking-summary">
              <div>
                <span>{t("bookingDialog.stay")}</span>
                <strong>
                  {formatDate(form.arrival, i18n.language)} → {formatDate(form.departure, i18n.language)}
                </strong>
              </div>
              <div>
                <span>
                  <Moon size={14} /> {t("bookingDialog.nightsLabel")}
                </span>
                <strong>
                  {t("bookingDialog.night", { count: nights })}
                </strong>
              </div>
              <div>
                <span>
                  <Users size={14} /> {t("bookingDialog.guests")}
                </span>
                <strong>
                  {t("bookingDialog.adult", { count: adultsCount })}
                  {childrenCount > 0 && t("bookingDialog.childSuffix", { count: childrenCount })}
                </strong>
              </div>
              <div>
                <span>
                  <Utensils size={14} /> {t("bookingDialog.meals")}
                </span>
                <strong>{mealPlanName}</strong>
              </div>
              {room && (
                <div>
                  <span>
                    <Coffee size={14} /> {t("bookingDialog.roomIncludes")}
                  </span>
                  <strong>{roomMealLabels.join(" · ")}</strong>
                </div>
              )}
              <div className="booking-summary-total">
                <span>{t("bookingDialog.totalEstimate")}</span>
                <strong>{formatPrice(totalEstimate)}</strong>
              </div>
            </div>
            <p className="booking-review-contact">
              {t("bookingDialog.confirmationSentTo", { email: form.email })}
            </p>
            <div className="booking-review-actions">
              <button
                className="button button-outline"
                type="button"
                onClick={() => setStep("form")}
                data-testid="button-editar-reserva"
              >
                {t("bookingDialog.editData")}
              </button>
              <button
                className="button button-gold"
                type="button"
                onClick={() => setStep("sent")}
                data-testid="button-confirmar-reserva"
              >
                {t("bookingDialog.confirmBooking")} <ArrowRight size={17} />
              </button>
            </div>
          </div>
        ) : (
          <div className="success-state" data-testid="status-reserva-enviada">
            <div className="success-mark">
              <Check size={24} />
            </div>
            <div className="panel-kicker">{t("bookingDialog.receivedKicker")}</div>
            <h2>
              {t("bookingDialog.seeYouSoon")}
              <br />
              <em>{form.name.split(" ")[0] || t("bookingDialog.traveler")}.</em>
            </h2>
            <p>
              {t("bookingDialog.receivedCopy")}
            </p>
            <button
              className="button button-outline"
              onClick={onClose}
              data-testid="button-concluir-reserva"
            >
              {t("bookingDialog.backToSite")} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
