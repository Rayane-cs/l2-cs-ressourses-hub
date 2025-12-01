import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, BookOpen, MessageSquare } from "lucide-react";

const About = () => {
  const features = [
    {
      icon: GraduationCap,
      title: "Comprehensive Resources",
      description: "Access all course materials, TDs, TPs, and code files in one centralized platform.",
    },
    {
      icon: BookOpen,
      title: "Organized by Module",
      description: "Easily navigate through 7 different modules with intuitive categorization.",
    },
    {
      icon: BookOpen,
      title: "Programming Language",
      description: "Easily navigate through 7 ",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-10">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">About UHBC CS Platform</h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A modern, student-friendly platform designed to help UHBC L2 Computer Science students access all their academic resources efficiently.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
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
              <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                We believe in empowering students through accessible education.
                This platform was created to centralize all academic resources for UHBC L2 Computer Science students, 
                making it easier to find materials, collaborate with peers, and succeed in your studies. 
                With features like organized module pages, advanced search and secure file management via Google Drive, 
                we're committed to enhancing your learning experience.
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
