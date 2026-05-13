import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import YearSections from "@/components/YearSections";
import ProgrammingLangsSection from "@/components/ProgrammingLangsSection";
import { useUserConfig } from "@/hooks/useUserConfig";

const Index = () => {
  const userConfig = useUserConfig();
  const hiddenSections = new Set(userConfig?.hiddenSections ?? []);

  const showProgrammingLangs =
    userConfig?.showProgrammingLanguages !== false &&
    !hiddenSections.has("programming-languages");

  const showYears = !hiddenSections.has("years");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      {showProgrammingLangs && <ProgrammingLangsSection />}
      {showYears && <YearSections />}
      <Footer />
    </div>
  );
};

export default Index;
