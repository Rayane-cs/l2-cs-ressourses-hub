import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { CourseResource } from "@/lib/programmingLanguagesData";
import { ExternalLink, Youtube, Globe } from "lucide-react";
import { Badge } from "./ui/badge";
import YoutubeCard from "./YoutubeCard";

interface CourseResourcesProps {
  resources: CourseResource[];
  languageName: string;
}

const CourseResources = ({ resources, languageName }: CourseResourcesProps) => {
  const youtube = resources.filter(r => r.type === 'youtube');
  const websites = resources.filter(r => r.type === 'website');

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {youtube.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500">
                <Youtube size={24} />
              </div>
              YouTube <span className="text-primary not-italic">Tutorials</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {youtube.map((resource, index) => (
              <YoutubeCard 
                key={index}
                title={resource.title}
                url={resource.url}
                difficulty={resource.difficulty}
                description={resource.description}
                languageName={languageName}
              />
            ))}
          </div>
        </div>
      )}

      {websites.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Globe size={24} />
              </div>
              Interactive <span className="text-primary not-italic">Websites</span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {websites.map((resource, index) => (
              <Card key={index} className="bg-muted/20 border border-border/50 hover:border-primary/30 transition-all group overflow-hidden rounded-[2rem] flex flex-col h-full">
                <CardHeader className="p-6 pb-2">
                  <div className="flex justify-between items-start gap-4">
                    <CardTitle className="text-lg font-bold line-clamp-2 leading-tight group-hover:text-primary transition-colors">
                      {resource.title}
                    </CardTitle>
                  </div>
                  {resource.difficulty && (
                    <Badge variant="secondary" className="text-[10px] font-black uppercase mt-2 bg-primary/10 text-primary border-none px-2 py-0">
                      {resource.difficulty}
                    </Badge>
                  )}
                </CardHeader>
                <CardContent className="p-6 pt-2 flex-1 flex flex-col">
                  <CardDescription className="text-xs text-muted-foreground line-clamp-3 mb-6 leading-relaxed">
                    {resource.description || `Read documentation and practice ${languageName} on ${new URL(resource.url).hostname}.`}
                  </CardDescription>
                  <Button 
                    asChild 
                    size="sm" 
                    className="w-full mt-auto rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-bold gap-2 shadow-lg shadow-primary/20"
                  >
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseResources;
