import { lazy, Suspense, useEffect, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, useLocation, useRoute, Router as WouterRouter } from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookingProvider } from "@/hooks/use-booking";
import { Home } from "@/pages/home";
import NotFound from "@/pages/not-found";

const Quartos = lazy(() =>
  import("@/pages/quartos").then((m) => ({ default: m.Quartos })),
);
const QuartoDetalhe = lazy(() =>
  import("@/pages/quarto-detalhe").then((m) => ({ default: m.QuartoDetalhe })),
);
const Cardapio = lazy(() =>
  import("@/pages/cardapio").then((m) => ({ default: m.Cardapio })),
);
const LittleBeach = lazy(() =>
  import("@/pages/little-beach").then((m) => ({ default: m.LittleBeach })),
);
const TicketCheckout = lazy(() =>
  import("@/pages/ticket-checkout").then((m) => ({ default: m.TicketCheckout })),
);

const queryClient = new QueryClient();

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location]);
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function QuartoRoute() {
  const [, params] = useRoute<{ slug: string }>("/quartos/:slug");
  if (!params) return <NotFound />;
  return <QuartoDetalhe slug={params.slug} />;
}

function Shell() {
  return (
    <BookingProvider>
      <Header />
      <RoutedErrorBoundary>
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/quartos/:slug" component={QuartoRoute} />
            <Route path="/quartos" component={Quartos} />
            <Route path="/cardapio" component={Cardapio} />
            <Route path="/little-beach" component={LittleBeach} />
            <Route path="/ingressos" component={TicketCheckout} />
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </RoutedErrorBoundary>
      <Footer />
    </BookingProvider>
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
