import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, BookOpen, PenTool, PlayCircle, Trophy, Clock } from "lucide-react";
import { getLanguageBySlug } from "@/lib/programmingLanguagesData";
import CourseResources from "@/components/CourseResources";
import TimedTest from "@/components/TimedTest";
import TestResults from "@/components/TestResults";
import PracticeExercises from "@/components/PracticeExercises";
import { motion, AnimatePresence } from "framer-motion";
import { getBestRecord, TestRecord } from "@/lib/testRecordsService";
import { useAuth } from "@/contexts/AuthContext";

const ProgrammingLanguageDetail = () => {
  const { lang } = useParams<{ lang: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const language = lang ? getLanguageBySlug(lang) : null;
  const [activeTab, setActiveTab] = useState("course");
  const [testMode, setTestMode] = useState<{ duration: 5 | 10 } | null>(null);
  const [testResult, setTestResult] = useState<{ score: number; total: number } | null>(null);
  const [best5Min, setBest5Min] = useState<TestRecord | null>(null);
  const [best10Min, setBest10Min] = useState<TestRecord | null>(null);

  useEffect(() => {
    const fetchBest = async () => {
      if (user && lang) {
        const res5 = await getBestRecord(user.id, lang, 5);
        if (res5.data) setBest5Min(res5.data);
        
        const res10 = await getBestRecord(user.id, lang, 10);
        if (res10.data) setBest10Min(res10.data);
      }
    };
    
    fetchBest();
  }, [user, lang, testResult]);

  if (!language || (language.isAvailable === false)) {
    return (
      <div className="min-h-screen flex flex-col pt-20">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-20 text-center flex flex-col items-center justify-center space-y-6">
          <div className="w-24 h-24 bg-primary/10 rounded-[2rem] flex items-center justify-center text-5xl mb-4 animate-pulse">
            🚀
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-black italic uppercase tracking-tighter">Content <span className="text-primary tracking-normal not-italic font-normal">Coming Soon</span></h1>
            <p className="text-muted-foreground text-lg max-w-md mx-auto">
              We're currently curating the best resources for {language?.name || 'this language'}. Stay tuned!
            </p>
          </div>
          <Button 
            size="lg"
            onClick={() => navigate("/programming-languages")}
            className="rounded-2xl h-14 px-8 text-lg font-bold shadow-xl shadow-primary/10"
          >
            Back to Hub
          </Button>
        </main>
        <Footer />
      </div>
    );
  }

  const handleTestComplete = (score: number, total: number) => {
    setTestResult({ score, total });
  };

  const startTest = (duration: 5 | 10) => {
    setTestMode({ duration });
    setTestResult(null);
  };

  return (
    <div className="min-h-screen flex flex-col pt-20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8 max-w-5xl">
        <Button 
          variant="ghost" 
          onClick={() => navigate("/programming-languages")}
          className="mb-8 hover:bg-primary/10 hover:text-primary transition-colors gap-2"
        >
          <ArrowLeft size={18} />
          Back to Hub
        </Button>

        {/* Header Section */}
        <section className="mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-2">
              <div 
                className="w-20 h-20 rounded-2xl flex items-center justify-center p-4 mb-4"
                style={{ backgroundColor: `${language.color}20` }}
              >
                <div dangerouslySetInnerHTML={{ __html: language.icon }} className="w-full h-full flex items-center justify-center" />
              </div>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter italic">
                {language.name} <span className="text-primary tracking-normal not-italic font-normal">Mastery</span>
              </h1>
              <p className="text-muted-foreground text-lg max-w-2xl">
                {language.description}
              </p>
            </div>
            
            <div className="flex gap-4">
               <div className="bg-muted/50 px-4 py-2 rounded-xl text-center">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Best (5m)</p>
                  <p className="text-xl font-black italic">{best5Min ? `${best5Min.score}/${best5Min.total_questions}` : "--"}</p>
               </div>
               <div className="bg-muted/50 px-4 py-2 rounded-xl text-center">
                  <p className="text-[10px] font-bold uppercase text-muted-foreground">Best (10m)</p>
                  <p className="text-xl font-black italic">{best10Min ? `${best10Min.score}/${best10Min.total_questions}` : "--"}</p>
               </div>
            </div>
          </div>
        </section>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-3 h-14 p-1.5 bg-muted/50 rounded-[1.25rem] mb-6">
            <TabsTrigger value="course" className="rounded-[1rem] text-sm font-bold gap-2">
              <PlayCircle size={18} />
              <span className="hidden sm:inline">Course Resources</span>
              <span className="sm:hidden">Course</span>
            </TabsTrigger>
            <TabsTrigger value="test" className="rounded-[1rem] text-sm font-bold gap-2">
              <Trophy size={18} />
              <span className="hidden sm:inline">Timed Test</span>
              <span className="sm:hidden">Test</span>
            </TabsTrigger>
            <TabsTrigger value="practice" className="rounded-[1rem] text-sm font-bold gap-2">
              <PenTool size={18} />
              <span className="hidden sm:inline">Practice Exercises</span>
              <span className="sm:hidden">Practice</span>
            </TabsTrigger>
          </TabsList>

          <AnimatePresence mode="wait">
            <TabsContent value="course">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <CourseResources resources={language.courses} languageName={language.name} />
              </motion.div>
            </TabsContent>

            <TabsContent value="test">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {!testMode ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-8">
                    <Card className="p-8 border-none bg-muted/30 flex flex-col items-center text-center space-y-6 rounded-[2rem]">
                      <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center">
                        <Clock size={40} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Sprint Test</h3>
                        <p className="text-sm text-muted-foreground">
                          Quick 5-minute challenge to test your fundamental
                        </p>
                      </div>
                      <div className="text-sm font-bold bg-green-500/10 text-green-500 px-4 py-1 rounded-full">
                        10 Questions
                      </div>
                      <Button 
                        size="lg" 
                        onClick={() => startTest(5)}
                        className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-green-500/10 hover:bg-green-600"
                      >
                        Start 5 Min Test
                      </Button>
                    </Card>

                    <Card className="p-8 border-none bg-muted/30 flex flex-col items-center text-center space-y-6 rounded-[2rem]">
                      <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center">
                        <Trophy size={40} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-2xl font-black uppercase tracking-tighter">Marathon Test</h3>
                        <p className="text-sm text-muted-foreground">
                          Full 10-minute assessment covering advanced concepts.
                        </p>
                      </div>
                      <div className="text-sm font-bold bg-primary/10 text-primary px-4 py-1 rounded-full">
                        20 Questions
                      </div>
                      <Button 
                        size="lg" 
                        onClick={() => startTest(10)}
                        className="w-full h-14 rounded-2xl text-lg font-bold shadow-xl shadow-primary/10"
                      >
                        Start 10 Min Test
                      </Button>
                    </Card>
                  </div>
                ) : testResult ? (
                  <TestResults 
                    score={testResult.score}
                    total={testResult.total}
                    languageSlug={language.slug}
                    languageName={language.name}
                    durationMinutes={testMode.duration}
                    onRetry={() => setTestMode(null)}
                    onBack={() => setActiveTab("course")}
                  />
                ) : (
                  <TimedTest 
                    questions={language.tests[testMode.duration]}
                    durationMinutes={testMode.duration}
                    languageSlug={language.slug}
                    languageName={language.name}
                    onComplete={handleTestComplete}
                  />
                )}
              </motion.div>
            </TabsContent>

            <TabsContent value="practice">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <PracticeExercises exercises={language.exercises} />
              </motion.div>
            </TabsContent>
          </AnimatePresence>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default ProgrammingLanguageDetail;
