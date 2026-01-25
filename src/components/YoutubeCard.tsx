import { Youtube } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface YoutubeCardProps {
  title: string;
  url: string;
  difficulty?: string;
  description?: string;
  languageName?: string;
}

const YoutubeCard = ({ title, url, difficulty, description, languageName }: YoutubeCardProps) => {
  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const videoId = extractYoutubeId(url);

  return (
    <Card className="bg-muted/20 border border-border/50 hover:border-primary/30 transition-all group overflow-hidden rounded-3xl h-full flex flex-col">
      <a href={url} target="_blank" rel="noopener noreferrer" className="block relative aspect-video overflow-hidden">
        {videoId ? (
          <img 
            src={`https://img.youtube.com/vi/${videoId}/mqdefault.jpg`} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-slate-900 flex items-center justify-center">
            <Youtube size={48} className="text-primary/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[2px]">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-xl transform translate-y-4 group-hover:translate-y-0 transition-transform">
            <Youtube size={24} fill="currentColor" />
          </div>
        </div>
      </a>
      <CardHeader className="p-5 pb-2">
        <div className="flex justify-between items-start gap-4">
          <CardTitle className="text-base font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
            {title}
          </CardTitle>
        </div>
        {difficulty && (
          <Badge variant="secondary" className="text-[10px] font-black uppercase mt-2 bg-primary/10 text-primary border-none px-2 py-0">
            {difficulty}
          </Badge>
        )}
      </CardHeader>
      <CardContent className="p-5 pt-2 flex-1 flex flex-col">
        <CardDescription className="text-xs line-clamp-2 mb-4">
          {description || (languageName ? `Master ${languageName} with this comprehensive step-by-step video guide.` : "Comprehensive video guide for your learning path.")}
        </CardDescription>
        <Button 
          asChild 
          size="sm" 
          className="w-full mt-auto rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 shadow-lg shadow-primary/20"
        >
          <a href={url} target="_blank" rel="noopener noreferrer">
            <Youtube className="h-4 w-4" />
            Watch Now
          </a>
        </Button>
      </CardContent>
    </Card>
  );
};

export default YoutubeCard;
