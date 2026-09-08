import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface DoubleCalendarProps {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  initialDate?: Date | null;
}

export function DoubleCalendar({ selectedDate, onSelectDate, initialDate }: DoubleCalendarProps) {
  // Start showing the month that contains the initialDate (or today)
  const startDate = initialDate ?? new Date();

  const [currentMonthIndex, setCurrentMonthIndex] = useState(startDate.getMonth());
  const [currentYear, setCurrentYear] = useState(startDate.getFullYear());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const monthNames = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];
  
  const nextMonth = () => {
    if (currentMonthIndex === 11) {
      setCurrentMonthIndex(0);
      setCurrentYear(prev => prev + 1);
    } else {
      setCurrentMonthIndex(prev => prev + 1);
    }
  };

  const prevMonth = () => {
    // Don't go before the current real month
    const isFirstAllowedMonth = currentMonthIndex === today.getMonth() && currentYear === today.getFullYear();
    if (isFirstAllowedMonth) return;

    if (currentMonthIndex === 0) {
      setCurrentMonthIndex(11);
      setCurrentYear(prev => prev - 1);
    } else {
      setCurrentMonthIndex(prev => prev - 1);
    }
  };

  const renderMonth = (monthOffset: number) => {
    let month = currentMonthIndex + monthOffset;
    let year = currentYear;
    
    if (month > 11) {
      month -= 12;
      year += 1;
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    return (
      <div className="ticket-month-container" key={`${year}-${month}`}>
        <div className="ticket-month-title">
          {monthNames[month]} {year}
        </div>
        <div className="ticket-calendar-grid">
          {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day) => (
            <div key={day} className="ticket-weekday">{day}</div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="ticket-day-btn empty" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const thisDate = new Date(year, month, day);
            thisDate.setHours(0, 0, 0, 0);
            const isPast = thisDate < today;

            const dateStr = thisDate.toDateString();
            const isSelected = selectedDate?.toDateString() === dateStr;

            if (isPast) {
              return (
                <div key={day} className="ticket-day-btn empty ticket-day-past">
                  <span className="ticket-day-number">{day}</span>
                </div>
              );
            }

            const dayOfWeek = thisDate.getDay();
            let price = 250;
            let priceClass = "price-normal";

            if (dayOfWeek === 2 || dayOfWeek === 3) {
              price = 220;
              priceClass = "price-low";
            } else if (dayOfWeek === 0 || dayOfWeek === 6) {
              price = 295;
              priceClass = "price-high";
            }

            return (
              <button 
                key={day}
                className={`ticket-day-btn ${priceClass} ${isSelected ? 'selected' : ''}`}
                onClick={() => onSelectDate(thisDate)}
              >
                <span className="ticket-day-number">{day}</span>
                <span className="ticket-day-price">{price}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  const isFirstAllowedMonth = currentMonthIndex === today.getMonth() && currentYear === today.getFullYear();

  return (
    <div className="ticket-calendar-section">
      <div className="ticket-calendar-header">
        <h2>Escolha a data e os ingressos da sua visita</h2>
        <span className="ticket-calendar-link">Voltar para a escolha do parque</span>
      </div>
      
      <div className="ticket-calendar-wrapper">
        <button
          className={`ticket-calendar-nav-btn prev ${isFirstAllowedMonth ? 'disabled' : ''}`}
          onClick={prevMonth}
          disabled={isFirstAllowedMonth}
        >
          <ChevronLeft size={20} />
        </button>
        
        {renderMonth(0)}
        {renderMonth(1)}

        <button className="ticket-calendar-nav-btn next" onClick={nextMonth}>
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="ticket-calendar-legend">
        <div className="ticket-legend-item">
          <div className="ticket-legend-color low" />
          <span>Menor preço (R$ 220,00)</span>
        </div>
        <div className="ticket-legend-item">
          <div className="ticket-legend-color normal" />
          <span>Preço médio (R$ 250,00)</span>
        </div>
        <div className="ticket-legend-item">
          <div className="ticket-legend-color high" />
          <span>Alta demanda (R$ 295,00)</span>
        </div>
      </div>
    </div>
  );
}
