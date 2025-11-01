import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { Menu, X, GraduationCap } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasFeedbackSubmitted, setHasFeedbackSubmitted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Check if feedback has been submitted
    const submitted = localStorage.getItem("feedbackSubmitted");
    setHasFeedbackSubmitted(submitted === "true");
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Modules", path: "/#modules" },
    { name: "Search", path: "/search" },
    { name: "About", path: "/about" },
    { name: "Feedback", path: "/feedback", isSpecial: true },
  ];

  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent, path: string) => {
    setIsMobileMenuOpen(false);
    // handle hash links (e.g. "/#modules") and home scroll
    if (path.includes("#")) {
      e.preventDefault();
      const [routePart, hash] = path.split("#");
      const route = routePart === "" ? "/" : routePart;

      if (location.pathname === route) {
        const element = document.getElementById(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          // fallback: scroll to top
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      } else {
        // navigate to the route, then scroll after a short delay to allow the page to render
        navigate(route);
        setTimeout(() => {
          const element = document.getElementById(hash);
          element?.scrollIntoView({ behavior: "smooth" });
        }, 120);
      }
      return;
    }

    if (path === "/") {
      // Home — if already on home, scroll to top; otherwise navigate
      if (location.pathname === "/") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        e.preventDefault();
      }
    }
  };

  return (
    <>
      <style>{`
        @keyframes shine {
          0%, 100% {
            text-shadow: 0 0 8px hsl(217 91% 60% / 0.5),
                         0 0 16px hsl(217 91% 60% / 0.3),
                         0 0 24px hsl(217 91% 60% / 0.2);
          }
          50% {
            text-shadow: 0 0 12px hsl(217 91% 60% / 0.8),
                         0 0 24px hsl(217 91% 60% / 0.6),
                         0 0 36px hsl(217 91% 60% / 0.4);
          }
        }
        
        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 0 0 0 hsl(217 91% 60% / 0.4);
          }
          50% {
            box-shadow: 0 0 0 4px hsl(217 91% 60% / 0),
                        0 0 0 8px hsl(217 91% 60% / 0);
          }
        }
        
        .feedback-shine {
          animation: shine 2s ease-in-out infinite;
          position: relative;
        }
        
        .feedback-shine::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 120%;
          height: 150%;
          background: radial-gradient(circle, hsl(217 91% 60% / 0.1) 0%, transparent 70%);
          animation: pulse-glow 2s ease-in-out infinite;
          pointer-events: none;
          border-radius: 50%;
        }
        
        .feedback-shine:hover {
          animation: shine 0.8s ease-in-out infinite;
        }
      `}</style>
      <header
        className={
          "fixed top-0 left-0 right-0 z-50 transition-smooth bg-background/9 backdrop-blur-md shadow-md"
        }
      >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-primary p-2 rounded-lg group-hover:scale-110 transition-smooth">
            <GraduationCap className="h-6 w-6 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">UHBC L2 CS</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const routeOnly = link.path.includes("#") ? (link.path.split("#")[0] || "/") : link.path;
            const isSpecial = link.isSpecial && !hasFeedbackSubmitted;
            return (
              <Link
                key={link.name}
                to={routeOnly}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-sm font-medium transition-smooth hover:text-primary relative ${
                  location.pathname === routeOnly ? "text-primary" : "text-foreground"
                } ${isSpecial ? "feedback-shine px-3 py-1 rounded-md" : ""}`}
              >
                {link.name}
                {isSpecial && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-2">
          <LanguageToggle />
          <ThemeToggle />
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border animate-fade-in">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => {
              const routeOnly = link.path.includes("#") ? (link.path.split("#")[0] || "/") : link.path;
              const isSpecial = link.isSpecial && !hasFeedbackSubmitted;
              return (
                <Link
                  key={link.name}
                  to={routeOnly}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`text-sm font-medium transition-smooth hover:text-primary relative ${
                    location.pathname === routeOnly ? "text-primary" : "text-foreground"
                  } ${isSpecial ? "feedback-shine px-3 py-1 rounded-md" : ""}`}
                >
                  {link.name}
                  {isSpecial && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
    </>
  );
};

export default Header;
