import { useCallback, useState, type ReactNode } from "react";
import { BookingDialog } from "@/components/booking/booking-dialog";
import { BookingContext } from "./booking-context";
import type { Room } from "@/data/rooms";

export function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState<Room | undefined>();
  const openBooking = useCallback((room?: Room) => {
    setSelectedRoom(room);
    setIsOpen(true);
  }, []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      {isOpen && (
        <BookingDialog
          room={selectedRoom}
          onClose={() => {
            setIsOpen(false);
            setSelectedRoom(undefined);
          }}
        />
      )}
    </BookingContext.Provider>
  );
}
