import { useEffect, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, useLocation, Router as WouterRouter } from "wouter";
import { ErrorBoundary } from "@/components/error-boundary";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { BookingProvider } from "@/hooks/use-booking";
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
  return (
    <BookingProvider>
      <Header />
      <RoutedErrorBoundary>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/quartos/:slug">
            {(params) => <QuartoDetalhe slug={params.slug} />}
          </Route>
          <Route path="/quartos" component={Quartos} />
          <Route path="/cardapio" component={Cardapio} />
          <Route path="/little-beach" component={LittleBeach} />
          <Route component={NotFound} />
        </Switch>
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
