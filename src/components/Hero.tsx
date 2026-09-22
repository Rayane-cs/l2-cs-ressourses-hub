import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { ArrowDown, X, Layers, Code2, Box, FileText } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useThemeColor } from "@/contexts/ThemeColorContext";
import { motion } from "framer-motion";

const Hero = () => {
  const { t } = useLanguage();
  const { themeColor } = useThemeColor();
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  useEffect(() => {
    const hasSeenAnnouncement = localStorage.getItem("search-announcement-seen");
    if (!hasSeenAnnouncement) {
      setShowAnnouncement(true);
    }
  }, []);

  const dismissAnnouncement = () => {
    setShowAnnouncement(false);
    localStorage.setItem("search-announcement-seen", "true");
  };

  const scrollToYears = () => {
    const yearsSection = document.getElementById("years");
    yearsSection?.scrollIntoView({ behavior: "smooth" });
  };

  // Dynamic filter to shift public/image.png (blue base) to match the active color theme
  const themeFilters: Record<string, string> = {
    blue: "hue-rotate(0deg) saturate(100%) brightness(1)",
    green: "hue-rotate(-75deg) saturate(125%) brightness(0.95)",
    pink: "hue-rotate(115deg) saturate(135%) brightness(1.05)",
    red: "hue-rotate(142deg) saturate(145%) brightness(0.92)",
  };

  const activeFilter = themeFilters[themeColor] || themeFilters.pink;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-20 pb-10 overflow-hidden">
      {/* Hero Background Image with Theme-Adaptive Filters */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <img
          src="/image.png"
          alt=""
          className="w-full h-full object-cover object-center transition-[filter] duration-700 ease-out"
          style={{ filter: activeFilter }}
        />
        {/* Dynamic theme tint overlay */}
        <div className="absolute inset-0 bg-primary/10 mix-blend-color pointer-events-none transition-colors duration-700" />
        {/* Contrast and blend overlays */}
        <div className="absolute inset-0 bg-background/50 dark:bg-[#07090e]/60 backdrop-blur-[1px] transition-colors duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background/70 transition-colors duration-700" />
      </div>

      <div className="container mx-auto px-4 relative z-10 flex-1 flex flex-col items-center justify-center">
        <div className="min-h-[88px] w-full flex justify-center mb-6">
          {showAnnouncement && (
            <Alert className="max-w-2xl mx-auto animate-fade-in">
              <AlertTitle className="flex items-center justify-between">
                {t.hero.announcementTitle}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={dismissAnnouncement}
                  className="h-auto p-1 hover:bg-transparent"
                >
                  <X className="h-4 w-4" />
                </Button>
              </AlertTitle>
              <AlertDescription>
                {t.hero.announcementDesc}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">{t.hero.title}</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              All Your Resources
            </span>

            {/* Inline CSS-driven vertical scroller (CSS-only, infinite loop) */}
            <span className="inline-block scroller align-middle relative overflow-hidden text-5xl md:text-7xl leading-none" aria-hidden={false}>
              <div className="words" aria-live="polite">
                <div className="word text-white font-extrabold">- {t.hero.courses} -</div>
                <div className="word text-amber-100 font-extrabold">- TD -</div>
                <div className="word text-lime-100 font-extrabold">- TP -</div>
                <div className="word text-sky-100 font-extrabold">- {t.tabs.exam} -</div>
                <div className="word text-pink-100 font-extrabold">- {t.hero.codes} -</div>
                {/* duplicate sequence for seamless loop */}
                <div className="word text-white font-extrabold">- {t.hero.courses} -</div>
                <div className="word text-amber-100 font-extrabold">- TD -</div>
                <div className="word text-lime-100 font-extrabold">- TP -</div>
                <div className="word text-sky-100 font-extrabold">- {t.tabs.exam} -</div>
                <div className="word text-pink-100 font-extrabold">- {t.hero.codes} -</div>
              </div>
            </span>

            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">in One Place</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.hero.subtitle}
          </p>

          {/* Interactive Explore Area with Theme-Adaptive Floating Tiny Squares */}
          <div className="relative w-full max-w-xl mx-auto py-8 min-h-[140px] flex items-center justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            {/* 1. Floating square: Database / Layers Stack (Left) */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute left-2 sm:left-6 md:left-8 top-1 sm:-top-2 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-card/40 dark:bg-[#0c101d]/60 border border-primary/30 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-primary/15 hover:scale-110 hover:border-primary/60 transition-all cursor-default"
              style={{
                boxShadow: "0 0 20px -2px hsl(var(--primary) / 0.2)",
              }}
            >
              <Layers className="w-5 h-5 text-primary" />
            </motion.div>

            {/* 2. Floating square: Code2 (Lower Left) */}
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              className="absolute left-10 sm:left-20 md:left-22 bottom-0 sm:bottom-1 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-card/40 dark:bg-[#0c101d]/60 border border-primary/30 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-primary/15 hover:scale-110 hover:border-primary/60 transition-all cursor-default"
              style={{
                boxShadow: "0 0 20px -2px hsl(var(--primary) / 0.2)",
              }}
            >
              <Code2 className="w-5 h-5 text-primary" />
            </motion.div>

            {/* 3. Floating square: 3D Box (Upper Left near button) */}
            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 1.4 }}
              className="hidden sm:flex absolute left-32 md:left-38 -top-3 w-9 h-9 rounded-xl bg-card/40 dark:bg-[#0c101d]/60 border border-primary/25 backdrop-blur-xl items-center justify-center shadow-md shadow-primary/10 hover:scale-110 hover:border-primary/60 transition-all cursor-default"
              style={{
                boxShadow: "0 0 15px -2px hsl(var(--primary) / 0.15)",
              }}
            >
              <Box className="w-4 h-4 text-primary" />
            </motion.div>

            {/* Center Pill Button: EXPLORE RESOURCES NOW */}
            <button
              onClick={scrollToYears}
              className="relative z-10 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-background/50 dark:bg-[#0c101d]/75 border border-primary/50 hover:border-primary text-foreground text-xs sm:text-sm font-black uppercase tracking-widest backdrop-blur-xl shadow-[0_0_25px_hsl(var(--primary)/0.35)] hover:shadow-[0_0_40px_hsl(var(--primary)/0.6)] hover:bg-primary/15 transition-all duration-300 flex items-center gap-2.5 group cursor-pointer"
            >
              <span>{t.hero.exploreNow ? t.hero.exploreNow.toUpperCase() : "EXPLORE RESOURCES NOW"}</span>
              <ArrowDown className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
            </button>

            {/* 4. Floating square: Document FileText (Upper Right near button) */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="hidden sm:flex absolute right-32 md:right-38 -top-3 w-9 h-9 rounded-xl bg-card/40 dark:bg-[#0c101d]/60 border border-primary/25 backdrop-blur-xl items-center justify-center shadow-md shadow-primary/10 hover:scale-110 hover:border-primary/60 transition-all cursor-default"
              style={{
                boxShadow: "0 0 15px -2px hsl(var(--primary) / 0.15)",
              }}
            >
              <FileText className="w-4 h-4 text-primary" />
            </motion.div>

            {/* 5. Floating square: fx Math Function (Mid Right) */}
            <motion.div
              animate={{ y: [0, -11, 0] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut", delay: 1.1 }}
              className="absolute right-2 sm:right-6 md:right-8 top-1 sm:-top-2 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-card/40 dark:bg-[#0c101d]/60 border border-primary/30 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-primary/15 hover:scale-110 hover:border-primary/60 transition-all cursor-default"
              style={{
                boxShadow: "0 0 20px -2px hsl(var(--primary) / 0.2)",
              }}
            >
              <span className="font-serif italic font-bold text-base text-primary select-none">fx</span>
            </motion.div>

            {/* 6. Floating square: TDs Tutorials (Lower Right) */}
            <motion.div
              animate={{ y: [0, 9, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.7 }}
              className="absolute right-10 sm:right-20 md:right-22 bottom-0 sm:bottom-1 w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-card/40 dark:bg-[#0c101d]/60 border border-primary/30 backdrop-blur-xl flex items-center justify-center shadow-lg shadow-primary/15 hover:scale-110 hover:border-primary/60 transition-all cursor-default"
              style={{
                boxShadow: "0 0 20px -2px hsl(var(--primary) / 0.2)",
              }}
            >
              <span className="font-mono font-bold text-xs tracking-wider uppercase text-primary select-none">TDs</span>
            </motion.div>
          </div>
        </div>
      </div>

      <style>{`
        /* CSS vertical scroller styles (template-based) */
        .scroller { height: 1em; overflow: hidden; display: inline-block; vertical-align: middle; }
        .words {
          display: flex;
          flex-direction: column;
          will-change: transform;
          animation: scroll-words 17.5s ease-in-out infinite;
        }

        .word {
          height: 1em;
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        @keyframes scroll-words {
          0% { transform: translateY(0%); }
          16% { transform: translateY(0%); }
          20% { transform: translateY(-10%); }
          36% { transform: translateY(-10%); }
          40% { transform: translateY(-20%); }
          56% { transform: translateY(-20%); }
          60% { transform: translateY(-30%); }
          76% { transform: translateY(-30%); }
          80% { transform: translateY(-40%); }
          96% { transform: translateY(-40%); }
          100% { transform: translateY(-50%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .words { animation: none !important; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
