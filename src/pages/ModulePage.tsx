import { useParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import resources from "@/lib/index";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Resource } from "@/lib/types";

function readLocalResources() {
  try {
    const raw = localStorage.getItem("drive_resources");
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, Array<Resource>>;
  } catch (e) {
    console.error("Failed to read local drive_resources", e);
    return {};
  }
}

function getCombinedResources() {
  const local = readLocalResources();
  const combined: Record<string, Array<Resource>> = { ...(resources as Record<string, Array<Resource>>) };
  Object.keys(local).forEach((k) => {
    combined[k] = (combined[k] || []).concat(local[k]);
  });
  return combined;
}

const ModulePage = () => {
  const { moduleSlug } = useParams();
  const [activeTab, setActiveTab] = useState("all");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  // Define which modules don't have TPs or TDs
  const noTPModules = ["thg", "english", "logique"];
  const noTDModules = ["method-num"];
  
  const showTP = !noTPModules.includes(moduleSlug || "");
  const showTD = !noTDModules.includes(moduleSlug || "");
  
  // Calculate number of visible tabs for grid
  const visibleTabCount = 2 + (showTD ? 2 : 0) + (showTP ? 2 : 0); // All + Course + (TD + TD Solutions) + (TP + TP Solutions)

  const { t } = useLanguage();
  const moduleName = t.moduleNames[moduleSlug || ""] || t.module || "Module";

  const combined = getCombinedResources();
  const moduleResources = combined[moduleSlug || ""] || [];

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
    // Small delay to ensure DOM is rendered
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
  }, [showTD, showTP]); // Re-check when tabs change

  // NOTE: grouping by series removed — render flat lists per request
  const placeholderMessage = (
    <div className="text-center py-20">
      <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-2xl font-semibold mb-2">{t.noResourcesTitle}</h3>
      <p className="text-muted-foreground">{t.noResourcesDesc}</p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-10">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{moduleName}</h1>
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
                    value="course"
                  >
                    {t.tabs.course}
                  </TabsTrigger>
                  {showTD && (
                    <>
                      <div className="h-8 w-px bg-border mx-1" role="separator" />
                      <TabsTrigger 
                        className="text-sm px-3 py-2 whitespace-nowrap" 
                        value="td"
                      >
                        {t.tabs.td}
                      </TabsTrigger>
                      <TabsTrigger 
                        className="text-sm px-3 py-2 whitespace-nowrap" 
                        value="td-solutions"
                      >
                        {t.tabs.tdSolutions}
                      </TabsTrigger>
                    </>
                  )}
                  {showTP && (
                    <>
                      <div className="h-8 w-px bg-border mx-1" role="separator" />
                      <TabsTrigger 
                        className="text-sm px-3 py-2 whitespace-nowrap" 
                        value="tp"
                      >
                        {t.tabs.tp}
                      </TabsTrigger>
                      <TabsTrigger 
                        className="text-sm px-3 py-2 whitespace-nowrap" 
                        value="tp-solutions"
                      >
                        {t.tabs.tpSolutions}
                      </TabsTrigger>
                    </>
                  )}
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
                {/* Main Section */}
                <div className="flex gap-1">
                  <TabsTrigger 
                    className="text-base px-3 py-2 flex-none" 
                    value="all"
                  >
                    {t.tabs.all}
                  </TabsTrigger>
                  <TabsTrigger 
                    className="text-base px-3 py-2 flex-none" 
                    value="course"
                  >
                    {t.tabs.course}
                  </TabsTrigger>
                </div>

                {/* TD Section */}
                {showTD && (
                  <>
                    <div className="h-8 w-px bg-border mx-1" role="separator" />
                    <div className="flex gap-1">
                      <TabsTrigger 
                        className="text-base px-3 py-2 flex-none" 
                        value="td"
                      >
                        {t.tabs.td}
                      </TabsTrigger>
                      <TabsTrigger 
                        className="text-base px-3 py-2 flex-none" 
                        value="td-solutions"
                      >
                        {t.tabs.tdSolutions}
                      </TabsTrigger>
                    </div>
                  </>
                )}

                {/* TP Section */}
                {showTP && (
                  <>
                    <div className="h-8 w-px bg-border mx-1" role="separator" />
                    <div className="flex gap-1">
                      <TabsTrigger 
                        className="text-base px-3 py-2 flex-none" 
                        value="tp"
                      >
                        {t.tabs.tp}
                      </TabsTrigger>
                      <TabsTrigger 
                        className="text-base px-3 py-2 flex-none" 
                        value="tp-solutions"
                      >
                        {t.tabs.tpSolutions}
                      </TabsTrigger>
                    </div>
                  </>
                )}
              </TabsList>
            </div>

            <TabsContent value="all" className="animate-fade-in">
              {moduleResources.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {moduleResources.map((res) => (
                    <Card key={res.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {res.title}
                        </CardTitle>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span className="px-2 py-1 bg-secondary/10 rounded-md">{res.semester}</span>
                            <span className="px-2 py-1 bg-secondary/10 rounded-md capitalize">{res.type}</span>
                            <span className="px-2 py-1 bg-secondary/10 rounded-md">{moduleName}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <a
                              href={res.driveUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
                            >
                              View
                            </a>
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

            <TabsContent value="course" className="animate-fade-in">
              {moduleResources.filter((r) => r.type === "course").length > 0 ? (
                moduleResources
                  .filter((r) => r.type === "course")
                  .map((res) => (
                    <Card key={res.id}>
                      <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <FileText className="h-5 w-5" />
                            {res.title}
                          </span>
                          <a href={res.driveUrl} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
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

            {showTD && (
              <TabsContent value="td" className="animate-fade-in">
                {moduleResources.filter((r) => r.type === "td").length > 0 ? (
                  moduleResources
                    .filter((r) => r.type === "td")
                    .map((res: Resource) => (
                      <Card key={res.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              {res.title}
                            </span>
                            <a href={res.driveUrl} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
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
            )}

            {showTP && (
              <TabsContent value="tp" className="animate-fade-in">
                {moduleResources.filter((r) => r.type === "tp").length > 0 ? (
                  moduleResources
                    .filter((r) => r.type === "tp")
                    .map((res: Resource) => (
                      <Card key={res.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              {res.title}
                            </span>
                            <a href={res.driveUrl} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
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
            )}

            {/* TD Solutions */}
            {showTD && (
              <TabsContent value="td-solutions" className="animate-fade-in">
                {moduleResources.filter((r) => r.type === "td-solution" || r.type === "td-sols").length > 0 ? (
                  moduleResources
                    .filter((r) => r.type === "td-solution" || r.type === "td-sols")
                    .map((res: Resource) => (
                      <Card key={res.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              {res.title}
                            </span>
                            <a href={res.driveUrl} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
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
            )}

            {/* TP Solutions */}
            {showTP && (
              <TabsContent value="tp-solutions" className="animate-fade-in">
                {moduleResources.filter((r) => r.type === "tp-solution" || r.type === "tp-sols").length > 0 ? (
                  moduleResources
                    .filter((r) => r.type === "tp-solution" || r.type === "tp-sols")
                    .map((res: Resource) => (
                      <Card key={res.id}>
                        <CardHeader>
                          <CardTitle className="flex items-center justify-between">
                            <span className="flex items-center gap-2">
                              <FileText className="h-5 w-5" />
                              {res.title}
                            </span>
                            <a href={res.driveUrl} target="_blank" rel="noreferrer" className="text-sm text-primary underline">
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
            )}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModulePage;
