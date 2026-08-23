import { useState } from "react";
import { ArrowRight, Check, Coffee, Moon, Users, X } from "lucide-react";
import type { Room } from "@/data/rooms";

type BookingDialogProps = {
  onClose: () => void;
  room?: Room;
};

export function BookingDialog({ onClose, room }: BookingDialogProps) {
  const [step, setStep] = useState<"form" | "review" | "sent">("form");
  const [dateError, setDateError] = useState("");
  const [form, setForm] = useState({
    arrival: "",
    departure: "",
    guests: "2",
    name: "",
    email: "",
    note: "",
  });
  const update = (field: keyof typeof form, value: string) => {
    setDateError("");
    setForm((current) => ({ ...current, [field]: value }));
  };
  const nights =
    form.arrival && form.departure
      ? Math.max(
          0,
          Math.round(
            (new Date(`${form.departure}T12:00:00`).getTime() -
              new Date(`${form.arrival}T12:00:00`).getTime()) /
              86400000,
          ),
        )
      : 0;
  const formatDate = (value: string) =>
    new Date(`${value}T12:00:00`).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  const formatPrice = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(value);

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
          aria-label="Fechar"
          data-testid="button-fechar-reserva"
        >
          <X size={19} />
        </button>
        {step === "form" ? (
          <>
            <div className="panel-kicker">
              <span className="eyebrow-dot" />{" "}
              {room ? "Reserve seu quarto" : "Reserva sob medida"}
            </div>
            <h2 id="booking-title">
              {room ? (
                <>
                  Seu descanso
                  <br />
                  <em>começa aqui.</em>
                </>
              ) : (
                <>
                  Vamos encontrar
                  <br />
                  <em>seu lugar.</em>
                </>
              )}
            </h2>
            <p className="panel-intro">
              {room
                ? "Escolha suas datas e confira todos os detalhes antes de confirmar sua reserva."
                : "Conte como você imagina seus dias por aqui. A gente responde com calma, detalhes e as melhores possibilidades."}
            </p>
            {room && (
              <div className="booking-room-preview">
                <img src={room.image} alt="" />
                <div>
                  <span className="booking-room-type">{room.type}</span>
                  <strong>{room.name}</strong>
                  <span>A partir de {formatPrice(room.price)} / noite</span>
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
                  setDateError("A saída precisa acontecer depois da chegada.");
                  return;
                }
                setStep("review");
              }}
              className="booking-form"
            >
              <div className="form-grid">
                <label>
                  Chegada
                  <input
                    required
                    type="date"
                    value={form.arrival}
                    onChange={(event) => update("arrival", event.target.value)}
                    data-testid="input-chegada"
                  />
                </label>
                <label>
                  Saída
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
              <label>
                Hóspedes
                <select
                  value={form.guests}
                  onChange={(event) => update("guests", event.target.value)}
                  data-testid="select-hospedes"
                >
                  <option value="1">1 hóspede</option>
                  <option value="2">2 hóspedes</option>
                  <option value="3">3 hóspedes</option>
                  <option value="4">4 hóspedes</option>
                </select>
              </label>
              <div className="form-grid">
                <label>
                  Seu nome
                  <input
                    required
                    type="text"
                    placeholder="Como podemos chamar você?"
                    value={form.name}
                    onChange={(event) => update("name", event.target.value)}
                    data-testid="input-nome"
                  />
                </label>
                <label>
                  E-mail
                  <input
                    required
                    type="email"
                    placeholder="voce@email.com"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    data-testid="input-email"
                  />
                </label>
              </div>
              <label>
                Alguma preferência? <span className="optional">(opcional)</span>
                <textarea
                  rows={3}
                  placeholder="Uma ocasião especial, dúvidas ou vontade de conhecer..."
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
                Revisar reserva <ArrowRight size={17} />
              </button>
            </form>
          </>
        ) : step === "review" ? (
          <div className="booking-review">
            <div className="panel-kicker">
              <span className="eyebrow-dot" /> Confira sua reserva
            </div>
            <h2 id="booking-title">
              Tudo certo
              <br />
              <em>com seu plano?</em>
            </h2>
            {room && (
              <div className="booking-review-room">
                <img src={room.image} alt="" />
                <div>
                  <span className="booking-room-type">{room.type}</span>
                  <strong>{room.name}</strong>
                  <span>{room.desc}</span>
                </div>
              </div>
            )}
            <div className="booking-summary">
              <div>
                <span>Estadia</span>
                <strong>
                  {formatDate(form.arrival)} → {formatDate(form.departure)}
                </strong>
              </div>
              <div>
                <span>
                  <Moon size={14} /> Noites
                </span>
                <strong>
                  {nights} {nights === 1 ? "noite" : "noites"}
                </strong>
              </div>
              <div>
                <span>
                  <Users size={14} /> Hóspedes
                </span>
                <strong>
                  {form.guests} {form.guests === "1" ? "hóspede" : "hóspedes"}
                </strong>
              </div>
              {room && (
                <div>
                  <span>
                    <Coffee size={14} /> Inclui
                  </span>
                  <strong>{room.meals.join(" · ")}</strong>
                </div>
              )}
              {room && (
                <div className="booking-summary-total">
                  <span>Total estimado</span>
                  <strong>{formatPrice(room.price * nights)}</strong>
                </div>
              )}
            </div>
            <p className="booking-review-contact">
              A confirmação será enviada para <strong>{form.email}</strong>.
            </p>
            <div className="booking-review-actions">
              <button
                className="button button-outline"
                type="button"
                onClick={() => setStep("form")}
                data-testid="button-editar-reserva"
              >
                Editar dados
              </button>
              <button
                className="button button-gold"
                type="button"
                onClick={() => setStep("sent")}
                data-testid="button-confirmar-reserva"
              >
                Confirmar reserva <ArrowRight size={17} />
              </button>
            </div>
          </div>
        ) : (
          <div className="success-state" data-testid="status-reserva-enviada">
            <div className="success-mark">
              <Check size={24} />
            </div>
            <div className="panel-kicker">Pedido recebido</div>
            <h2>
              Até já,
              <br />
              <em>{form.name.split(" ")[0] || "viajante"}.</em>
            </h2>
            <p>
              Recebemos sua preferência. Vamos cuidar dos detalhes e retornar
              para você pelo e-mail informado.
            </p>
            <button
              className="button button-outline"
              onClick={onClose}
              data-testid="button-concluir-reserva"
            >
              Voltar para o site <ArrowRight size={16} />
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
