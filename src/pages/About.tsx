import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, MessageSquare, Code, Search, FileText, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: GraduationCap,
      title: t.about.comprehensiveResources,
      description: t.about.comprehensiveResourcesDesc,
    },
    {
      icon: BookOpen,
      title: t.about.organizedByModule,
      description: t.about.organizedByModuleDesc,
    },
    {
      icon: Code,
      title: t.about.programmingLanguage,
      description: t.about.programmingLanguageDesc,
    },
    {
      icon: Search,
      title: t.about.advancedSearch,
      description: t.about.advancedSearchDesc,
    },
    {
      icon: FileText,
      title: t.about.multipleResourceTypes,
      description: t.about.multipleResourceTypesDesc,
    },
    {
      icon: Globe,
      title: t.about.bilingualSupport,
      description: t.about.bilingualSupportDesc,
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.about.title}</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t.about.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-12">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="animate-fade-in hover:shadow-hover transition-smooth"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="bg-primary/10 p-3 rounded-lg">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                      <p className="text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">{t.about.missionTitle}</h2>
              <p className="text-muted-foreground leading-relaxed">
                {t.about.missionText}
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default About;
