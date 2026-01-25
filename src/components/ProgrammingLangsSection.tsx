import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Code2, Trophy, BookOpen, ArrowRight, Zap } from "lucide-react";
import { motion } from "framer-motion";

const ProgrammingLangsSection = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Code2 className="h-6 w-6 text-primary" />,
      title: "7 Core Languages",
      description: "From HTML/CSS to C and Assembly."
    },
    {
      icon: <Trophy className="h-6 w-6 text-green-500" />,
      title: "Timed Tests",
      description: "5 & 10 min challenges with global records."
    },
    {
      icon: <BookOpen className="h-6 w-6 text-blue-500" />,
      title: "Practice Exos",
      description: "Real-world problems with detailed solutions."
    }
  ];

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 bg-primary/5 opacity-40" />
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
              <Zap size={14} className="animate-pulse" />
              New Feature
            </div>
            
            <div className="space-y-4">
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
                Non & <span className="text-primary not-italic">Programming</span> Langs
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed max-w-xl">
                Master the fundamental tools of computer science. Learn at your own pace, test your knowledge under pressure, and track your progress with our new record system.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4">
              {features.map((feature, index) => (
                <div key={index} className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-background border border-border flex items-center justify-center shadow-lg">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-tight">{feature.title}</h4>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                size="lg" 
                onClick={() => navigate("/programming-languages")}
                className="h-14 px-8 rounded-2xl text-lg font-bold shadow-xl shadow-primary/20 group"
              >
                Explore Skills Hub
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-primary/20 via-background to-accent/20 border border-white/5 shadow-2xl overflow-hidden group">
              {/* Mockup or visual representation */}
              <div className="absolute inset-0 flex items-center justify-center text-8xl opacity-10 blur-sm pointer-events-none group-hover:scale-110 transition-transform duration-700">
                {"< >"}
              </div>
              
              <div className="p-12 h-full flex flex-col justify-center">
                <div className="grid grid-cols-2 gap-6">
                  {['HTML', 'CSS', 'PYTHON', 'JAVA', 'C', 'MYSQL'].map((lang, i) => (
                    <motion.div
                      key={lang}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.4 + (i * 0.1) }}
                      className="p-6 rounded-[2rem] bg-background/60 backdrop-blur-xl border border-white/10 shadow-xl flex flex-col items-center justify-center space-y-2 group/card hover:bg-primary/5 transition-colors cursor-pointer"
                      onClick={() => navigate("/programming-languages")}
                    >
                      <span className="text-2xl font-black italic tracking-tighter group-hover/card:scale-110 transition-transform">
                        {lang}
                      </span>
                      <div className="w-8 h-1 bg-primary/20 rounded-full" />
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="p-6 rounded-[2rem] bg-primary text-primary-foreground shadow-2xl shadow-primary/30 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:scale-105 transition-transform"
                    onClick={() => navigate("/programming-languages")}
                  >
                    <span className="text-xl font-bold uppercase tracking-widest text-center">ASM & MORE</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgrammingLangsSection;
