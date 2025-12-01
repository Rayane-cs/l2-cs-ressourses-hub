import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Youtube, BookOpen, Copy, Check, ChevronLeft, ChevronRight } from "lucide-react";
import resources from "@/lib/index";
import { useLanguage } from "@/contexts/LanguageContext";
import { useToast } from "@/components/ui/use-toast";
import type { Resource } from "@/lib/types";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const LanguagePage = () => {
  const { languageSlug } = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  const [activeExercise, setActiveExercise] = useState<Resource | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [explanationLang, setExplanationLang] = useState<"en" | "fr">("en");
  const [isCopied, setIsCopied] = useState(false);

  const { t } = useLanguage();
  const { toast } = useToast();
  const languageName = languageSlug ? languageSlug.toUpperCase() : "Language";

  const languageResources = resources[`programming-${languageSlug}`] || [];

  // Check scroll position for arrow visibility
  const checkScrollButtons = () => {
    const container = scrollContainerRef.current;
    if (!container) return;
    
    setCanScrollLeft(container.scrollLeft > 0);
    setCanScrollRight(
      container.scrollLeft < container.scrollWidth - container.clientWidth - 1
    );
  };

  // Scroll functions
  const scrollLeft = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: -200, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    const container = scrollContainerRef.current;
    if (container) {
      container.scrollBy({ left: 200, behavior: "smooth" });
    }
  };

  // Check scroll on mount and resize
  useEffect(() => {
    const timer = setTimeout(() => {
      checkScrollButtons();
    }, 100);
    
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", checkScrollButtons);
      window.addEventListener("resize", checkScrollButtons);
    }
    
    return () => {
      clearTimeout(timer);
      if (container) {
        container.removeEventListener("scroll", checkScrollButtons);
      }
      window.removeEventListener("resize", checkScrollButtons);
    };
  }, []);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        description: "Code copied to clipboard",
        duration: 2000,
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (e) {
      console.error("copy failed", e);
      toast({
        variant: "destructive",
        description: "Failed to copy code",
        duration: 2000,
      });
    }
  };

  const placeholderMessage = (
    <div className="text-center py-20">
      <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-2xl font-semibold mb-2">{t.noResourcesTitle}</h3>
      <p className="text-muted-foreground">{t.noResourcesDesc}</p>
    </div>
  );

  return (
    <div className={`min-h-screen flex flex-col ${activeExercise ? 'overflow-hidden' : ''}`}>
      <Header />

      <main className="flex-1 pt-24 pb-10">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{languageName}</h1>
            <p className="text-xl text-muted-foreground">{t.accessText}</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Mobile: Scrollable tabs with arrows */}
            <div className="relative w-full max-w-3xl mx-auto mb-8 md:hidden">
              {canScrollLeft && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-8 z-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
                  onClick={scrollLeft}
                >
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Scroll left</span>
                </Button>
              )}
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide px-10"
                onScroll={checkScrollButtons}
              >
                <TabsList className="inline-flex gap-2 p-2 bg-muted/50 rounded-lg min-w-max">
                  <TabsTrigger 
                    className="text-sm px-3 py-2 whitespace-nowrap" 
                    value="all"
                  >
                    {t.tabs.all}
                  </TabsTrigger>
                  <TabsTrigger 
                    className="text-sm px-3 py-2 whitespace-nowrap" 
                    value="pdf"
                  >
                    PDFs
                  </TabsTrigger>
                  <TabsTrigger 
                    className="text-sm px-3 py-2 whitespace-nowrap" 
                    value="youtube"
                  >
                    YouTube
                  </TabsTrigger>
                  <TabsTrigger 
                    className="text-sm px-3 py-2 whitespace-nowrap" 
                    value="exercise"
                  >
                    Exercises
                  </TabsTrigger>
                </TabsList>
              </div>
              {canScrollRight && (
                <Button
                  variant="outline"
                  size="icon"
                  className="absolute right-0 top-1/2 -translate-y-1/2 h-8 w-8 z-10 rounded-full bg-background/80 backdrop-blur-sm shadow-md"
                  onClick={scrollRight}
                >
                  <ChevronRight className="h-4 w-4" />
                  <span className="sr-only">Scroll right</span>
                </Button>
              )}
            </div>

            {/* Desktop: Regular layout */}
            <div className="relative w-full max-w-3xl mx-auto mb-8 hidden md:block overflow-hidden">
              <TabsList 
                className="w-full flex flex-row gap-2 p-2 items-center bg-muted/50 rounded-lg"
              >
                <div className="flex gap-1">
                  <TabsTrigger 
                    className="text-base px-3 py-2 flex-none" 
                    value="all"
                  >
                    {t.tabs.all}
                  </TabsTrigger>
                  <TabsTrigger 
                    className="text-base px-3 py-2 flex-none" 
                    value="pdf"
                  >
                    PDFs
                  </TabsTrigger>
                  <TabsTrigger 
                    className="text-base px-3 py-2 flex-none" 
                    value="youtube"
                  >
                    YouTube
                  </TabsTrigger>
                  <TabsTrigger 
                    className="text-base px-3 py-2 flex-none" 
                    value="exercise"
                  >
                    Exercises
                  </TabsTrigger>
                </div>
              </TabsList>
            </div>

            <TabsContent value="all" className="animate-fade-in">
              {languageResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {languageResources.map((res) => (
                    <Card key={res.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          {res.title}
                        </CardTitle>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="px-2 py-1 bg-secondary/10 rounded-md capitalize">{res.type}</span>
                            <span className="px-2 py-1 bg-secondary/10 rounded-md">{languageName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            {res.type === "exercise" ? (
                                <Button size="sm" onClick={() => { setActiveExercise(res); setShowExplanation(false); }}>
                                    Open Exercise
                                </Button>
                            ) : (
                                <a
                                    href={res.url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                                >
                                    View
                                </a>
                            )}
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  ))}
                </div>
              ) : (
                placeholderMessage
              )}
            </TabsContent>

            <TabsContent value="pdf" className="animate-fade-in">
              {languageResources.filter((r) => r.type === "pdf").length > 0 ? (
                languageResources
                  .filter((r) => r.type === "pdf")
                  .map((res) => (
                    <Card key={res.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            {res.title}
                          </span>
                          <a href={res.url} target="_blank" rel="noreferrer" aria-label={`Open ${res.title} in new tab`} className="text-sm text-primary underline">
                            Open
                          </a>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))
              ) : (
                placeholderMessage
              )}
            </TabsContent>

            <TabsContent value="youtube" className="animate-fade-in">
              {languageResources.filter((r) => r.type === "youtube").length > 0 ? (
                languageResources
                  .filter((r) => r.type === "youtube")
                  .map((res) => (
                    <Card key={res.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            {res.title}
                          </span>
                          <a href={res.url} target="_blank" rel="noreferrer" aria-label={`Open ${res.title} in new tab`} className="text-sm text-primary underline">
                            Open
                          </a>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))
              ) : (
                placeholderMessage
              )}
            </TabsContent>

            <TabsContent value="exercise" className="animate-fade-in">
              {languageResources.filter((r) => r.type === "exercise").length > 0 ? (
                languageResources
                  .filter((r) => r.type === "exercise")
                  .map((res) => (
                    <Card key={res.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            {res.title}
                          </span>
                          <Button size="sm" onClick={() => { setActiveExercise(res); setShowExplanation(false); }}>
                            Open Exercise
                          </Button>
                        </CardTitle>
                      </CardHeader>
                    </Card>
                  ))
              ) : (
                placeholderMessage
              )}
            </TabsContent>
          </Tabs>

          {/* Exercise viewer */}
          {activeExercise && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-black/80" onClick={() => setActiveExercise(null)} />
              <div className="relative w-full max-w-7xl bg-card rounded-md shadow-lg overflow-hidden">
                <div className="flex items-center justify-between p-3 border-b border-border">
                  <div className="font-semibold">{activeExercise.title}</div>
                  <div className="flex items-center gap-2">
                    <button className="text-sm px-2 py-1 bg-muted/30 rounded" onClick={() => setExplanationLang(explanationLang === "en" ? "fr" : "en")}>{explanationLang.toUpperCase()}</button>
                    <button className="text-sm px-2 py-1 bg-muted/30 rounded" onClick={() => setActiveExercise(null)}>X</button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  <div className="p-4 border-r border-border">
                    <h4 className="font-medium mb-2">Problem</h4>
                    <div className="whitespace-pre-line text-sm leading-relaxed text-gray-200">
                      {activeExercise.problem}
                    </div>

                  </div>
                  <div className="p-4 relative">
                    <div className="flex items-center justify-end gap-2 mb-2">
                      <button
                        className="text-sm px-3 py-1.5 bg-muted/20 hover:bg-muted/40 rounded flex items-center gap-1.5 transition-colors"
                        onClick={() => copyToClipboard(activeExercise.solution || "")}
                      >
                        {isCopied ? (
                          <>
                            <Check className="h-4 w-4 text-green-500" />
                            <span className="text-green-500">Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="h-4 w-4" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                      <button
                        className="text-sm px-3 py-1.5 bg-muted/20 hover:bg-muted/40 rounded transition-colors"
                        onClick={() => setShowExplanation(true)}
                      >
                        Show more
                      </button>
                    </div>
                    <SyntaxHighlighter
                      language={languageSlug === 'c' ? 'c' : languageSlug === 'python' ? 'python' : 'text'}
                      style={vscDarkPlus}
                      className="rounded h-96 overflow-auto"
                      customStyle={{
                        margin: 0,
                        padding: '12px',
                        fontSize: '14px',
                        lineHeight: '1.5',
                      }}
                    >
                      {activeExercise.solution || ''}
                    </SyntaxHighlighter>
                  </div>
                </div>

                {/* centered explanation modal inside the exercise view */}
                {showExplanation && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-black/50 absolute inset-0" onClick={() => setShowExplanation(false)} />
                    <div className="relative bg-card p-6 rounded-md max-w-5xl z-20">
                      <div className="flex justify-end gap-2 mb-2">
                        <button className="text-sm px-2 py-1 bg-muted/30 rounded" onClick={() => setExplanationLang(explanationLang === "en" ? "fr" : "en")}>{explanationLang.toUpperCase()}</button>
                        <button className="text-sm px-2 py-1 bg-muted/30 rounded" onClick={() => setShowExplanation(false)}>X</button>
                      </div>
                      <div className="prose">
                        {activeExercise.explanation?.[explanationLang] || activeExercise.explanation?.en}
                      </div>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default LanguagePage;

