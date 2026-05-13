import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { Menu, X, GraduationCap, LogOut, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { useUserConfig } from "@/hooks/useUserConfig";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/dropdown-menu";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasFeedbackSubmitted, setHasFeedbackSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMoreOpen, setIsMobileMoreOpen] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openDropdown = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    setIsDropdownOpen(true);
  };

  const closeDropdown = () => {
    closeTimerRef.current = setTimeout(() => setIsDropdownOpen(false), 150);
  };

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);
  const location = useLocation();
  const { t } = useLanguage();
  const { user, isGuest, signOut, profile } = useAuth();
  const userConfig = useUserConfig();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    // Check if feedback has been submitted
    const submitted = localStorage.getItem("feedbackSubmitted");
    setHasFeedbackSubmitted(submitted === "true");
  }, [location.pathname]);

  const allNavLinks = [
    { name: t.nav.home, path: "/home" },
    { name: t.nav.about, path: "/about" },
    { name: t.nav.feedback, path: "/feedback", isSpecial: true },
    { name: t.nav.more, path: "#more", isMore: true },
  ];

  // Apply user config filters
  const navLinks = allNavLinks.filter((link) => {
    if (link.path === "/feedback" && userConfig?.showFeedbackLink === false) return false;
    if (link.path === "/programming-languages" && userConfig?.showProgrammingLanguages === false) return false;
    if (userConfig?.hiddenSections?.includes("programming-languages") && link.path === "/programming-languages") return false;
    return true;
  });

  const navigate = useNavigate();

  const [headerSearchTerm, setHeaderSearchTerm] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (headerSearchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(headerSearchTerm.trim())}`);
      setIsMobileMenuOpen(false);
      setHeaderSearchTerm("");
    }
  };

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
            <span className="text-xl font-bold text-foreground">
              {userConfig?.displayName || "UHBC CS"}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label={t.nav.comingSoon}>
            {navLinks.map((link) => {
              const routeOnly = link.path.includes("#") ? (link.path.split("#")[0] || "/") : link.path;
              const isSpecial = link.isSpecial && !hasFeedbackSubmitted;

              if (link.isMore) {
                return (
                  <div
                    key="more"
                    className="relative"
                    onMouseEnter={openDropdown}
                    onMouseLeave={closeDropdown}
                  >
                    <button
                      className="text-sm font-medium transition-smooth hover:text-primary text-foreground"
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                    >
                      {t.nav.more} ▾
                    </button>

                    <AnimatePresence>
                      {isDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2, ease: "easeOut" }}
                          className="fixed left-1/2 -translate-x-1/2 top-20 w-[min(600px,calc(100vw-4rem))] bg-background border border-border rounded-lg shadow-lg p-6 z-50 origin-top"
                          onMouseEnter={openDropdown}
                          onMouseLeave={closeDropdown}
                        >
                          <div className="grid grid-cols-2 gap-8">
                            {/* Years */}
                            <div>
                              <h4 className="font-semibold mb-4 text-primary text-sm uppercase tracking-wider">Years</h4>
                              <ul className="space-y-2 text-sm">
                                <li>
                                  <Link to="/year/l1" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                                    Licence 1
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/year/l2" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    Licence 2
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/year/l3" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-violet-500" />
                                    Licence 3
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/year/m1" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                                    Master 1
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/year/m2" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-red-500" />
                                    Master 2
                                  </Link>
                                </li>
                              </ul>
                            </div>

                            {/* Programming Languages */}
                            <div>
                              <h4 className="font-semibold mb-4 text-primary text-sm uppercase tracking-wider">Programming Languages</h4>
                              <ul className="space-y-2 text-sm">
                                <li>
                                  <Link to="/programming-languages" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth">
                                    All Languages
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/programming-languages/html-css" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth">
                                    HTML / CSS
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/programming-languages/javascript" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth">
                                    JavaScript
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/programming-languages/python" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth">
                                    Python
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/programming-languages/c" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth">
                                    C
                                  </Link>
                                </li>
                                <li>
                                  <Link to="/programming-languages/assembly" onClick={() => setIsDropdownOpen(false)} className="hover:text-primary transition-smooth">
                                    Assembly
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  to={routeOnly}
                  onClick={(e) => {
                    if (link.disabled) {
                      e.preventDefault();
                      return;
                    }
                    handleNavClick(e, link.path);
                  }}
                  className={`text-sm font-medium transition-smooth hover:text-primary relative ${location.pathname === routeOnly ? "text-primary" : "text-foreground"
                    } ${isSpecial ? "px-3 py-1 rounded-md" : ""} ${link.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                  title={link.disabled ? "Coming soon" : ""}
                >
                  {link.name}
                  {isSpecial && (
                    <span className="absolute -top-1 -right-1 flex h-3 w-3">
                      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:flex items-center gap-2" role="search" aria-label={t.nav.search}>
            <form onSubmit={handleSearchSubmit} className="relative">
              <input
                type="text"
                placeholder={t.nav.search + "..."}
                value={headerSearchTerm}
                onChange={(e) => setHeaderSearchTerm(e.target.value)}
                className="bg-muted/50 border border-transparent focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none rounded-full px-4 py-1.5 text-sm w-40 focus:w-60 transition-all outline-none"
              />
            </form>
            <LanguageToggle />
            <ThemeToggle />
            
            {/* Show Sign Up button for guest users */}
            {isGuest && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/auth?mode=signup")}
                className="rounded-full px-4 h-9"
              >
                Sign Up
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full overflow-hidden border border-border">
                  {user ? (
                    profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || user.email || "U")}&background=random`;
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold">
                        {user.email?.[0].toUpperCase()}
                      </div>
                    )
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[280px] rounded-xl p-2">
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border flex-shrink-0">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {user?.email?.[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-0.5 overflow-hidden">
                      <p className="text-sm font-semibold truncate flex items-center gap-2">
                        {profile?.full_name || (isGuest ? "Guest User" : "User Account")}
                        {profile?.display_id && (
                          <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded-md text-muted-foreground border border-border">
                            id:{profile.display_id}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground truncate" title={user?.email}>
                        {user?.email || "Explore freely"}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                
                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => navigate("/profile")}
                      className="cursor-pointer text-sm font-medium rounded-lg"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-red-500 focus:text-red-500 cursor-pointer text-sm font-medium rounded-lg">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{user ? "Sign Out" : "Exit Guest"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="flex md:hidden items-center gap-2">
            <LanguageToggle />
            <ThemeToggle />
            
            {/* Show Sign Up button for guest users on mobile */}
            {isGuest && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate("/auth?mode=signup")}
                className="rounded-full px-3 h-9 text-xs"
              >
                Sign Up
              </Button>
            )}
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-9 w-9 overflow-hidden border border-border">
                  {user ? (
                    profile?.avatar_url ? (
                      <img 
                        src={profile.avatar_url} 
                        alt="Profile" 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.full_name || user.email || "U")}&background=random`;
                        }}
                      />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-xs">
                        {user.email?.[0].toUpperCase()}
                      </div>
                    )
                  ) : (
                    <User className="h-4 w-4" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[280px] rounded-xl p-2">
                <DropdownMenuLabel className="font-normal p-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-border flex-shrink-0">
                      {profile?.avatar_url ? (
                        <img src={profile.avatar_url} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-lg">
                          {user?.email?.[0].toUpperCase()}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-0.5 overflow-hidden">
                      <p className="text-sm font-semibold truncate flex items-center gap-2">
                        {profile?.full_name || (isGuest ? "Guest User" : "User Account")}
                        {profile?.display_id && (
                          <span className="text-[10px] font-mono bg-muted px-1.5 py-0.5 rounded-md text-muted-foreground border border-border">
                            id:{profile.display_id}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-muted-foreground truncate" title={user?.email}>
                        {user?.email || "Explore freely"}
                      </p>
                    </div>
                  </div>
                </DropdownMenuLabel>
                
                {user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      onClick={() => navigate("/profile")}
                      className="cursor-pointer text-sm font-medium rounded-lg"
                    >
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile Settings</span>
                    </DropdownMenuItem>
                  </>
                )}
                
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()} className="text-red-500 focus:text-red-500 cursor-pointer text-sm font-medium rounded-lg">
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>{user ? "Sign Out" : "Exit Guest"}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? t.nav.comingSoon : t.nav.comingSoon}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden bg-background/98 backdrop-blur-md border-t border-border animate-fade-in">
            <nav className="container mx-auto px-4 py-4 flex flex-col gap-4" role="navigation" aria-label={t.nav.comingSoon}>
              {navLinks.map((link) => {
                const routeOnly = link.path.includes("#") ? (link.path.split("#")[0] || "/") : link.path;
                const isSpecial = link.isSpecial && !hasFeedbackSubmitted;

                // Expandable More section
                if (link.isMore) {
                  return (
                    <div key="more" className="flex flex-col gap-2">
                      <button
                        onClick={() => setIsMobileMoreOpen(!isMobileMoreOpen)}
                        className="text-sm font-medium transition-smooth hover:text-primary text-foreground text-left flex items-center justify-between"
                      >
                        <span>{t.nav.more}</span>
                        <span className={`transition-transform ${isMobileMoreOpen ? "rotate-180" : ""}`}>▾</span>
                      </button>
                      {isMobileMoreOpen && (
                        <div className="pl-4 flex flex-col gap-3 border-l border-border/50 ml-1">
                          {/* Years */}
                          <div>
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Years</h5>
                            <div className="flex flex-col gap-1.5">
                              <Link to="/year/l1" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">Licence 1</Link>
                              <Link to="/year/l2" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">Licence 2</Link>
                              <Link to="/year/l3" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">Licence 3</Link>
                              <Link to="/year/m1" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">Master 1</Link>
                              <Link to="/year/m2" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">Master 2</Link>
                            </div>
                          </div>
                          {/* Programming Languages */}
                          <div>
                            <h5 className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">Programming Languages</h5>
                            <div className="flex flex-col gap-1.5">
                              <Link to="/programming-languages" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">All Languages</Link>
                              <Link to="/programming-languages/html-css" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">HTML / CSS</Link>
                              <Link to="/programming-languages/javascript" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">JavaScript</Link>
                              <Link to="/programming-languages/python" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">Python</Link>
                              <Link to="/programming-languages/c" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">C</Link>
                              <Link to="/programming-languages/assembly" onClick={() => setIsMobileMenuOpen(false)} className="text-sm text-muted-foreground hover:text-primary transition-smooth">Assembly</Link>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    to={routeOnly}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`text-sm font-medium transition-smooth hover:text-primary relative ${location.pathname === routeOnly ? "text-primary" : "text-foreground"
                      } ${isSpecial ? "px-3 py-1 rounded-md" : ""}`}
                  >
                    {link.name}
                    {isSpecial && (
                      <span className="absolute -top-1 -right-1 flex h-3 w-3">
                        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
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
