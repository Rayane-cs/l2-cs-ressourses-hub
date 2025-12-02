import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Suspense, lazy } from "react";
import Index from "./pages/Index";
import Intro from "./components/Intro";

// Lazy load route components for better code splitting
const YearPage = lazy(() => import("./pages/YearPage"));
const ModulePage = lazy(() => import("./pages/ModulePage"));
const LanguagePage = lazy(() => import("./pages/LanguagePage"));
const ProgrammingLanguage = lazy(() => import("./pages/ProgrammingLanguage"));
const Search = lazy(() => import("./pages/Search"));
const About = lazy(() => import("./pages/About"));
const Feedback = lazy(() => import("./pages/Feedback"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-foreground">Loading...</div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/home" element={<Index />} />
          <Route path="/year/:yearSlug" element={<Suspense fallback={<LoadingFallback />}><YearPage /></Suspense>} />
          <Route path="/module/:moduleSlug" element={<Suspense fallback={<LoadingFallback />}><ModulePage /></Suspense>} />
          <Route path="/programming/:languageSlug" element={<Suspense fallback={<LoadingFallback />}><LanguagePage /></Suspense>} />
          <Route path="/programming-language/:lang" element={<Suspense fallback={<LoadingFallback />}><ProgrammingLanguage /></Suspense>} />
          <Route path="/search" element={<Suspense fallback={<LoadingFallback />}><Search /></Suspense>} />
          <Route path="/about" element={<Suspense fallback={<LoadingFallback />}><About /></Suspense>} />
          <Route path="/feedback" element={<Suspense fallback={<LoadingFallback />}><Feedback /></Suspense>} />
          <Route path="*" element={<Suspense fallback={<LoadingFallback />}><NotFound /></Suspense>} />
        </Routes>
      </BrowserRouter>
      <Analytics />
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
