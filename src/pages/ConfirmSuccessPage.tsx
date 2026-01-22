import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ConfirmSuccessPage = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative flex items-center justify-center p-4 overflow-hidden bg-background">
      {/* Background blobs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md z-10"
      >
        <div className="bg-background/40 backdrop-blur-xl border border-white/10 dark:border-white/5 rounded-3xl p-8 shadow-2xl text-center">
          <div className="mb-6 flex justify-center">
            <div className="bg-green-500/20 p-4 rounded-full">
              <CheckCircle2 className="w-12 h-12 text-green-500" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/50">
            {t.auth.confirmTitle}
          </h1>
          
          <p className="text-muted-foreground mb-8">
            {t.auth.confirmSubtitle}
          </p>

          <Button 
            onClick={() => navigate("/")}
            className="w-full h-12 rounded-xl bg-primary hover:primary/90 text-primary-foreground font-semibold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
          >
            {t.auth.backToLogin}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmSuccessPage;
