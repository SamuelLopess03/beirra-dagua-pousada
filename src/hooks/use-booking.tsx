import { useCallback, useState, type ReactNode } from "react";
import { BookingDialog } from "@/components/booking/booking-dialog";
import { BookingContext } from "./booking-context";

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
