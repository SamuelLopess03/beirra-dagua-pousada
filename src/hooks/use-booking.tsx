import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { BookingDialog } from "@/components/booking/booking-dialog";

type BookingContextValue = {
  openBooking: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const openBooking = useCallback(() => setIsOpen(true), []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      {isOpen && <BookingDialog onClose={() => setIsOpen(false)} />}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking deve ser usado dentro de BookingProvider");
  }
  return context;
}
