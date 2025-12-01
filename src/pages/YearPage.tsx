import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Modules from "@/components/Modules";
import LanguageModules from "@/components/LanguageModules";

export default function YearPage() {
  const { yearSlug } = useParams<{ yearSlug: string }>();
  const navigate = useNavigate();

  const yearData: Record<string, { title: string; subtitle: string; showModules: boolean }> = {
    l1: { title: "L1", subtitle: "First Year - Licence", showModules: false },
    l2: { title: "L2", subtitle: "Second Year - Licence", showModules: true },
    l3: { title: "L3", subtitle: "Third Year - Licence", showModules: false },
    m1: { title: "M1", subtitle: "Master Year 1", showModules: false },
    m2: { title: "M2", subtitle: "Master Year 2", showModules: false },
  };

  const year = yearData[yearSlug || "l2"];

  if (!year) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">Year Not Found</h1>
            <Button onClick={() => navigate("/home")}>Back to Home</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12 pt-24 md:pt-28">
        <Button 
          variant="outline" 
          onClick={() => navigate("/home#years")}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Years
        </Button>

        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{year.title}</h1>
          <p className="text-xl text-muted-foreground">{year.subtitle}</p>
        </div>

        {year.showModules ? (
          <div className="space-y-12">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Modules</h2>
              <Modules showHeader={false} />
            </div>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-center mb-6">Programming Languages</h2>
              <LanguageModules showHeader={false} />
            </div>
          </div>
        ) : (
          <div className="bg-card p-8 rounded-lg border border-border text-center">
            <p className="text-muted-foreground text-lg">
              Resources for {year.title} will be available soon. Currently organizing content...
            </p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
