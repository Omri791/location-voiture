import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import CarsPage from "./pages/cars";
import ClientsPage from "./pages/Clients";
import AgenciesPage from "./pages/Agencies";
import RentalsPage from "./pages/locations";

const queryClient = new QueryClient();

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/cars" element={<CarsPage />} />
          <Route path="/clients" element={<ClientsPage />} />
          <Route path="/agencies" element={<AgenciesPage />} />
          <Route path="/rentals" element={<RentalsPage />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
