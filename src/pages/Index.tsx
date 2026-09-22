import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import YearSections from "@/components/YearSections";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <YearSections />
      <Footer />
    </div>
  );
};

export default Index;
