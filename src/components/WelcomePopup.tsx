import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useUserConfig } from "@/hooks/useUserConfig";
import { X, PartyPopper } from "lucide-react";

export default function WelcomePopup() {
  const { profile, isGuest } = useAuth();
  const userConfig = useUserConfig();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isGuest || !profile?.id || !userConfig) {
      setOpen(false);
      return;
    }

    const storageKey = `welcome-shown-${profile.id}`;
    const alreadyShown = localStorage.getItem(storageKey) === "true";

    if (!alreadyShown) {
      // Small delay so it doesn't clash with the splash screen
      const timer = setTimeout(() => setOpen(true), 800);
      return () => clearTimeout(timer);
    }
  }, [isGuest, profile?.id, userConfig]);

  const handleClose = () => {
    if (profile?.id) {
      localStorage.setItem(`welcome-shown-${profile.id}`, "true");
    }
    setOpen(false);
  };

  if (!userConfig || !profile) return null;

  const name = userConfig.displayName || profile.full_name || profile.username || "Friend";
  const message =
    userConfig.welcomeMessage ||
    `Welcome ${name}, happy to have you here!`;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.85, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.85, y: 20, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative w-full max-w-sm bg-card border border-border/60 rounded-3xl p-8 shadow-2xl text-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-muted transition-colors"
            >
              <X className="w-4 h-4 text-muted-foreground" />
            </button>

            {/* Icon */}
            <div className="mx-auto w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
              <PartyPopper className="w-8 h-8 text-primary" />
            </div>

            {/* Title */}
            <h3 className="text-2xl font-black italic tracking-tight mb-3">
              Welcome back, <span className="text-primary not-italic">{name}</span>!
            </h3>

            {/* Message */}
            <p className="text-muted-foreground leading-relaxed mb-6">
              {message}
            </p>

            {/* Action */}
            <button
              onClick={handleClose}
              className="inline-flex items-center justify-center px-6 py-2.5 rounded-xl bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              Let&apos;s go
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
