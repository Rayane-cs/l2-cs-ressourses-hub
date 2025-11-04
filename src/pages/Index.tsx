import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Modules from "@/components/Modules";
import LanguageModules from "@/components/LanguageModules";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Modules />
      <LanguageModules />
      <Footer />
    </div>
  );
};

export default Index;
