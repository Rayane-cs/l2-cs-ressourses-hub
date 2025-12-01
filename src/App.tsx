import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import Index from "./pages/Index";
import Intro from "./components/Intro";
import YearPage from "./pages/YearPage";
import ModulePage from "./pages/ModulePage";
import LanguagePage from "./pages/LanguagePage";
import ProgrammingLanguage from "./pages/ProgrammingLanguage";
import Search from "./pages/Search";
import About from "./pages/About";
import Feedback from "./pages/Feedback";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Index />} />
          <Route path="/year/:yearSlug" element={<YearPage />} />
          <Route path="/module/:moduleSlug" element={<ModulePage />} />
          <Route path="/programming/:languageSlug" element={<LanguagePage />} />
          <Route path="/programming-language/:lang" element={<ProgrammingLanguage />} />
          <Route path="/search" element={<Search />} />
          <Route path="/about" element={<About />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
