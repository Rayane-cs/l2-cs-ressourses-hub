import ModuleCard from "../ModuleCard";

const modules: Array<{ title: string; slug: string; icon: any; color: string }> = [];

type Props = { showHeader?: boolean };

export default function L1S2Modules({ showHeader = true }: Props) {
  return (
    <section id="modules-l1-s2" className="py-12 bg-background">
      <div className="container mx-auto px-4">
        {showHeader && (
          <div className="text-center mb-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">L1 - Semester 2</h2>
            <p className="text-lg text-muted-foreground">Modules coming soon</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {modules.map((m) => <ModuleCard key={m.slug} {...m} />)}
        </div>
      </div>
    </section>
  );
}
