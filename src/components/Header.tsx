import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, GraduationCap } from "lucide-react";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Modules", path: "/#modules" },
    { name: "Search", path: "/search" },
    { name: "About", path: "/about" },
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
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-smooth ${
        isScrolled
          ? "bg-background/95 backdrop-blur-md shadow-md"
          : "bg-transparent"
      }`}
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
            return (
              <Link
                key={link.name}
                to={routeOnly}
                onClick={(e) => handleNavClick(e, link.path)}
                className={`text-sm font-medium transition-smooth hover:text-primary ${
                  location.pathname === routeOnly ? "text-primary" : "text-foreground"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </nav>

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
              return (
                <Link
                  key={link.name}
                  to={routeOnly}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`text-sm font-medium transition-smooth hover:text-primary ${
                    location.pathname === routeOnly ? "text-primary" : "text-foreground"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
