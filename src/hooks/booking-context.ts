import { createContext, useContext } from "react";

export type BookingContextValue = {
  openBooking: () => void;
};

export const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBooking deve ser usado dentro de BookingProvider");
  }
  return context;
}
