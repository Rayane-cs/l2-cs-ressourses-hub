import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { PracticeExercise } from "@/lib/programmingLanguagesData";
import { Code2, HelpCircle, CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { Badge } from "./ui/badge";
import { motion, AnimatePresence } from "framer-motion";

interface PracticeExercisesProps {
  exercises: PracticeExercise[];
}

const PracticeExercises = ({ exercises }: PracticeExercisesProps) => {
  const [activeDifficulty, setActiveDifficulty] = useState("All");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [showSolution, setShowSolution] = useState<number | null>(null);
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    // Show notification shortly after component mounts
    const timer = setTimeout(() => setShowNotification(true), 500);
    // Hide notification after 4 seconds
    const hideTimer = setTimeout(() => setShowNotification(false), 4500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(hideTimer);
    };
  }, []);

  const filteredExercises = exercises.filter((ex) => 
    activeDifficulty === "All" || ex.difficulty === activeDifficulty.toLowerCase()
  );

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'easy': return 'text-green-500 bg-green-500/10';
      case 'medium': return 'text-orange-500 bg-orange-500/10';
      case 'hard': return 'text-red-500 bg-red-500/10';
      default: return 'text-slate-500 bg-slate-500/10';
    }
  };

  return (
    <div className="space-y-4">
      {/* Animated Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 80, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
            className="fixed top-0 left-0 right-0 z-[40] px-4 pointer-events-none"
          >
            <div className="max-w-2xl mx-auto bg-primary text-primary-foreground px-6 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-white/20 backdrop-blur-md">
              <Code2 size={20} className="animate-pulse" />
              <p className="text-sm font-bold italic tracking-tight">
                Practice makes perfect! Try to solve these exercises without looking at the solutions first.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Difficulty Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
          <button
            key={diff}
            onClick={() => setActiveDifficulty(diff)}
            className={`px-6 py-2 rounded-xl text-sm font-bold transition-all border ${
              activeDifficulty === diff
                ? "bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20"
                : "bg-muted/40 hover:bg-muted/80 border-border/50"
            }`}
          >
            {diff}
          </button>
        ))}
      </div>

      {filteredExercises.map((exercise, index) => (
        <Card key={index} className="overflow-hidden border-border/50">
          <button
            onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
            className="w-full text-left"
          >
            <CardHeader className="p-4 flex flex-row items-center justify-between space-y-0">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${getDifficultyColor(exercise.difficulty)}`}>
                  <Code2 size={20} />
                </div>
                <div>
                  <CardTitle className="text-base font-bold">{exercise.title}</CardTitle>
                  <CardDescription className="text-xs">
                    <Badge variant="secondary" className={`mt-1 font-bold uppercase text-[9px] ${getDifficultyColor(exercise.difficulty)} border-none`}>
                      {exercise.difficulty}
                    </Badge>
                  </CardDescription>
                </div>
              </div>
              {expandedIndex === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </CardHeader>
          </button>

          <AnimatePresence>
            {expandedIndex === index && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <CardContent className="p-4 pt-0 space-y-4">
                  <div className="bg-muted/30 p-4 rounded-xl text-sm leading-relaxed">
                    {exercise.description}
                  </div>

                  {exercise.hints && exercise.hints.length > 0 && (
                    <div className="space-y-2">
                      <p className="text-xs font-bold uppercase text-muted-foreground flex items-center gap-1">
                        <HelpCircle size={14} /> Hints
                      </p>
                      <ul className="list-disc list-inside space-y-1">
                        {exercise.hints.map((hint, i) => (
                          <li key={i} className="text-xs text-muted-foreground">{hint}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="pt-4 border-t border-border/50">
                    {showSolution === index ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <p className="text-xs font-bold uppercase text-green-500 flex items-center gap-1">
                            <CheckCircle2 size={14} /> Recommended Solution
                          </p>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => setShowSolution(null)}
                            className="text-xs h-7"
                          >
                            Hide Solution
                          </Button>
                        </div>
                        <pre className="bg-slate-950 text-slate-50 p-4 rounded-xl text-xs font-mono overflow-x-auto border border-white/5">
                          <code>{exercise.solution || "// Solution coming soon..."}</code>
                        </pre>
                      </div>
                    ) : (
                      <Button 
                        variant="secondary" 
                        size="sm" 
                        onClick={() => setShowSolution(index)}
                        className="w-full rounded-xl font-bold"
                      >
                        Show Solution
                      </Button>
                    )}
                  </div>
                </CardContent>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      ))}

      {exercises.length === 0 && (
        <div className="text-center py-12 bg-muted/20 rounded-2xl border-2 border-dashed border-border/50">
          <Code2 className="mx-auto h-12 w-12 text-muted-foreground opacity-20 mb-4" />
          <p className="text-muted-foreground">More exercises coming soon!</p>
        </div>
      )}
    </div>
  );
};

export default PracticeExercises;
