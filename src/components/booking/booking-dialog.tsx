import { useState } from "react";
import { ArrowRight, Check, X } from "lucide-react";

type BookingDialogProps = { onClose: () => void };

export function BookingDialog({ onClose }: BookingDialogProps) {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    arrival: "",
    departure: "",
    guests: "2",
    name: "",
    email: "",
    note: "",
  });
  const update = (field: string, value: string) =>
    setForm((current) => ({ ...current, [field]: value }));
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
        {!sent ? (
          <>
            <div className="panel-kicker">
              <span className="eyebrow-dot" /> Reserva sob medida
            </div>
            <h2 id="booking-title">
              Vamos encontrar
              <br />
              <em>seu lugar.</em>
            </h2>
            <p className="panel-intro">
              Conte como você imagina seus dias por aqui. A gente responde com
              calma, detalhes e as melhores possibilidades.
            </p>
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setSent(true);
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
                    onChange={(event) =>
                      update("departure", event.target.value)
                    }
                    data-testid="input-saida"
                  />
                </label>
              </div>
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
                Enviar preferência <ArrowRight size={17} />
              </button>
            </form>
          </>
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
