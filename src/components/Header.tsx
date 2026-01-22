import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { Menu, X, GraduationCap, LogOut, User } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "./ui/dropdown-menu";
import { toast } from "sonner";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasFeedbackSubmitted, setHasFeedbackSubmitted] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const { t } = useLanguage();
  const { user, isGuest, signOut, profile, updateProfile } = useAuth();
  const [newAvatarUrl, setNewAvatarUrl] = useState("");
  const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);

  const handleAvatarUpdate = async () => {
    if (!newAvatarUrl.trim()) return;
    setIsUpdatingAvatar(true);
    try {
      const { error } = await updateProfile({ avatar_url: newAvatarUrl.trim() });
      if (error) {
        toast.error("Failed to update avatar");
      } else {
        toast.success("Avatar updated successfully!");
        setNewAvatarUrl("");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsUpdatingAvatar(false);
    }
  };

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
    { name: t.nav.home, path: "/home" },
    { name: t.nav.years, path: "/home#years" },
    { name: t.nav.about, path: "/about" },
    // Search is handled separately in desktop view, but kept here for mobile/consistency structure if needed
    // However, we will replace the link with an input in desktop, and maybe keep link in mobile or input in mobile.
    // Let's keep it but maybe handle it differently.
    // For now, let's just enable the page route in case they click it.
    { name: t.nav.search, path: "/search" },
    { name: t.nav.feedback, path: "/feedback", isSpecial: true },
    { name: t.nav.more, path: "#more", isMore: true, disabled: true },
  ];

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
            <span className="text-xl font-bold text-foreground">UHBC CS</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6" role="navigation" aria-label={t.nav.comingSoon}>
            {navLinks.map((link) => {
              const routeOnly = link.path.includes("#") ? (link.path.split("#")[0] || "/") : link.path;
              const isSpecial = link.isSpecial && !hasFeedbackSubmitted;

              if (link.isMore) {
                return (
                  <div
                    key="more"
                    className={`relative ${link.disabled ? "opacity-50 cursor-not-allowed" : ""}`}
                    onMouseEnter={() => !link.disabled && setIsDropdownOpen(true)}
                    onMouseLeave={() => !link.disabled && setIsDropdownOpen(false)}
                    title={link.disabled ? t.nav.comingSoon : ""}
                  >
                    <button
                      className="text-sm font-medium transition-smooth hover:text-primary text-foreground"
                      disabled={link.disabled}
                      aria-label={`${t.nav.more} (${t.nav.comingSoon})`}
                      aria-haspopup="true"
                      aria-expanded={isDropdownOpen}
                    >
                      {t.nav.more} ▾
                    </button>

                    {isDropdownOpen && (
                      <div className="fixed left-1/2 -translate-x-1/2 top-20 w-[min(1100px,calc(100vw-4rem))] bg-background border border-border rounded-lg shadow-lg p-6 z-50 animate-fade-in">
                        <div className="grid grid-cols-5 gap-6 divide-x divide-border">
                          {/* L1 */}
                          <div className="px-4">
                            <h4 className="font-semibold mb-3 text-primary">L1</h4>
                            <div className="text-sm space-y-3">
                              <div className="font-medium text-xs text-muted-foreground">Semester 1</div>
                              <ul className="space-y-1 pl-2">
                                <li><Link to="/module/algo" className="hover:text-primary transition-smooth">Algo</Link></li>
                                <li><Link to="/module/thg" className="hover:text-primary transition-smooth">THG</Link></li>
                              </ul>
                              <div className="pt-3 mt-3">
                                <div className="font-medium text-xs text-muted-foreground">Semester 2</div>
                                <ul className="space-y-1 pl-2 mt-2">
                                  <li><Link to="/module/archi-ord" className="hover:text-primary transition-smooth">Archi-Ord</Link></li>
                                  <li><Link to="/module/logique" className="hover:text-primary transition-smooth">Logique</Link></li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* L2 */}
                          <div className="px-4">
                            <h4 className="font-semibold mb-3 text-primary">L2</h4>
                            <div className="text-sm space-y-3">
                              <div className="font-medium text-xs text-muted-foreground">Semester 3</div>
                              <ul className="space-y-1 pl-2">
                                <li><Link to="/module/algo" className="hover:text-primary transition-smooth">Algo</Link></li>
                                <li><Link to="/module/si" className="hover:text-primary transition-smooth">SI</Link></li>
                              </ul>
                              <div className="pt-3 mt-3">
                                <div className="font-medium text-xs text-muted-foreground">Semester 4</div>
                                <ul className="space-y-1 pl-2 mt-2">
                                  <li><Link to="/module/method-num" className="hover:text-primary transition-smooth">Method-Num</Link></li>
                                  <li><Link to="/module/english" className="hover:text-primary transition-smooth">English</Link></li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* L3 */}
                          <div className="px-4">
                            <h4 className="font-semibold mb-3 text-primary">L3</h4>
                            <div className="text-sm space-y-3">
                              <div className="font-medium text-xs text-muted-foreground">Semester 5</div>
                              <ul className="space-y-1 pl-2">
                                <li><Link to="/module/archi-ord" className="hover:text-primary transition-smooth">Archi-Ord</Link></li>
                                <li><Link to="/module/logique" className="hover:text-primary transition-smooth">Logique</Link></li>
                              </ul>
                              <div className="pt-3 mt-3">
                                <div className="font-medium text-xs text-muted-foreground">Semester 6</div>
                                <ul className="space-y-1 pl-2 mt-2">
                                  <li><Link to="/module/algo" className="hover:text-primary transition-smooth">Algo</Link></li>
                                  <li><Link to="/module/si" className="hover:text-primary transition-smooth">SI</Link></li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* M1 */}
                          <div className="px-4">
                            <h4 className="font-semibold mb-3 text-primary">M1</h4>
                            <div className="text-sm space-y-3">
                              <div className="font-medium text-xs text-muted-foreground">Semester 1</div>
                              <ul className="space-y-1 pl-2">
                                <li><Link to="/module/algo" className="hover:text-primary transition-smooth">Algo</Link></li>
                                <li><Link to="/module/method-num" className="hover:text-primary transition-smooth">Method-Num</Link></li>
                              </ul>
                              <div className="pt-3 mt-3">
                                <div className="font-medium text-xs text-muted-foreground">Semester 2</div>
                                <ul className="space-y-1 pl-2 mt-2">
                                  <li><Link to="/module/si" className="hover:text-primary transition-smooth">SI</Link></li>
                                  <li><Link to="/module/thg" className="hover:text-primary transition-smooth">THG</Link></li>
                                </ul>
                              </div>
                            </div>
                          </div>

                          {/* M2 */}
                          <div className="px-4">
                            <h4 className="font-semibold mb-3 text-primary">M2</h4>
                            <div className="text-sm space-y-3">
                              <div className="font-medium text-xs text-muted-foreground">Semester 1</div>
                              <ul className="space-y-1 pl-2">
                                <li><Link to="/module/logique" className="hover:text-primary transition-smooth">Logique</Link></li>
                                <li><Link to="/module/archi-ord" className="hover:text-primary transition-smooth">Archi-Ord</Link></li>
                              </ul>
                              <div className="pt-3 mt-3">
                                <div className="font-medium text-xs text-muted-foreground">Semester 2</div>
                                <ul className="space-y-1 pl-2 mt-2">
                                  <li><Link to="/module/algo" className="hover:text-primary transition-smooth">Algo</Link></li>
                                  <li><Link to="/module/english" className="hover:text-primary transition-smooth">English</Link></li>
                                </ul>
                              </div>
                            </div>
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
                    <div className="p-2 space-y-2">
                      <p className="text-[10px] font-bold uppercase text-muted-foreground px-1">Update Profile Picture</p>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="Paste image URL here..."
                          value={newAvatarUrl}
                          onChange={(e) => setNewAvatarUrl(e.target.value)}
                          className="flex-1 bg-muted/50 border border-transparent focus:border-primary/30 rounded-lg px-3 py-1.5 text-xs outline-none transition-all"
                        />
                        <Button 
                          size="sm" 
                          onClick={handleAvatarUpdate} 
                          disabled={isUpdatingAvatar || !newAvatarUrl.trim()}
                          className="h-8 rounded-lg px-3"
                        >
                          {isUpdatingAvatar ? "..." : "Set"}
                        </Button>
                      </div>
                    </div>
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
                    title={link.disabled ? t.nav.comingSoon : ""}
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
