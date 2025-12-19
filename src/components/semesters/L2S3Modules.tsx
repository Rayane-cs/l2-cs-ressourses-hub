import ModuleCard from "../ModuleCard";
import { Binary, Cpu, Waypoints, Languages, Database, Calculator, Brain } from "lucide-react";

const modules = [
  { title: "Algo", slug: "algo", icon: Binary, color: "bg-blue-500", semester: "S3" },
  { title: "Archi-Ord", slug: "archi-ord", icon: Cpu, color: "bg-purple-500", semester: "S3" },
  { title: "THG", slug: "thg", icon: Waypoints, color: "bg-green-500", semester: "S3" },
  { title: "English", slug: "english", icon: Languages, color: "bg-red-500", semester: "S3" },
  { title: "SI", slug: "si", icon: Database, color: "bg-yellow-500", semester: "S3" },
  { title: "Method-Num", slug: "method-num", icon: Calculator, color: "bg-indigo-500", semester: "S3" },
  { title: "Logique", slug: "logique", icon: Brain, color: "bg-pink-500", semester: "S3" },
];

type Props = { showHeader?: boolean };

export default function L2S3Modules({ showHeader = true }: Props) {
  return (
    <section id="modules-l2-s3" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">L2 - Semester 3</h2>
            <p className="text-lg text-muted-foreground">Modules available for L2 S3</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((m) => (
            <ModuleCard key={m.slug} {...m} to={`/module/${m.slug}?semester=${m.semester}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
