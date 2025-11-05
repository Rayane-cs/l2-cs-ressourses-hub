import ModuleCard from "./ModuleCard";
import { Cpu } from "lucide-react";
import { SiC, SiPython } from "react-icons/si";

const languageModules = [
  { title: "C", slug: "c", icon: SiC, color: "bg-blue-500" },
  { title: "Python", slug: "python", icon: SiPython, color: "bg-green-500" },
  { title: "Assembly", slug: "assembly", icon: Cpu, color: "bg-purple-500" },
];

const LanguageModules = () => {
  return (
    <section id="languages" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Programming Languages</h2>
          <p className="text-xl text-muted-foreground">
            Select a language to access all resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {languageModules.map((module, index) => (
            <div
              key={module.slug}
              className="animate-fade-in hover:scale-105 transition-transform duration-200"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ModuleCard {...module} to={`/programming/${module.slug}`} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LanguageModules;
