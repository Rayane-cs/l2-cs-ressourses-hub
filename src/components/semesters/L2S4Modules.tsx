import ModuleCard from "../ModuleCard";

import { Languages, Database, FileCodeIcon, Brain, Globe, MonitorCog, Code2 } from "lucide-react";

const modules = [
  { title: "DAW", slug: "daw", icon: FileCodeIcon, color: "bg-white-500", semester: "S4" },
  { title: "Réseaux", slug: "reseaux", icon: Globe, color: "bg-purple-500", semester: "S4" },
  { title: "THL", slug: "thl", icon: Brain, color: "bg-green-500", semester: "S4" },
  { title: "English", slug: "english-s4", icon: Languages, color: "bg-red-500", semester: "S4" },
  { title: "SE", slug: "se", icon: MonitorCog, color: "bg-yellow-500", semester: "S4" },
  { title: "BDD", slug: "bdd", icon: Database, color: "bg-indigo-500", semester: "S4" },
  { title: "OOP", slug: "oop", icon: Code2, color: "bg-pink-500", semester: "S4" },
];

type Props = { showHeader?: boolean };

export default function L2S4Modules({ showHeader = true }: Props) {
  return (
    <section id="modules-l2-s4" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">L2 - Semester 4</h2>
            <p className="text-lg text-muted-foreground">Modules coming soon</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((m) => <ModuleCard key={m.slug} {...m} to={m.slug === "english-s4" ? `/module/${m.slug}` : `/module/${m.slug}?semester=${m.semester}`} />)}
        </div>
      </div>
    </section>
  );
}
