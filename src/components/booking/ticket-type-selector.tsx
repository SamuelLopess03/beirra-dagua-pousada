import { Minus, Plus } from "lucide-react";

interface TicketType {
  id: string;
  name: string;
  description: string;
  features: string[];
  price: number;
  badge?: string;
  soldOut?: boolean;
}

interface TicketCategory {
  id: string;
  title: string;
  subtitle?: string;
  theme: "blue" | "orange" | "teal";
  tickets: TicketType[];
}

interface TicketTypeSelectorProps {
  categories: TicketCategory[];
  ticketSelections: Record<string, number>;
  onToggleTicket: (id: string) => void;
  onQtyChange: (id: string, qty: number) => void;
}

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function WaveHeaderDecoration() {
  return (
    <div className="tts-wave-bg" aria-hidden="true">
      <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="tts-wave-svg">
        <path
          d="M0,0 C150,90 350,-40 500,50 C650,140 900,10 1200,40 L1200,0 L0,0 Z"
          fill="rgba(255, 255, 255, 0.08)"
        />
        <path
          d="M0,0 C200,40 450,100 700,30 C950,-40 1100,70 1200,20 L1200,0 L0,0 Z"
          fill="rgba(255, 255, 255, 0.05)"
        />
      </svg>
    </div>
  );
}

function TicketCard({
  ticket,
  isSelected,
  qty,
  theme,
  onToggle,
  onQtyChange,
}: {
  ticket: TicketType;
  isSelected: boolean;
  qty: number;
  theme: TicketCategory["theme"];
  onToggle: () => void;
  onQtyChange: (qty: number) => void;
}) {
  return (
    <div className={`tts-ticket-card ${isSelected ? "is-selected" : ""} ${ticket.soldOut ? "is-sold-out" : ""}`}>
      {/* Notch lateral de ingresso (Corte de ticket) */}
      <div className="tts-card-notch notch-left" />
      <div className="tts-card-notch notch-right" />

      {/* Grid interna do card */}
      <div className="tts-card-content">
        {/* Coluna 1: Nome, Descrição e Badge */}
        <div className="tts-card-info">
          {ticket.badge && (
            <span className={`tts-card-badge tts-badge-${theme}`}>{ticket.badge}</span>
          )}
          <h4 className="tts-card-title">{ticket.name}</h4>
          <p className="tts-card-desc">{ticket.description}</p>
          <button type="button" className="tts-card-more">Saiba mais +</button>
        </div>

        {/* Coluna 2: Lista de benefícios */}
        <ul className="tts-card-features">
          {ticket.features.map((feature, idx) => (
            <li key={idx}>{feature}</li>
          ))}
        </ul>

        {/* Coluna 3: Valores e Ações/Controles */}
        <div className="tts-card-action">
          <strong className="tts-card-price-pix">{formatBRL(ticket.price)} no pix</strong>
          <span className="tts-card-price-10x">{formatBRL((ticket.price * 1.1) / 10)}/mês em 10x</span>

          {ticket.soldOut ? (
            <button className="tts-btn-sold-out" disabled>
              Data Esgotada
            </button>
          ) : isSelected ? (
            <div className="tts-qty-selector">
              <button
                type="button"
                className={`tts-qty-btn ${theme}`}
                onClick={() => {
                  if (qty <= 1) onToggle();
                  else onQtyChange(qty - 1);
                }}
                aria-label="Diminuir quantidade"
              >
                <Minus size={14} />
              </button>
              <span className="tts-qty-number">{qty}</span>
              <button
                type="button"
                className={`tts-qty-btn ${theme}`}
                onClick={() => onQtyChange(qty + 1)}
                aria-label="Aumentar quantidade"
              >
                <Plus size={14} />
              </button>
            </div>
          ) : (
            <button type="button" className={`tts-add-card-btn ${theme}`} onClick={onToggle}>
              Adicionar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function TicketTypeSelector({
  categories,
  ticketSelections,
  onToggleTicket,
  onQtyChange,
}: TicketTypeSelectorProps) {
  return (
    <div className="tts-categories">
      {categories.map((category) => (
        <div key={category.id} className={`tts-category-block theme-${category.theme}`}>
          {/* Banner / Header do Bloco com Fundo Vibrante + Ondas */}
          <div className="tts-category-banner">
            <WaveHeaderDecoration />
            <h3 className="tts-banner-title">{category.title}</h3>
          </div>

          {/* Lista de Cards Estilo Ticket/Ingresso de Beach Park */}
          <div className="tts-cards-container">
            {category.tickets.map((ticket) => {
              const isSelected = ticketSelections[ticket.id] !== undefined;
              const qty = ticketSelections[ticket.id] ?? 1;
              return (
                <TicketCard
                  key={ticket.id}
                  ticket={ticket}
                  isSelected={isSelected}
                  qty={qty}
                  theme={category.theme}
                  onToggle={() => onToggleTicket(ticket.id)}
                  onQtyChange={(q) => onQtyChange(ticket.id, q)}
                />
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
