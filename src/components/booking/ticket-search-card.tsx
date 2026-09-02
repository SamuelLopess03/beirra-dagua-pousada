import { useState, useRef, useEffect } from "react";
import {
  CalendarDays,
  Ticket,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useLocation } from "wouter";

export function TicketSearchCard() {
  const [, setLocation] = useLocation();
  const [date, setDate] = useState<Date | null>(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDay = new Date(currentYear, currentMonth, 1).getDay();

  const selectDate = (day: number) => {
    setDate(new Date(currentYear, currentMonth, day));
    setIsCalendarOpen(false);
  };

  const nextMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const isCurrentMonthOrPast =
    currentYear < today.getFullYear() ||
    (currentYear === today.getFullYear() && currentMonth <= today.getMonth());

  const prevMonth = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isCurrentMonthOrPast) return;
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  return (
    <div className="park-ticket-search page-width">
      <div className="park-ticket-search-inner">
        <div
          className="park-ticket-search-field"
          style={{ position: "relative" }}
          ref={calendarRef}
        >
          <label>Escolha a data da sua visita ao parque</label>
          <div
            className="park-ticket-input-container park-ticket-input-clickable"
            onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          >
            <CalendarDays size={24} className="park-ticket-input-icon" />
            <span className="park-ticket-input-value">
              {date
                ? `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`
                : "Quando você quer curtir o parque?"}
            </span>
            <ChevronDown size={20} className="park-ticket-input-icon" />
          </div>

          {isCalendarOpen && (
            <div className="park-ticket-calendar-dropdown">
              <div className="park-ticket-calendar-header">
                <button
                  onClick={prevMonth}
                  className={`park-ticket-calendar-nav ${isCurrentMonthOrPast ? "disabled" : ""}`}
                  disabled={isCurrentMonthOrPast}
                >
                  <ChevronLeft size={18} />
                </button>
                <span>
                  {monthNames[currentMonth]} {currentYear}
                </span>
                <button
                  onClick={nextMonth}
                  className="park-ticket-calendar-nav"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
              <div className="park-ticket-calendar-weekdays">
                <span>Dom</span>
                <span>Seg</span>
                <span>Ter</span>
                <span>Qua</span>
                <span>Qui</span>
                <span>Sex</span>
                <span>Sáb</span>
              </div>
              <div className="park-ticket-calendar-grid">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="park-ticket-calendar-day empty"
                  />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1;
                  const thisDate = new Date(currentYear, currentMonth, day);
                  thisDate.setHours(0, 0, 0, 0);
                  const isPast = thisDate < today;
                  const isSelected =
                    date?.getDate() === day &&
                    date?.getMonth() === currentMonth &&
                    date?.getFullYear() === currentYear;

                  if (isPast) {
                    return (
                      <div
                        key={day}
                        className="park-ticket-calendar-day disabled"
                      >
                        {day}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={day}
                      className={`park-ticket-calendar-day ${isSelected ? "selected" : ""}`}
                      onClick={() => selectDate(day)}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className="park-ticket-search-action">
          <button
            className="park-button park-button-blue park-ticket-submit-btn"
            onClick={() => {
              const params = new URLSearchParams();
              if (date) params.set("data", date.toISOString());
              setLocation(`/ingressos?${params.toString()}`);
            }}
          >
            Comprar Ingressos <Ticket size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
