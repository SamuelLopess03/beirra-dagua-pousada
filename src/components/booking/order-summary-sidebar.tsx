import { Check, ArrowRight } from "lucide-react";

interface Ticket {
  id: string;
  name: string;
  price: number;
}

interface OrderSummarySidebarProps {
  currentStep: 1 | 2 | 3;
  selectedDate: Date | null;
  ticketSelections: Record<string, number>;
  allTickets: Ticket[];
  onAdvance?: () => void;
  isPersonalDataStep?: boolean;
}

const formatDate = (date: Date) =>
  date.toLocaleDateString("pt-BR", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric"
  });

const formatBRL = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

export function OrderSummarySidebar({
  currentStep,
  selectedDate,
  ticketSelections,
  allTickets,
  onAdvance,
  isPersonalDataStep
}: OrderSummarySidebarProps) {
  const selectedItems = allTickets
    .filter(t => ticketSelections[t.id] !== undefined)
    .map(t => ({ ...t, qty: ticketSelections[t.id] }));

  const totalPix = selectedItems.reduce((sum, t) => sum + t.price * t.qty, 0);
  const total10x = totalPix * 1.1;

  return (
    <aside className="ticket-summary-sidebar">
      <h3>Resumo da sua visita ao Little Beach</h3>

      <div className="ticket-timeline">

        {/* Step 1 */}
        <div className="ticket-timeline-step completed">
          <div className="ticket-timeline-icon">
            <Check size={16} />
          </div>
          <div className="ticket-timeline-content">
            <h4>Seu destino</h4>
            <p>Little Beach</p>
          </div>
        </div>

        {/* Step 2 */}
        <div className={`ticket-timeline-step ${currentStep >= 2 ? 'active' : 'future'}`}>
          <div className="ticket-timeline-icon">
            {isPersonalDataStep ? <Check size={16} /> : "2"}
          </div>
          <div className="ticket-timeline-content">
            <h4>Escolha o dia e tipo de ingresso</h4>

            {selectedDate && (
              <p className="summary-date">{formatDate(selectedDate)}</p>
            )}

            {selectedItems.length > 0 ? (
              <ul className="summary-ticket-list">
                {selectedItems.map(item => (
                  <li key={item.id} className="summary-ticket-item">
                    <span className="summary-ticket-qty">{item.qty}x</span>
                    <span className="summary-ticket-name">{item.name}</span>
                    <span className="summary-ticket-price">{formatBRL(item.price * item.qty)}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="summary-empty">Sem ingressos</p>
            )}

            {!isPersonalDataStep && currentStep === 2 && (
              <span className="active-label">Você está aqui</span>
            )}
          </div>
        </div>

        {/* Step 3 */}
        <div className={`ticket-timeline-step ${isPersonalDataStep ? 'active' : 'future'}`}>
          <div className="ticket-timeline-icon">3</div>
          <div className="ticket-timeline-content">
            <h4>Finalize a compra</h4>
            {isPersonalDataStep && (
              <span className="active-label">Você está aqui</span>
            )}
          </div>
        </div>

      </div>

      {/* Total + Advance Button */}
      {selectedItems.length > 0 && (
        <div className="summary-total-section">
          <div className="summary-total-pix">
            <span>Valor total</span>
            <strong>{formatBRL(totalPix)} no pix</strong>
          </div>
          <div className="summary-total-10x">
            {formatBRL(total10x / 10)}/mês em 10x sem juros
          </div>
          {!isPersonalDataStep && onAdvance && (
            <button className="summary-advance-btn" onClick={onAdvance}>
              Avançar <ArrowRight size={18} />
            </button>
          )}
        </div>
      )}
    </aside>
  );
}
