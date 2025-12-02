import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function YearSections() {
  const navigate = useNavigate();
  const [hovered, setHovered] = useState<string | null>(null);
  
  const licenseYears = [
    { id: "l1", title: "Licence 1", subtitle: "First Year" },
    { id: "l2", title: "Licence 2", subtitle: "Second Year" },
    { id: "l3", title: "Licence 3", subtitle: "Third Year" },
  ];

  const masterYears = [
    { id: "m1", title: "Master 1", subtitle: "Master Year 1" },
    { id: "m2", title: "Master 2", subtitle: "Master Year 2" },
  ];

  const YearCard = ({ year }: { year: typeof licenseYears[0] }) => {
    const isActive = hovered === year.id;
    const isOtherActive = hovered !== null && hovered !== year.id;

    return (
      <button
        onClick={() => navigate(`/year/${year.id}`)}
        onMouseEnter={() => setHovered(year.id)}
        onMouseLeave={() => setHovered(null)}
        className={`relative p-6 bg-card border border-border rounded-lg transition-all duration-300 cursor-pointer transform ${isActive ? 'scale-105 z-20 shadow-2xl' : isOtherActive ? 'scale-95 opacity-70 filter blur-[0.6px] translate-y-1' : ''}`}
      >
        <div className="text-center">
          <div className="text-3xl md:text-4xl font-bold text-primary mb-2">{year.title}</div>
          <div className="text-sm text-muted-foreground">{year.subtitle}</div>
        </div>
        <div className="absolute inset-0 bg-primary/5 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-300" />
      </button>
    );
  };

  return (
    <div className="w-full relative">
      {/* Animated Top Border */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-700 to-transparent bg-[length:200%_100%] animate-gradient-shift" />

      <section id="years" className="container mx-auto px-4 py-16 space-y-12">
        {/* Licence Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Licence</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {licenseYears.map((year) => (
              <YearCard key={year.id} year={year} />
            ))}
          </div>
        </div>

        {/* Master Section */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Master</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {masterYears.map((year) => (
              <YearCard key={year.id} year={year} />
            ))}
          </div>
        </div>
      </section>

      {/* Animated Bottom Border */}
      <div className="w-full h-1 bg-gradient-to-r from-transparent via-blue-700 to-transparent bg-[length:200%_100%] animate-gradient-shift" style={{ animationDirection: 'reverse' }} />

      <style>{`
        @keyframes gradient-shift {
          0% {
            background-position: -200% center;
          }
          50% {
            background-position: 200% center;
          }
          100% {
            background-position: -200% center;
          }
        }

        .animate-gradient-shift {
          /* Very slow, subtle animation to avoid distraction */
          animation: gradient-shift 120s linear infinite;
        }

        /* Respect users who prefer reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .animate-gradient-shift {
            animation: none !important;
            background-position: center !important;
          }
        }
      `}</style>
    </div>
  );
}
