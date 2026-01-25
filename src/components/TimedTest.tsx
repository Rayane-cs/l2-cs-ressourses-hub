import { useState, useEffect, useCallback } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { TestQuestion } from "@/lib/programmingLanguagesData";
import { Timer, AlertCircle, CheckCircle2, Trophy, Clock, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { saveTestRecord, TestResult } from "@/lib/testRecordsService";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "./ui/use-toast";

interface TimedTestProps {
  questions: TestQuestion[];
  durationMinutes: number;
  languageSlug: string;
  languageName: string;
  onComplete: (score: number, total: number) => void;
}

const TimedTest = ({ questions, durationMinutes, languageSlug, languageName, onComplete }: TimedTestProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [timeLeft, setTimeLeft] = useState(durationMinutes * 60);
  const [isFinished, setIsFinished] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, profile } = useAuth();
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const calculateScore = useCallback(() => {
    let score = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        score++;
      }
    });
    return score;
  }, [questions, selectedAnswers]);

  const handleFinish = useCallback(async () => {
    if (isFinished) return;
    setIsFinished(true);
    setIsSubmitting(true);

    const score = calculateScore();
    
    if (user) {
      const result: TestResult = {
        language: languageSlug,
        testDuration: durationMinutes,
        score: score,
        totalQuestions: questions.length
      };

      const { success, error } = await saveTestRecord(
        result,
        user.id,
        profile?.display_id || null,
        user.email || null
      );

      if (success) {
        toast({
          title: "Test Recorded!",
          description: `Your score of ${score}/${questions.length} has been saved.`,
        });
      } else {
        console.error("Failed to save record:", error);
      }
    }

    setIsSubmitting(false);
    onComplete(score, questions.length);
  }, [isFinished, calculateScore, user, profile, languageSlug, durationMinutes, questions.length, onComplete, toast]);

  useEffect(() => {
    if (timeLeft <= 0) {
      handleFinish();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, handleFinish]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const nextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleFinish();
    }
  };

  if (isFinished) {
    return (
      <Card className="max-w-2xl mx-auto border-none shadow-lg bg-background/50 backdrop-blur-sm">
        <CardContent className="pt-12 pb-12 flex flex-col items-center text-center space-y-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary"
          >
            <Trophy size={40} />
          </motion.div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold">Test Completed!</h2>
            <p className="text-muted-foreground">Calculating your final score...</p>
          </div>
          <div className="animate-pulse flex space-x-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <div className="w-2 h-2 bg-primary rounded-full"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Timer and Progress */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-muted/30 p-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${timeLeft < 60 ? "bg-red-500/10 text-red-500" : "bg-primary/10 text-primary"}`}>
            <Clock className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Time Remaining</p>
            <p className={`text-xl font-mono font-bold ${timeLeft < 60 ? "text-red-500" : ""}`}>
              {formatTime(timeLeft)}
            </p>
          </div>
        </div>
        
        <div className="flex-1 max-w-xs space-y-2">
          <div className="flex justify-between text-xs font-medium">
            <span>Progress: {currentQuestionIndex + 1}/{questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestionIndex}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-border/50 shadow-xl">
            <CardHeader className="p-6 md:p-8">
              <CardTitle className="text-xl md:text-2xl font-bold leading-tight">
                {currentQuestion.question}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 md:p-8 pt-0 space-y-4">
              <div className="grid grid-cols-1 gap-3">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    className={`flex items-center text-left p-4 rounded-xl border-2 transition-all group ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? "border-primary bg-primary/5 ring-4 ring-primary/10"
                        : "border-border hover:border-primary/30 hover:bg-muted/50"
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-4 flex-shrink-0 font-bold border-2 ${
                      selectedAnswers[currentQuestionIndex] === index
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border group-hover:border-primary/30"
                    }`}>
                      {String.fromCharCode(65 + index)}
                    </div>
                    <span className="text-base md:text-lg font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </CardContent>
            <CardFooter className="p-6 md:p-8 border-t border-border/50 bg-muted/10 flex justify-between items-center">
              <div className="text-sm text-muted-foreground italic">
                {selectedAnswers[currentQuestionIndex] !== undefined ? "Selection made" : "Please select an answer"}
              </div>
              <Button 
                onClick={nextQuestion} 
                disabled={selectedAnswers[currentQuestionIndex] === undefined}
                className="rounded-full px-8 h-12 text-base font-bold"
              >
                {currentQuestionIndex === questions.length - 1 ? "Finish Test" : "Next Question"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default TimedTest;
