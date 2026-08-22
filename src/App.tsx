import { useEffect, useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookingDialog } from "@/components/booking/booking-dialog";
import { Home } from "@/pages/home";
import { Quartos } from "@/pages/quartos";
import { QuartoDetalhe } from "@/pages/quarto-detalhe";
import { Cardapio } from "@/pages/cardapio";
import { LittleBeach } from "@/pages/little-beach";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function Shell() {
  const [bookingOpen, setBookingOpen] = useState(false);
  const openBooking = () => setBookingOpen(true);

  return (
    <>
      <Header />
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/">
            <Home onBooking={openBooking} />
          </Route>
          <Route path="/quartos/:slug">
            {(params) => (
              <QuartoDetalhe slug={params.slug} onBooking={openBooking} />
            )}
          </Route>
          <Route path="/quartos">
            <Quartos onBooking={openBooking} />
          </Route>
          <Route path="/cardapio" component={Cardapio} />
          <Route path="/little-beach">
            <LittleBeach onBooking={openBooking} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </RoutedErrorBoundary>
      <Footer onBooking={openBooking} />
      {bookingOpen && <BookingDialog onClose={() => setBookingOpen(false)} />}
    </>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Shell />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
