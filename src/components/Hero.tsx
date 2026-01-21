import { Alert, AlertTitle, AlertDescription } from "./ui/alert";
import { ArrowDown, X } from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  const [showAnnouncement, setShowAnnouncement] = useState(false);

  // CSS-driven scrolling categories (no JS interval)

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

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-between pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0">
        <div className="background" aria-hidden>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>

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

            {/* Inline CSS-driven vertical scroller (CSS-only, infinite loop)
                Wrapper uses same font size as title so the scroller height equals title baseline */}
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

          <p className="text-xl md:text-2xl text-muted-foreground mb-12 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {t.hero.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 flex justify-center pb-10 animate-fade-in" style={{ animationDelay: "0.4s" }}>
        <button onClick={scrollToYears} className="flex flex-col items-center gap-2 group hover:opacity-70 transition-opacity">
          <span className="text-sm text-muted-foreground">{t.hero.exploreNow}</span>
          <ArrowDown className="h-6 w-6 text-primary motion-safe:animate-bounce" />
        </button>
      </div>

      <style>{`
        /* floating helpers (kept for small motion elsewhere) */
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float { animation: float 6s ease-in-out infinite; }

        /* Integrated animated background */
        @keyframes move {
          100% { transform: translate3d(0, 0, 1px) rotate(360deg); }
        }

        /* Scoped to the hero section - Dynamic Theme using CSS Variables */
        .background {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: var(--hero-bg);
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
          filter: blur(8px);
          opacity: 0.7;
          transition: background-color 0.3s ease;
        }

        .background span {
          width: 50vmin;
          height: 50vmin;
          border-radius: 50vmin;
          backface-visibility: hidden;
          position: absolute;
          animation: move linear infinite;
          animation-duration: 6s;
          animation-timing-function: linear;
          filter: blur(36px);
          opacity: 0.80;
          transition: color 0.3s ease;
        }

        .background span:nth-child(1) {
          color: var(--hero-c1);
          top: 87%;
          left: 69%;
          animation-duration: 368s;
          animation-delay: -85s;
          transform-origin: 21vw -12vh;
          box-shadow: -100vmin 0 12.78344090205648vmin currentColor;
        }
        .background span:nth-child(2) {
          color: var(--hero-c1);
          top: 73%;
          left: 99%;
          animation-duration: 16s;
          animation-delay: -377s;
          transform-origin: 24vw -24vh;
          box-shadow: -100vmin 0 13.202715908699183vmin currentColor;
        }
        .background span:nth-child(3) {
          color: var(--hero-c2);
          top: 100%;
          left: 98%;
          animation-duration: 204s;
          animation-delay: -134s;
          transform-origin: 19vw 18vh;
          box-shadow: 100vmin 0 12.727050066504724vmin currentColor;
        }
        .background span:nth-child(4) {
          color: var(--hero-c3);
          top: 61%;
          left: 11%;
          animation-duration: 392s;
          animation-delay: -319s;
          transform-origin: -8vw -1vh;
          box-shadow: 100vmin 0 13.419806335576137vmin currentColor;
        }
        .background span:nth-child(5) {
          color: var(--hero-c3);
          top: 59%;
          left: 99%;
          animation-duration: 192s;
          animation-delay: -239s;
          transform-origin: 1vw 12vh;
          box-shadow: 100vmin 0 13.359873877292083vmin currentColor;
        }
        .background span:nth-child(6) {
          color: var(--hero-c4);
          top: 57%;
          left: 73%;
          animation-duration: 389s;
          animation-delay: -303s;
          transform-origin: -23vw 5vh;
          box-shadow: 100vmin 0 12.693657116164388vmin currentColor;
        }
        .background span:nth-child(7) {
          color: var(--hero-c1);
          top: 41%;
          left: 24%;
          animation-duration: 173s;
          animation-delay: -185s;
          transform-origin: -8vw 20vh;
          box-shadow: 100vmin 0 13.087698239462837vmin currentColor;
        }
        .background span:nth-child(8) {
          color: var(--hero-c4);
          top: 27%;
          left: 30%;
          animation-duration: 65s;
          animation-delay: -388s;
          transform-origin: -21vw 17vh;
          box-shadow: 100vmin 0 12.742515550751909vmin currentColor;
        }
        .background span:nth-child(9) {
          color: var(--hero-c3);
          top: 29%;
          left: 25%;
          animation-duration: 218s;
          animation-delay: -141s;
          transform-origin: 0vw -18vh;
          box-shadow: 100vmin 0 13.327753864392694vmin currentColor;
        }
        .background span:nth-child(10) {
          color: var(--hero-c4);
          top: 12%;
          left: 93%;
          animation-duration: 218s;
          animation-delay: -191s;
          transform-origin: 6vw 8vh;
          box-shadow: 100vmin 0 12.575029273903803vmin currentColor;
        }
        .background span:nth-child(11) {
          color: var(--hero-c3);
          top: 39%;
          left: 21%;
          animation-duration: 111s;
          animation-delay: -368s;
          transform-origin: -4vw -16vh;
          box-shadow: 100vmin 0 12.745994981507462vmin currentColor;
        }
        .background span:nth-child(12) {
          color: var(--hero-c1);
          top: 62%;
          left: 97%;
          animation-duration: 130s;
          animation-delay: -253s;
          transform-origin: -14vw 13vh;
          box-shadow: -100vmin 0 13.098187455528766vmin currentColor;
        }
        .background span:nth-child(13) {
          color: var(--hero-c2);
          top: 47%;
          left: 44%;
          animation-duration: 94s;
          animation-delay: -111s;
          transform-origin: 4vw -1vh;
          box-shadow: -100vmin 0 13.20069519503441vmin currentColor;
        }
        .background span:nth-child(14) {
          color: var(--hero-c3);
          top: 97%;
          left: 84%;
          animation-duration: 214s;
          animation-delay: -14s;
          transform-origin: 8vw 24vh;
          box-shadow: -100vmin 0 12.66497200523066vmin currentColor;
        }

        /* CSS vertical scroller styles (template-based) */
        .scroller { height: 1em; overflow: hidden; display: inline-block; vertical-align: middle; }
        .words {
          display: flex;
          flex-direction: column;
          will-change: transform;
          /* duration: 5 items * 3.5s per item = 17.5s; use keyframes with pauses for smooth vertical step + scroll */
          animation: scroll-words 17.5s ease-in-out infinite;
        }

        .word {
          height: 1em; /* match the current font-size / line-height of the wrapper */
          display: flex;
          align-items: center;
          justify-content: center;
          line-height: 1;
        }

        /* Keyframes create a pause on each item then a short smooth transition to the next */
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
