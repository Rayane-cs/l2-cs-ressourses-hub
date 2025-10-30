import ModuleCard from "./ModuleCard";
import { Binary, Cpu, Globe, Languages, Database, Calculator, Brain } from "lucide-react";

const modules = [
  { title: "Algo", slug: "algo", icon: Binary, color: "bg-blue-500" },
  { title: "Archi-Ord", slug: "archi-ord", icon: Cpu, color: "bg-purple-500" },
  { title: "THG", slug: "thg", icon: Globe, color: "bg-green-500" },
  { title: "English", slug: "english", icon: Languages, color: "bg-red-500" },
  { title: "SI", slug: "si", icon: Database, color: "bg-yellow-500" },
  { title: "Method-Num", slug: "method-num", icon: Calculator, color: "bg-indigo-500" },
  { title: "Logique", slug: "logique", icon: Brain, color: "bg-pink-500" },
];

const Modules = () => {
  return (
    <section id="modules" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Course Modules</h2>
          <p className="text-xl text-muted-foreground">
            Select a module to access all resources
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((module, index) => (
            <div
              key={module.slug}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ModuleCard {...module} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Modules;
