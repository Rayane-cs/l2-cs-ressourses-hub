import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const scrollToModules = () => {
    const modulesSection = document.getElementById("modules");
    modulesSection?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToLanguageModules = () => {
    const LanguagesSection = document.getElementById("languages");
    LanguagesSection?.scrollIntoView({ behavior: "smooth" });
  };
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
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

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="text-foreground">UHBC L2 CS Student Hub</span>
            <br />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              All Your Resources in One Place
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Courses, TDs, TPs and Programming Languages
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              onClick={scrollToModules}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-hover transition-smooth text-lg px-8 py-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              Explore Resources
              <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
            <Button
              size="lg"
              onClick={scrollToLanguageModules}
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-hover transition-smooth text-lg px-8 py-6 animate-fade-in"
              style={{ animationDelay: "0.4s" }}
            >
              Programming Languages
              <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
            </Button>
           </div>
        </div>
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

        /* light - scoped to the hero section (absolute, not fixed) */
        .background {
          position: absolute; /* position relative to the hero container */
          inset: 0; /* top/right/bottom/left = 0 */
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          background: #c1c9d8ff;
          overflow: hidden;
          pointer-events: none; /* let clicks pass through */
          z-index: 0;
          /* soft overall blur + slight opacity for a more subtle backdrop */
          filter: blur(8px);
          opacity: 0.7;
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
          will-change: transform, filter, opacity;
        }

        .background span:nth-child(1) {
          color: #12356d;
          top: 87%;
          left: 69%;
          animation-duration: 368s;
          animation-delay: -85s;
          transform-origin: 21vw -12vh;
          box-shadow: -100vmin 0 12.78344090205648vmin currentColor;
        }
        .background span:nth-child(2) {
          color: #12356d;
          top: 73%;
          left: 99%;
          animation-duration: 16s;
          animation-delay: -377s;
          transform-origin: 24vw -24vh;
          box-shadow: -100vmin 0 13.202715908699183vmin currentColor;
        }
        .background span:nth-child(3) {
          color: #12356d;
          top: 100%;
          left: 98%;
          animation-duration: 204s;
          animation-delay: -134s;
          transform-origin: 19vw 18vh;
          box-shadow: 100vmin 0 12.727050066504724vmin currentColor;
        }
        .background span:nth-child(4) {
          color: #1e88e5;
          top: 61%;
          left: 11%;
          animation-duration: 392s;
          animation-delay: -319s;
          transform-origin: -8vw -1vh;
          box-shadow: 100vmin 0 13.419806335576137vmin currentColor;
        }
        .background span:nth-child(5) {
          color: #1e88e5;
          top: 59%;
          left: 99%;
          animation-duration: 192s;
          animation-delay: -239s;
          transform-origin: 1vw 12vh;
          box-shadow: 100vmin 0 13.359873877292083vmin currentColor;
        }
        .background span:nth-child(6) {
          color: #99d3ff;
          top: 57%;
          left: 73%;
          animation-duration: 389s;
          animation-delay: -303s;
          transform-origin: -23vw 5vh;
          box-shadow: 100vmin 0 12.693657116164388vmin currentColor;
        }
        .background span:nth-child(7) {
          color: #12356d;
          top: 41%;
          left: 24%;
          animation-duration: 173s;
          animation-delay: -185s;
          transform-origin: -8vw 20vh;
          box-shadow: 100vmin 0 13.087698239462837vmin currentColor;
        }
        .background span:nth-child(8) {
          color: #99d3ff;
          top: 27%;
          left: 30%;
          animation-duration: 65s;
          animation-delay: -388s;
          transform-origin: -21vw 17vh;
          box-shadow: 100vmin 0 12.742515550751909vmin currentColor;
        }
        .background span:nth-child(9) {
          color: #1e88e5;
          top: 29%;
          left: 25%;
          animation-duration: 218s;
          animation-delay: -141s;
          transform-origin: 0vw -18vh;
          box-shadow: 100vmin 0 13.327753864392694vmin currentColor;
        }
        .background span:nth-child(10) {
          color: #99d3ff;
          top: 12%;
          left: 93%;
          animation-duration: 218s;
          animation-delay: -191s;
          transform-origin: 6vw 8vh;
          box-shadow: 100vmin 0 12.575029273903803vmin currentColor;
        }
        .background span:nth-child(11) {
          color: #1e88e5;
          top: 39%;
          left: 21%;
          animation-duration: 111s;
          animation-delay: -368s;
          transform-origin: -4vw -16vh;
          box-shadow: 100vmin 0 12.745994981507462vmin currentColor;
        }
        .background span:nth-child(12) {
          color: #12356d;
          top: 62%;
          left: 97%;
          animation-duration: 130s;
          animation-delay: -253s;
          transform-origin: -14vw 13vh;
          box-shadow: -100vmin 0 13.098187455528766vmin currentColor;
        }
        .background span:nth-child(13) {
          color: #1e88e5;
          top: 47%;
          left: 44%;
          animation-duration: 94s;
          animation-delay: -111s;
          transform-origin: 4vw -1vh;
          box-shadow: -100vmin 0 13.20069519503441vmin currentColor;
        }
        .background span:nth-child(14) {
          color: #1e88e5;
          top: 97%;
          left: 84%;
          animation-duration: 214s;
          animation-delay: -14s;
          transform-origin: 8vw 24vh;
          box-shadow: -100vmin 0 12.66497200523066vmin currentColor;
        }

        /* dark */
  .dark .background { background: #21273f; }

        .dark .background span:nth-child(1) {
          color: #99d3ff;
          top: 47%;
          left: 8%;
          animation-duration: 266s;
          animation-delay: -107s;
          transform-origin: -22vw 14vh;
          box-shadow: 100vmin 0 13.165173815008519vmin currentColor;
        }
        .dark .background span:nth-child(2) {
          color: #99d3ff;
          top: 92%;
          left: 50%;
          animation-duration: 70s;
          animation-delay: -366s;
          transform-origin: -1vw 12vh;
          box-shadow: 100vmin 0 12.789811316407455vmin currentColor;
        }
        .dark .background span:nth-child(3) {
          color: #1e88e5;
          top: 96%;
          left: 55%;
          animation-duration: 368s;
          animation-delay: -407s;
          transform-origin: -24vw -16vh;
          box-shadow: 100vmin 0 12.975259106050522vmin currentColor;
        }
        .dark .background span:nth-child(4) {
          color: #1e88e5;
          top: 72%;
          left: 24%;
          animation-duration: 368s;
          animation-delay: -32s;
          transform-origin: -16vw -23vh;
          box-shadow: -100vmin 0 12.518427511154718vmin currentColor;
        }
        .dark .background span:nth-child(5) {
          color: #12356d;
          top: 30%;
          left: 4%;
          animation-duration: 43s;
          animation-delay: -294s;
          transform-origin: -7vw 16vh;
          box-shadow: -100vmin 0 12.576744271167946vmin currentColor;
        }
        .dark .background span:nth-child(6) {
          color: #1e88e5;
          top: 26%;
          left: 20%;
          animation-duration: 426s;
          animation-delay: -304s;
          transform-origin: 8vw 10vh;
          box-shadow: 100vmin 0 12.977988055822989vmin currentColor;
        }
        .dark .background span:nth-child(7) {
          color: #99d3ff;
          top: 100%;
          left: 35%;
          animation-duration: 171s;
          animation-delay: -18s;
          transform-origin: 6vw 3vh;
          box-shadow: 100vmin 0 12.853195585193998vmin currentColor;
        }
        .dark .background span:nth-child(8) {
          color: #1e88e5;
          top: 86%;
          left: 43%;
          animation-duration: 323s;
          animation-delay: -269s;
          transform-origin: -19vw -5vh;
          box-shadow: -100vmin 0 12.994274259033778vmin currentColor;
        }
        .dark .background span:nth-child(9) {
          color: #1e88e5;
          top: 66%;
          left: 58%;
          animation-duration: 424s;
          animation-delay: -50s;
          transform-origin: -2vw 14vh;
          box-shadow: -100vmin 0 13.490379248714213vmin currentColor;
        }
        .dark .background span:nth-child(10) {
          color: #12356d;
          top: 94%;
          left: 32%;
          animation-duration: 188s;
          animation-delay: -144s;
          transform-origin: -17vw 3vh;
          box-shadow: -100vmin 0 13.296260759859155vmin currentColor;
        }
        .dark .background span:nth-child(11) {
          color: #12356d;
          top: 42%;
          left: 53%;
          animation-duration: 340s;
          animation-delay: -342s;
          transform-origin: 20vw 15vh;
          box-shadow: -100vmin 0 13.19439871376996vmin currentColor;
        }
        .dark .background span:nth-child(12) {
          color: #1e88e5;
          top: 33%;
          left: 60%;
          animation-duration: 268s;
          animation-delay: -364s;
          transform-origin: 13vw -22vh;
          box-shadow: 100vmin 0 12.839273438682564vmin currentColor;
        }
        .dark .background span:nth-child(13) {
          color: #12356d;
          top: 34%;
          left: 37%;
          animation-duration: 176s;
          animation-delay: -174s;
          transform-origin: 4vw -8vh;
          box-shadow: -100vmin 0 12.614037497184068vmin currentColor;
        }
        .dark .background span:nth-child(14) {
          color: #99d3ff;
          top: 74%;
          left: 39%;
          animation-duration: 27s;
          animation-delay: -106s;
          transform-origin: -16vw 22vh;
          box-shadow: -100vmin 0 12.540921546396266vmin currentColor;
        }
      `}</style>
    </section>
  );
};

export default Hero;
