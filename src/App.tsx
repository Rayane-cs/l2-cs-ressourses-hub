import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Analytics } from "@vercel/analytics/react";
import { Suspense, lazy, useState } from "react";
import Index from "./pages/Index";
import SplashScreen from "./components/SplashScreen";
import WelcomePopup from "./components/WelcomePopup";
import { AnimatePresence } from "framer-motion";
import { useAntiDevTools } from "./hooks/useAntiDevTools";

// Lazy load route components for better code splitting
const YearPage = lazy(() => import("./pages/YearPage"));
const ModulePage = lazy(() => import("./pages/ModulePage"));
const LanguagePage = lazy(() => import("./pages/LanguagePage"));
const ProgrammingLanguage = lazy(() => import("./pages/ProgrammingLanguage"));
const ProgrammingLanguagesHub = lazy(() => import("./pages/ProgrammingLanguagesHub"));
const ProgrammingLanguageDetail = lazy(() => import("./pages/ProgrammingLanguageDetail"));
const Search = lazy(() => import("./pages/Search"));
const About = lazy(() => import("./pages/About"));
const Feedback = lazy(() => import("./pages/Feedback"));
const AuthPage = lazy(() => import("./pages/AuthPage"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));
const ConfirmSuccessPage = lazy(() => import("./pages/ConfirmSuccessPage"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-pulse text-foreground">Loading...</div>
  </div>
);

import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";

// Auth Guard Wrapper
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isGuest, loading } = useAuth();
  
  if (loading) return <LoadingFallback />;
  if (!user && !isGuest) return <Navigate to="/auth" replace />;
  
  return <>{children}</>;
};

const App = () => {
  useAntiDevTools();
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <AnimatePresence mode="wait">
          {showSplash && (
            <SplashScreen onComplete={() => setShowSplash(false)} />
          )}
        </AnimatePresence>
        <WelcomePopup />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Suspense fallback={<LoadingFallback />}><AuthPage /></Suspense>} />
            <Route path="/confirm-success" element={<Suspense fallback={<LoadingFallback />}><ConfirmSuccessPage /></Suspense>} />
            <Route path="/profile" element={<AuthGuard><Suspense fallback={<LoadingFallback />}><ProfilePage /></Suspense></AuthGuard>} />
            <Route path="/" element={<AuthGuard><Index /></AuthGuard>} />
            <Route path="/home" element={<AuthGuard><Index /></AuthGuard>} />
            <Route path="/year/:yearSlug" element={<AuthGuard><Suspense fallback={<LoadingFallback />}><YearPage /></Suspense></AuthGuard>} />
            <Route path="/module/:moduleSlug" element={<AuthGuard><Suspense fallback={<LoadingFallback />}><ModulePage /></Suspense></AuthGuard>} />
            <Route path="/programming-languages" element={<AuthGuard><Suspense fallback={<LoadingFallback />}><ProgrammingLanguagesHub /></Suspense></AuthGuard>} />
            <Route path="/programming-languages/:lang" element={<AuthGuard><Suspense fallback={<LoadingFallback />}><ProgrammingLanguageDetail /></Suspense></AuthGuard>} />
            <Route path="/programming-language/:lang" element={<AuthGuard><Suspense fallback={<LoadingFallback />}><ProgrammingLanguage /></Suspense></AuthGuard>} />
            <Route path="/search" element={<AuthGuard><Suspense fallback={<LoadingFallback />}><Search /></Suspense></AuthGuard>} />
            <Route path="/about" element={<AuthGuard><Suspense fallback={<LoadingFallback />}><About /></Suspense></AuthGuard>} />
            <Route path="/feedback" element={<AuthGuard><Suspense fallback={<LoadingFallback />}><Feedback /></Suspense></AuthGuard>} />
            <Route path="*" element={<Suspense fallback={<LoadingFallback />}><NotFound /></Suspense>} />
          </Routes>
        </BrowserRouter>
        <Analytics />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
