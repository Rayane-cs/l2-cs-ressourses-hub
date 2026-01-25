import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trophy, ArrowLeft, RotateCcw, Medal, Star, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import { getBestRecord, TestRecord } from "@/lib/testRecordsService";
import { useAuth } from "@/contexts/AuthContext";

interface TestResultsProps {
  score: number;
  total: number;
  languageSlug: string;
  languageName: string;
  durationMinutes: number;
  onRetry: () => void;
  onBack: () => void;
}

const TestResults = ({ score, total, languageSlug, languageName, durationMinutes, onRetry, onBack }: TestResultsProps) => {
  const [bestRecord, setBestRecord] = useState<TestRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const percentage = Math.round((score / total) * 100);
  
  useEffect(() => {
    const fetchBest = async () => {
      if (user) {
        const { data } = await getBestRecord(user.id, languageSlug, durationMinutes);
        if (data) setBestRecord(data);
      }
      setLoading(false);
    };
    
    fetchBest();
  }, [user, languageSlug, durationMinutes]);

  const getRank = (p: number) => {
    if (p >= 90) return { label: "Expert", color: "text-yellow-500", bg: "bg-yellow-500/10", icon: <Star /> };
    if (p >= 70) return { label: "Advanced", color: "text-blue-500", bg: "bg-blue-500/10", icon: <Trophy /> };
    if (p >= 50) return { label: "Intermediate", color: "text-green-500", bg: "bg-green-500/10", icon: <Medal /> };
    return { label: "Beginner", color: "text-slate-400", bg: "bg-slate-400/10", icon: <Calendar /> };
  };

  const rank = getRank(percentage);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card className="border-none shadow-2xl overflow-hidden bg-background/50 backdrop-blur-md">
        <div className={`h-2 ${percentage >= 70 ? "bg-primary" : "bg-orange-500"}`} />
        <CardHeader className="text-center pt-10 pb-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12 }}
            className={`w-24 h-24 mx-auto rounded-full flex items-center justify-center mb-6 ${rank.bg} ${rank.color}`}
          >
            {rank.icon}
          </motion.div>
          <CardTitle className="text-4xl font-black mb-2 uppercase tracking-tighter italic">
            {percentage >= 70 ? "Brilliant Work!" : "Great Effort!"}
          </CardTitle>
          <p className="text-muted-foreground font-medium">
            You completed the {languageName} {durationMinutes}-minute test
          </p>
        </CardHeader>
        
        <CardContent className="px-8 pb-10 space-y-8">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted/40 p-6 rounded-3xl text-center space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase">Final Score</p>
              <p className="text-4xl font-black">{score}/{total}</p>
            </div>
            <div className="bg-muted/40 p-6 rounded-3xl text-center space-y-1">
              <p className="text-xs font-bold text-muted-foreground uppercase">Percentage</p>
              <p className="text-4xl font-black">{percentage}%</p>
            </div>
          </div>

          <div className="bg-primary/5 border border-primary/20 p-6 rounded-3xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <Star size={20} />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase">Your Best Record</p>
                  <p className="text-lg font-bold">
                    {loading ? "Loading..." : (bestRecord ? `${bestRecord.score}/${bestRecord.total_questions} (${Math.round(bestRecord.percentage || 0)}%)` : "No records yet")}
                  </p>
                </div>
              </div>
              {bestRecord && percentage > (bestRecord.percentage || 0) && (
                <div className="bg-yellow-500 text-yellow-950 text-[10px] font-black px-3 py-1 rounded-full uppercase italic">
                  New Record!
                </div>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button onClick={onRetry} className="flex-1 h-14 rounded-2xl text-lg font-bold gap-2">
              <RotateCcw className="h-5 w-5" />
              Retake Test
            </Button>
            <Button onClick={onBack} variant="outline" className="flex-1 h-14 rounded-2xl text-lg font-bold gap-2">
              <ArrowLeft className="h-5 w-5" />
              Back to Courses
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TestResults;
