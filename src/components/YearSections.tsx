import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserConfig } from "@/hooks/useUserConfig";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, Lightbulb, Layers, ArrowRight, Sparkles, Bell } from "lucide-react";

export default function YearSections() {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [hovered, setHovered] = useState<string | null>(null);
  const userConfig = useUserConfig();

  const allLicenseYears = [
    {
      id: "l1",
      title: `${t.years.licence} 1`,
      subtitle: t.years.firstYear,
      icon: <GraduationCap className="w-8 h-8" />,
      color: "#3b82f6", // blue-500
    },
    {
      id: "l2",
      title: `${t.years.licence} 2`,
      subtitle: t.years.secondYear,
      icon: <BookOpen className="w-8 h-8" />,
      color: "#10b981", // emerald-500
    },
    {
      id: "l3",
      title: `${t.years.licence} 3`,
      subtitle: t.years.thirdYear,
      icon: <Award className="w-8 h-8" />,
      color: "#8b5cf6", // violet-500
    },
  ];

  const allMasterYears = [
    {
      id: "m1",
      title: `${t.years.master} 1`,
      subtitle: t.years.masterYear1,
      icon: <Lightbulb className="w-8 h-8" />,
      color: "#f59e0b", // amber-500
    },
    {
      id: "m2",
      title: `${t.years.master} 2`,
      subtitle: t.years.masterYear2,
      icon: <Layers className="w-8 h-8" />,
      color: "#ef4444", // red-500
    },
  ];

  // ── Apply user config filters ─────────────────────────
  const hiddenSet = new Set(userConfig?.hiddenYears ?? []);
  const showOnlySet = userConfig?.showOnlyYears?.length
    ? new Set(userConfig.showOnlyYears)
    : null;

  const licenseYears = allLicenseYears.filter((y) => {
    if (showOnlySet && !showOnlySet.has(y.id)) return false;
    return !hiddenSet.has(y.id);
  });

  const masterYears = allMasterYears.filter((y) => {
    if (showOnlySet && !showOnlySet.has(y.id)) return false;
    return !hiddenSet.has(y.id);
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as any,
        stiffness: 100
      }
    }
  };

  const YearCard = ({ year }: { year: typeof licenseYears[0] }) => {
    const isHovered = hovered === year.id;

    return (
      <motion.button
        onClick={() => navigate(`/year/${year.id}`)}
        onMouseEnter={() => setHovered(year.id)}
        onMouseLeave={() => setHovered(null)}
        whileHover={{ y: -5, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group w-full text-left"
      >
        <div className={`h-full p-8 rounded-[2.5rem] bg-card border border-border/50 backdrop-blur-xl transition-all duration-300 shadow-xl overflow-hidden ${isHovered ? 'ring-2 ring-primary/30 border-primary/30 shadow-primary/10' : ''}`}>
          
          {/* Background Glow */}
          <div 
            className="absolute -right-12 -top-12 w-40 h-40 rounded-full blur-[80px] opacity-10 transition-opacity group-hover:opacity-30"
            style={{ backgroundColor: year.color }}
          />
          
          <div className="flex flex-col h-full space-y-5">
            <div 
              className="w-16 h-16 rounded-[1.5rem] flex items-center justify-center transition-all group-hover:scale-110 group-hover:rotate-6 shadow-xl relative overflow-hidden"
              style={{ backgroundColor: `${year.color}15`, color: year.color }}
            >
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent" />
              {year.icon}
            </div>
            
            <div className="space-y-2">
              <h3 className="text-3xl font-black italic tracking-tighter uppercase leading-none group-hover:text-primary transition-colors">
                {year.title}
              </h3>
              <p className="text-muted-foreground font-semibold text-sm leading-relaxed">
                {year.subtitle}
              </p>
            </div>

            <div className="pt-6 mt-auto flex items-center justify-between border-t border-border/20">
              <span className={`text-[11px] font-black uppercase tracking-[0.2em] transition-colors ${isHovered ? 'text-primary' : 'text-muted-foreground/60'}`}>
                View Resources
              </span>
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${isHovered ? 'bg-primary text-primary-foreground translate-x-1 shadow-lg shadow-primary/30' : 'bg-muted text-foreground'}`}>
                <ArrowRight className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </motion.button>
    );
  };

  return (
    <div className="w-full relative bg-background py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 blur-3xl rounded-full" />
      </div>

      <section id="years" className="container mx-auto px-4 space-y-20 relative z-10">

        {/* Custom user banner */}
        {userConfig?.customBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
          >
            <Bell className="w-4 h-4 shrink-0" />
            <span>{userConfig.customBanner}</span>
          </motion.div>
        )}

        {/* Licence Section */}
        {licenseYears.length > 0 && (
          <div className="space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
                <Sparkles size={14} />
                Educational Path
              </div>
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter italic">
                <span className="text-primary not-italic">{t.years.licence}</span>
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Foundational years focusing on core computer science tracks and software engineering principles.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {licenseYears.map((year) => (
                <YearCard key={year.id} year={year} />
              ))}
            </div>
          </div>
        )}

        {/* Master Section */}
        {masterYears.length > 0 && (
          <div className="space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter italic">
                <span className="text-primary not-italic">{t.years.master}</span>
              </h2>
              <p className="text-muted-foreground max-w-xl">
                Specialized research and advanced application years in data science, AI, and systems engineering.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {masterYears.map((year) => (
                <YearCard key={year.id} year={year} />
              ))}
            </div>
          </div>
        )}
      </section>

      {/* Decorative Gradient Line */}
      <div className="mt-24 h-px w-full bg-gradient-to-r from-transparent via-border to-transparent" />
    </div>
  );
}
