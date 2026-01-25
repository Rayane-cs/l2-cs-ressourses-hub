import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import LanguageCard from "@/components/LanguageCard";
import { getAllLanguages } from "@/lib/programmingLanguagesData";
import { GraduationCap, Code2, Cpu, Database, Layout, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

const ProgrammingLanguagesHub = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const languages = getAllLanguages();

  const filteredLanguages = languages.filter((lang) => {
    const matchesSearch = 
      lang.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lang.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      activeCategory === "All" || lang.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20"
          >
            <Code2 size={14} />
            Skill Center
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter"
          >
            Non & <span className="text-primary italic">Programming</span> Langs
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto text-lg"
          >
            Master the most in-demand technologies with our curated courses, timed tests, and practical exercises.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md mx-auto relative mt-8"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground h-5 w-5" />
            <Input
              type="text"
              placeholder="Search languages..."
              className="pl-12 h-14 rounded-2xl bg-background/50 backdrop-blur-sm border-border/50 shadow-xl text-lg focus:ring-primary focus:border-primary transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </motion.div>
        </section>

        {/* Filters/Categories (Optional) */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {['All', 'Web', 'Backend', 'System', 'Database'].map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-muted/40 hover:bg-muted/80 border-border/50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Languages Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-16">
          {filteredLanguages.map((lang, index) => (
            <motion.div
              key={lang.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <LanguageCard language={lang} />
            </motion.div>
          ))}
        </div>

        {/* Stats Section (Call to Action) */}
        <section className="bg-primary/5 rounded-[2.5rem] p-8 md:p-12 border border-primary/10 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto text-primary mb-2">
                <Layout size={24} />
              </div>
              <h3 className="text-3xl font-black italic">7</h3>
              <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest">Core Technologies</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto text-primary mb-2">
                <Database size={24} />
              </div>
              <h3 className="text-3xl font-black italic">100+</h3>
              <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest">Test Questions</p>
            </div>
            <div className="space-y-2">
              <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mx-auto text-primary mb-2">
                <Cpu size={24} />
              </div>
              <h3 className="text-3xl font-black italic">20+</h3>
              <p className="text-muted-foreground font-medium uppercase text-xs tracking-widest">Practice Exos</p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ProgrammingLanguagesHub;
