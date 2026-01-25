import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { LanguageData } from "@/lib/programmingLanguagesData";
import { motion } from "framer-motion";

interface LanguageCardProps {
  language: LanguageData;
}

const LanguageCard = ({ language }: LanguageCardProps) => {
  const isAvailable = language.isAvailable !== false; // Default true if not specified

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (!isAvailable) {
      return (
        <div className="h-full relative opacity-70 cursor-not-allowed">
           <div className="absolute top-4 right-4 z-10 bg-primary/20 text-primary px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md border border-primary/30">
            Coming Soon
          </div>
          {children}
        </div>
      );
    }
    return <Link to={`/programming-languages/${language.slug}`}>{children}</Link>;
  };

  return (
    <motion.div
      whileHover={isAvailable ? { y: -5 } : {}}
      transition={{ duration: 0.2 }}
    >
      <CardWrapper>
        <Card className={`h-full overflow-hidden border-border/50 transition-colors group ${isAvailable ? 'hover:border-primary/50 cursor-pointer' : 'grayscale-[0.5]'}`}>
          <CardHeader className="pb-2">
            <div 
              className={`w-12 h-12 rounded-xl flex items-center justify-center p-2.5 mb-4 transition-transform ${isAvailable ? 'group-hover:scale-110' : ''}`}
              style={{ backgroundColor: `${language.color}20` }}
            >
              <div dangerouslySetInnerHTML={{ __html: language.icon }} className="w-full h-full flex items-center justify-center" />
            </div>
            <CardTitle className={`text-xl transition-colors ${isAvailable ? 'group-hover:text-primary' : ''}`}>
              {language.name}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-sm line-clamp-2">
              {language.description}
            </CardDescription>
            
            <div className="mt-4 flex items-center gap-4 text-xs font-medium text-muted-foreground">
              <span className="flex items-center gap-1">
                {language.courses.length} Courses
              </span>
              <span className="flex items-center gap-1">
                {(language.tests[5]?.length || 0) + (language.tests[10]?.length || 0)} Questions
              </span>
            </div>
          </CardContent>
        </Card>
      </CardWrapper>
    </motion.div>
  );
};

export default LanguageCard;
