import { Button } from "./ui/button";
import { ArrowDown } from "lucide-react";

const Hero = () => {
  const scrollToModules = () => {
    const modulesSection = document.getElementById("modules");
    modulesSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 pb-10 overflow-hidden">
      <div className="absolute inset-0 gradient-hero opacity-20 animate-pulse" />
      
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-primary/5 rounded-full blur-2xl animate-pulse" />
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
            Courses, TDs and TPs
          </p>

          <Button
            size="lg"
            onClick={scrollToModules}
            className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-glow hover:shadow-hover transition-smooth text-lg px-8 py-6 animate-fade-in"
            style={{ animationDelay: "0.4s" }}
          >
            Explore Resources
            <ArrowDown className="ml-2 h-5 w-5 animate-bounce" />
          </Button>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default Hero;
