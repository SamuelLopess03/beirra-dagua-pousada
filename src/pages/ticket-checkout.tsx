import { useEffect, useRef, useState, useMemo } from "react";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { DoubleCalendar } from "@/components/booking/double-calendar";
import { TicketTypeSelector } from "@/components/booking/ticket-type-selector";
import { OrderSummarySidebar } from "@/components/booking/order-summary-sidebar";
import { PersonalDataStep } from "@/components/booking/personal-data-step";

const TICKET_CATEGORIES = [
  {
    id: "dia",
    title: "Ingressos para 1 dia",
    theme: "blue" as const,
    tickets: [
      {
        id: "adulto",
        name: "Ingresso adulto",
        description: "Diversão ilimitada o dia todo para todas as idades.",
        features: [
          "Acesso ilimitado a todas as atrações",
          "Preço exclusivo para compras online",
        ],
        price: 325.0,
      },
      {
        id: "infantil",
        name: "Ingresso infantil",
        description: "Para crianças até 12 anos. Apresentar documento.",
        features: [
          "Acesso ilimitado a todas as atrações adequadas",
          "Diversão garantida para os pequenos",
        ],
        price: 250.0,
      },
      {
        id: "meia",
        name: "Meia-entrada",
        description:
          "Estudantes, idosos e professores. Necessária comprovação.",
        features: [
          "Acesso ilimitado a todas as atrações",
          "Aproveite com desconto garantido",
        ],
        price: 162.5,
      },
    ],
  },
  {
    id: "especial",
    title: "Ingressos Especiais",
    theme: "orange" as const,
    tickets: [
      {
        id: "pcd",
        name: "Ingresso Pessoa com Deficiência",
        description:
          "Aproveite as atrações do parque aquático com conforto e acesso facilitado.",
        features: [
          "Aproveite as atrações do parque aquático com conforto e acesso ilimitado",
          "Ingresso que dá direito a 1 (uma) entrada para pessoas com deficiência física, auditiva e portador de síndrome de down",
        ],
        price: 162.5,
      },
      {
        id: "idoso",
        name: "Ingresso Idoso",
        description:
          "Aproveite um dia de diversão nas atrações do parque aquático.",
        features: [
          "Aproveite um dia de diversão nas atrações do parque aquático",
          "Ingresso que dá direito a 1 (uma) entrada para pessoas acima de 60 anos",
        ],
        price: 162.5,
      },
      {
        id: "gestante",
        name: "Ingresso Gestante",
        description:
          "Aproveite momentos de lazer e relaxamento nas atrações do parque aquático.",
        features: [
          "Aproveite momentos de lazer e relaxamento nas atrações do parque aquático",
          "Ingresso que dá direito a 1 (uma) entrada para gestantes",
        ],
        price: 162.5,
      },
    ],
  },
  {
    id: "passaporte",
    title: "Passaporte Promocional",
    theme: "teal" as const,
    tickets: [
      {
        id: "passaporte2",
        name: "Passaporte 2 dias",
        description: "Dois dias para conquistar cada atração.",
        features: [
          "Ingresso que dá direito a 2 (duas) entradas no preço de 1,5 dias, a partir do primeiro acesso",
          "Aproveite ao máximo sem pressa",
        ],
        price: 419.0,
        badge: "Melhor custo benefício",
      },
      {
        id: "passaporte5",
        name: "Passaporte 5 dias",
        description: "Cinco dias de pura diversão e aventura aquática.",
        features: [
          "Ingresso que dá direito a 5 entradas para a mesma pessoa no preço de 3 dias",
          "A partir do primeiro acesso no Little Beach",
        ],
        price: 750.0,
        badge: "Super economia",
      },
      {
        id: "passaporte-insano",
        name: "Passaporte Insano",
        description: "10 dias no melhor parque aquático.",
        features: [
          "Ingresso que dá direito a 10 (dez) entradas para a mesma pessoa no preço de 1,5 dias",
          "A partir do primeiro acesso no Little Beach",
        ],
        price: 510.0,
        badge: "10 entradas no dia",
      },
    ],
  },
];

const ALL_TICKETS = TICKET_CATEGORIES.flatMap((c) => c.tickets);

export function TicketCheckout() {
  const queryParams = useMemo(
    () => new URLSearchParams(window.location.search),
    [],
  );

  const initialDate = useMemo(() => {
    const raw = queryParams.get("data");
    if (raw) {
      const parsed = new Date(raw);
      if (!isNaN(parsed.getTime())) return parsed;
    }
    return null;
  }, [queryParams]);

  const initialPeople = useMemo(() => {
    const raw = queryParams.get("pessoas");
    const n = parseInt(raw ?? "1");
    return isNaN(n) ? 1 : n;
  }, [queryParams]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);
  const [ticketSelections, setTicketSelections] = useState<
    Record<string, number>
  >({});
  const [checkoutStep, setCheckoutStep] = useState<
    "selection" | "personal_data"
  >("selection");

  const hasTickets = Object.keys(ticketSelections).length > 0;
  const currentStep: 1 | 2 | 3 =
    checkoutStep === "personal_data" ? 3 : selectedDate && hasTickets ? 2 : 1;

  const handleToggleTicket = (id: string) => {
    setTicketSelections((prev) => {
      if (prev[id]) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: initialPeople };
    });
  };

  const handleQtyChange = (id: string, qty: number) => {
    if (qty < 1) return;
    setTicketSelections((prev) => ({ ...prev, [id]: qty }));
  };

  // Total calculation for PersonalDataStep
  const totalPix = useMemo(() => {
    return ALL_TICKETS.reduce((sum, t) => {
      const q = ticketSelections[t.id] ?? 0;
      return sum + t.price * q;
    }, 0);
  }, [ticketSelections]);

  const cartQty = useMemo(
    () => Object.values(ticketSelections).reduce((sum, q) => sum + q, 0),
    [ticketSelections],
  );

  const summaryRef = useRef<HTMLDivElement>(null);
  const [summaryInView, setSummaryInView] = useState(false);

  // Esconde o mini-carrinho enquanto o resumo completo está visível.
  useEffect(() => {
    const anchor = summaryRef.current;
    if (!anchor) return;
    const observer = new IntersectionObserver(
      ([entry]) => setSummaryInView(entry.isIntersecting),
      { threshold: 0.35 },
    );
    observer.observe(anchor);
    return () => observer.disconnect();
  }, []);

  const cartBarVisible = cartQty > 0 && !summaryInView;
  const scrollToSummary = () => {
    const anchor = summaryRef.current;
    if (!anchor) return;
    const top = anchor.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  };

  return (
    <main className="ticket-checkout-page">
      <div className="page-width ticket-checkout-container">
        <div className="ticket-checkout-content">
          {checkoutStep === "selection" ? (
            <>
              <DoubleCalendar
                selectedDate={selectedDate}
                onSelectDate={setSelectedDate}
                initialDate={initialDate}
              />

              {selectedDate && (
                <TicketTypeSelector
                  categories={TICKET_CATEGORIES}
                  ticketSelections={ticketSelections}
                  onToggleTicket={handleToggleTicket}
                  onQtyChange={handleQtyChange}
                />
              )}
            </>
          ) : (
            <PersonalDataStep
              onBackToSelection={() => setCheckoutStep("selection")}
              onCompleteOrder={(data) => console.log("Pedido concluído:", data)}
              totalPix={totalPix}
            />
          )}
        </div>

        <div ref={summaryRef} className="ticket-summary-anchor">
          <OrderSummarySidebar
            currentStep={currentStep}
            selectedDate={selectedDate}
            ticketSelections={ticketSelections}
            allTickets={ALL_TICKETS}
            onAdvance={() => setCheckoutStep("personal_data")}
            isPersonalDataStep={checkoutStep === "personal_data"}
          />
        </div>
      </div>

      {/* Mini-carrinho mobile: feedback imediato dos ingressos anexados */}
      <div
        className={`ticket-cart-bar${cartBarVisible ? " is-visible" : ""}`}
        role="status"
        aria-live="polite"
        aria-hidden={!cartBarVisible}
      >
        <span className="ticket-cart-icon">
          <ShoppingCart size={20} />
          <span className="ticket-cart-count">{cartQty}</span>
        </span>
        <span className="ticket-cart-info">
          <strong>
            {totalPix.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </strong>
          <small>
            {cartQty} {cartQty === 1 ? "ingresso" : "ingressos"}
          </small>
        </span>
        <button
          type="button"
          className="ticket-cart-btn"
          onClick={scrollToSummary}
          tabIndex={cartBarVisible ? undefined : -1}
        >
          Ver resumo <ArrowRight size={15} />
        </button>
      </div>
    </main>
  );
}
