import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Award, Lightbulb, Layers, ArrowRight, Sparkles, Lock } from "lucide-react";
import { toast } from "sonner";

// --- Watermark Graphics Matching the Cybernetic Aesthetics ---

const Licence1Graphic = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 200 160"
    className="absolute -top-1 -right-2 w-44 h-36 md:w-52 md:h-44 pointer-events-none opacity-40 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="glow-l1" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g filter="url(#glow-l1)" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Mortarboard Diamond Top */}
      <polygon points="100,18 185,55 100,92 15,55" fill={`${color}08`} />
      
      {/* Circuit traces on top surface */}
      <path d="M50,55 L85,70 L100,64 L135,78" />
      <path d="M75,38 L100,48 L125,38 L150,48" />
      <path d="M100,18 L100,48" />
      <path d="M100,64 L100,92" />
      
      {/* Nodes on top surface */}
      <circle cx="50" cy="55" r="2.5" fill={color} />
      <circle cx="85" cy="70" r="2.5" fill={color} />
      <circle cx="100" cy="48" r="3" fill="#ffffff" />
      <circle cx="125" cy="38" r="2.5" fill={color} />
      <circle cx="135" cy="78" r="2.5" fill={color} />
      <circle cx="150" cy="48" r="2.5" fill={color} />
      
      {/* Skullcap / lower cap band */}
      <path d="M45,70 C45,100 155,100 155,70" fill={`${color}06`} />
      <path d="M55,80 C55,108 145,108 145,80" />
      <path d="M70,90 C70,114 130,114 130,90" />
      <circle cx="100" cy="104" r="2.5" fill={color} />
      
      {/* Tassel */}
      <path d="M100,48 C140,50 170,70 172,95 L174,120" strokeWidth="1.8" />
      <circle cx="174" cy="122" r="3.5" fill={color} />
      <path d="M168,125 L180,125 L177,145 L171,145 Z" fill={`${color}25`} strokeWidth="1.2" />
      <circle cx="174" cy="146" r="2" fill={color} />
      
      {/* Circuit Nodes in Space */}
      <circle cx="25" cy="85" r="2" fill={color} opacity="0.6" />
      <path d="M25,85 L35,90" opacity="0.6" />
      <circle cx="185" cy="35" r="2" fill={color} opacity="0.6" />
      <path d="M175,40 L185,35" opacity="0.6" />
    </g>
  </svg>
);

const Licence2Graphic = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 200 160"
    className="absolute -top-1 -right-2 w-44 h-36 md:w-52 md:h-44 pointer-events-none opacity-40 group-hover:opacity-75 group-hover:scale-105 transition-all duration-500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="glow-l2" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g filter="url(#glow-l2)" fill={color} style={{ fontFamily: 'monospace', fontSize: '9px', fontWeight: 600 }}>
      {/* <code/> tag */}
      <text x="75" y="24" opacity="0.9" fontSize="10">&lt;code/&gt;</text>
      
      {/* Code body lines from screenshot */}
      <text x="65" y="40" opacity="0.8">function understand() &#123;</text>
      <text x="75" y="54" opacity="0.7">const data = learn();</text>
      <text x="75" y="68" opacity="0.7">return data.scan();</text>
      <text x="65" y="82" opacity="0.8">&#125;</text>
      <text x="65" y="98" opacity="0.8">function proceed() &#123;</text>
      <text x="75" y="112" opacity="0.7">return Success;</text>
      <text x="65" y="126" opacity="0.8">&#125;</text>
    </g>
    
    {/* Circuit traces connecting to code */}
    <g stroke={color} strokeWidth="1.4" opacity="0.5" strokeLinecap="round">
      <path d="M45,22 L65,22" />
      <circle cx="45" cy="22" r="2" fill={color} />
      <path d="M50,75 L60,75" />
      <circle cx="50" cy="75" r="2" fill={color} />
      <path d="M55,115 L60,115" />
      <circle cx="55" cy="115" r="2" fill={color} />
      <path d="M165,40 L180,40 L188,48" />
      <circle cx="188" cy="48" r="2" fill={color} />
      <path d="M150,110 L170,110" />
      <circle cx="170" cy="110" r="2" fill={color} />
    </g>
  </svg>
);

const Licence3Graphic = ({ color }: { color: string }) => (
  <svg
    viewBox="0 0 200 160"
    className="absolute -top-1 -right-2 w-44 h-36 md:w-52 md:h-44 pointer-events-none opacity-45 group-hover:opacity-80 group-hover:scale-105 transition-all duration-500"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <filter id="glow-l3" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
    </defs>
    <g filter="url(#glow-l3)" strokeLinejoin="round" strokeLinecap="round">
      {/* 3D Faceted Rosette Ring matching screenshot */}
      <polygon points="120,12 145,12 140,32 125,32" fill="#9333ea" fillOpacity="0.4" stroke={color} strokeWidth="1.2" />
      <polygon points="145,12 168,26 155,44 140,32" fill="#a855f7" fillOpacity="0.55" stroke={color} strokeWidth="1.2" />
      <polygon points="168,26 178,50 160,60 155,44" fill="#7c3aed" fillOpacity="0.45" stroke={color} strokeWidth="1.2" />
      <polygon points="178,50 172,75 152,75 160,60" fill="#6d28d9" fillOpacity="0.5" stroke={color} strokeWidth="1.2" />
      <polygon points="172,75 155,95 140,84 152,75" fill="#5b21b6" fillOpacity="0.4" stroke={color} strokeWidth="1.2" />
      <polygon points="155,95 130,102 125,85 140,84" fill="#7e22ce" fillOpacity="0.45" stroke={color} strokeWidth="1.2" />
      <polygon points="130,102 110,95 115,84 125,85" fill="#6b21a8" fillOpacity="0.4" stroke={color} strokeWidth="1.2" />
      <polygon points="110,95 95,75 110,65 115,84" fill="#581c87" fillOpacity="0.45" stroke={color} strokeWidth="1.2" />
      <polygon points="95,75 95,45 112,48 110,65" fill="#7e22ce" fillOpacity="0.4" stroke={color} strokeWidth="1.2" />
      <polygon points="95,45 105,24 125,32 112,48" fill="#8b5cf6" fillOpacity="0.5" stroke={color} strokeWidth="1.2" />
      <polygon points="105,24 120,12 125,32 125,32" fill="#a855f7" fillOpacity="0.4" stroke={color} strokeWidth="1.2" />

      {/* Inner Rosette Center */}
      <polygon points="125,32 140,32 155,44 160,60 152,75 140,84 125,85 115,84 110,65 112,48" fill="#0c0e17" fillOpacity="0.8" stroke={color} strokeWidth="1.5" />

      {/* Ribbon Left Tail */}
      <polygon points="120,95 110,145 125,135 135,145 132,95" fill="#7c3aed" fillOpacity="0.4" stroke={color} strokeWidth="1.2" />
      {/* Ribbon Right Tail */}
      <polygon points="140,90 152,142 165,132 175,142 155,90" fill="#a855f7" fillOpacity="0.45" stroke={color} strokeWidth="1.2" />
    </g>
  </svg>
);

export default function YearSections() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const licenseYears = [
    { 
      id: "l1", 
      prefix: t.years.licence,
      number: "1",
      subtitle: t.years.firstYear, 
      icon: <GraduationCap className="w-7 h-7" />,
      color: "#38bdf8", // Sky/Cyan/Blue
      glowColor: "#0284c7",
      graphic: (color: string) => <Licence1Graphic color={color} />,
      isAvailable: false,
    },
    { 
      id: "l2", 
      prefix: t.years.licence,
      number: "2",
      subtitle: t.years.secondYear, 
      icon: <BookOpen className="w-7 h-7" />,
      color: "#34d399", // Emerald/Green
      glowColor: "#059669",
      graphic: (color: string) => <Licence2Graphic color={color} />,
      isAvailable: true,
    },
    { 
      id: "l3", 
      prefix: t.years.licence,
      number: "3",
      subtitle: t.years.thirdYear, 
      icon: <Award className="w-7 h-7" />,
      color: "#c084fc", // Violet/Purple
      glowColor: "#7c3aed",
      graphic: (color: string) => <Licence3Graphic color={color} />,
      isAvailable: true,
    },
  ];

  const YearCard = ({ year }: { year: typeof licenseYears[0] }) => {
    const [isHovered, setIsHovered] = useState(false);
    const isAvailable = year.isAvailable !== false;

    const handleClick = (e: React.MouseEvent) => {
      if (!isAvailable) {
        e.preventDefault();
        toast.info(
          t.yearPage?.resourcesComingSoon?.replace("{year}", `${year.prefix} ${year.number}`) ||
          `Resources for ${year.prefix} ${year.number} are currently unavailable.`
        );
        return;
      }
      navigate(`/year/${year.id}`);
    };

    return (
      <motion.button
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        whileHover={isAvailable ? { y: -6, scale: 1.015 } : { y: -2 }}
        whileTap={isAvailable ? { scale: 0.985 } : {}}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className={`relative group w-full text-left outline-none select-none ${
          isAvailable ? "cursor-pointer" : "cursor-not-allowed"
        }`}
      >
        <div 
          className={`relative h-full min-h-[260px] p-7 md:p-8 rounded-[2rem] bg-[#0c0e15]/90 border backdrop-blur-2xl transition-all duration-500 shadow-2xl overflow-hidden flex flex-col justify-between ${
            !isAvailable ? "opacity-85 hover:opacity-100" : ""
          }`}
          style={{
            borderColor: isHovered 
              ? (isAvailable ? `${year.color}50` : "rgba(239, 68, 68, 0.4)") 
              : "rgba(255, 255, 255, 0.08)",
            boxShadow: isHovered 
              ? (isAvailable 
                  ? `0 15px 35px -10px ${year.color}25, 0 0 20px -5px ${year.color}15` 
                  : "0 15px 35px -10px rgba(239, 68, 68, 0.15)")
              : "0 10px 30px -10px rgba(0,0,0,0.5)",
          }}
        >
          {/* Ambient Diffuse Background Glow */}
          <div 
            className="absolute -top-12 -right-12 w-48 h-48 rounded-full blur-[70px] opacity-15 group-hover:opacity-35 transition-opacity duration-700 pointer-events-none"
            style={{ backgroundColor: isAvailable ? year.color : "#ef4444" }}
          />

          {/* Artistic SVG Watermark Graphic */}
          {year.graphic(year.color)}

          {/* Top Row: Icon Badge & Subtitle */}
          <div className="flex items-start justify-between relative z-10">
            {/* Icon Badge */}
            <div className="relative">
              {/* Soft glow behind badge */}
              <div 
                className="absolute inset-0 rounded-2xl blur-md opacity-35 group-hover:opacity-70 transition-opacity duration-300"
                style={{ backgroundColor: year.color }}
              />
              <div 
                className="relative w-14 h-14 rounded-2xl flex items-center justify-center border transition-all duration-300 group-hover:scale-105"
                style={{ 
                  backgroundColor: `${year.color}14`, 
                  borderColor: `${year.color}35`,
                  boxShadow: `0 0 20px ${year.color}20`
                }}
              >
                <div style={{ color: year.color }}>
                  {year.icon}
                </div>
              </div>
            </div>

            {/* Subtitle & Status Badge */}
            <div className="flex flex-col items-end gap-1.5">
              <span 
                className="text-sm font-semibold tracking-wide"
                style={{ color: `${year.color}ee` }}
              >
                {year.subtitle}
              </span>
              {!isAvailable && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
                  Unavailable
                </span>
              )}
            </div>
          </div>

          {/* Center Title: LICENCE / MASTER + Glowing Number */}
          <div className="py-6 relative z-10">
            <h3 className="text-3xl md:text-4xl font-black italic tracking-wide uppercase flex items-baseline select-none">
              <span className="text-white font-extrabold tracking-tight">
                {year.prefix}
              </span>
              <span 
                className="ml-2.5 font-black italic tracking-tight"
                style={{ 
                  color: year.color,
                  textShadow: `0 0 12px ${year.color}, 0 0 30px ${year.glowColor}`
                }}
              >
                {year.number}
              </span>
            </h3>
          </div>

          {/* Bottom Row: VIEW RESOURCES / UNAVAILABLE + Reticle HUD Arrow Button */}
          <div className="flex items-center justify-between pt-2 relative z-10">
            <span 
              className={`text-[11px] font-extrabold uppercase tracking-[0.25em] transition-colors duration-300 ${
                isAvailable 
                  ? "text-zinc-400 group-hover:text-white" 
                  : "text-red-400/90 group-hover:text-red-400"
              }`}
            >
              {isAvailable ? "VIEW RESOURCES" : "RESOURCES UNAVAILABLE"}
            </span>

            {/* HUD Reticle Button */}
            <div className="relative w-12 h-12 flex items-center justify-center">
              {/* Outer Reticle Ring with 4 Cardinal Dots */}
              <svg 
                viewBox="0 0 48 48" 
                className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-out pointer-events-none ${
                  isAvailable ? "group-hover:rotate-90" : ""
                }`}
              >
                {/* Orbital Ring Track */}
                <circle 
                  cx="24" 
                  cy="24" 
                  r="20" 
                  fill="none" 
                  stroke={isAvailable ? year.color : "#ef4444"} 
                  strokeWidth="1.2" 
                  strokeOpacity={isAvailable ? 0.5 : 0.3} 
                />
                {/* 4 Cardinal Dots at 12, 3, 6, 9 o'clock */}
                <circle cx="24" cy="4" r="1.8" fill={isAvailable ? year.color : "#ef4444"} fillOpacity={isAvailable ? 1 : 0.6} />
                <circle cx="44" cy="24" r="1.8" fill={isAvailable ? year.color : "#ef4444"} fillOpacity={isAvailable ? 1 : 0.6} />
                <circle cx="24" cy="44" r="1.8" fill={isAvailable ? year.color : "#ef4444"} fillOpacity={isAvailable ? 1 : 0.6} />
                <circle cx="4" cy="24" r="1.8" fill={isAvailable ? year.color : "#ef4444"} fillOpacity={isAvailable ? 1 : 0.6} />
              </svg>

              {/* Inner Dark Disc */}
              <div 
                className="w-8 h-8 rounded-full bg-[#121520] border border-white/15 flex items-center justify-center shadow-lg transition-all duration-300"
                style={{
                  boxShadow: `0 0 12px ${isAvailable ? year.color : "#ef4444"}35`
                }}
              >
                {isAvailable ? (
                  <ArrowRight className="w-3.5 h-3.5 text-white transition-transform duration-300 group-hover:translate-x-0.5" />
                ) : (
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.button>
    );
  };

  return (
    <div className="w-full relative bg-[#07090e] py-24 overflow-hidden">
      {/* Subtle Circuit Board Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-20 overflow-hidden">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-grid" width="160" height="160" patternUnits="userSpaceOnUse">
              <path d="M 160 0 L 0 0 0 160" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="0.5" />
              <path d="M 40 40 L 80 40 L 100 60 L 140 60" fill="none" stroke="#38bdf8" strokeWidth="0.8" strokeOpacity="0.3" />
              <circle cx="40" cy="40" r="2" fill="#38bdf8" fillOpacity="0.5" />
              <circle cx="140" cy="60" r="2" fill="#38bdf8" fillOpacity="0.5" />
              <path d="M 20 120 L 60 120 L 80 100 L 120 100" fill="none" stroke="#a855f7" strokeWidth="0.8" strokeOpacity="0.25" />
              <circle cx="20" cy="120" r="2" fill="#a855f7" fillOpacity="0.4" />
              <circle cx="120" cy="100" r="2" fill="#a855f7" fillOpacity="0.4" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-grid)" />
        </svg>
      </div>

      {/* Ambient Radial Highlights */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full" />
        <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-accent/5 blur-3xl rounded-full" />
      </div>

      <section id="years" className="container mx-auto px-4 space-y-20 relative z-10">
        
        {/* Licence Section */}
        <div className="space-y-12">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
              <Sparkles size={14} />
              Educational Path
            </div>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter">
              <span className="text-primary not-italic">{t.years.licence}</span>
            </h2>
            <p className="text-muted-foreground max-w-xl text-base md:text-lg">
              Foundational years focusing on core computer science tracks and software engineering principles.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {licenseYears.map((year) => (
              <YearCard key={year.id} year={year} />
            ))}
          </div>
        </div>

        {/* Master Section is currently hidden as requested */}

      </section>

      {/* Decorative Gradient Line */}
      <div className="mt-24 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
