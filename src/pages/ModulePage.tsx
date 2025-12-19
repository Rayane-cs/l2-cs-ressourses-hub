import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, User, ChevronLeft, ChevronRight } from "lucide-react";
import PdfViewer from "@/components/PdfViewer";
import resources from "@/lib/index";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Resource } from "@/lib/types";
import ResourceCard from "@/components/ResourceCard";
import YtVideoCard from "@/components/YtVideoCard";
import BookCard from "@/components/BookCard";
import ResumeCard from "@/components/ResumeCard";
import { getModuleTabsOptions } from "@/lib/options";

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
  const [searchParams] = useSearchParams();
  const semesterFilter = searchParams.get("semester"); // Get semester from URL query parameter
  const [activeTab, setActiveTab] = useState("course");
  const [extraTab, setExtraTab] = useState("yt");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);
  
  // Per-module tab options (Course, TD, TP, Exams, YT, Books, Resumes) configured in src/lib/options.ts
  const {
    course: showCourse,
    td: showTD,
    tp: showTP,
    exam: showExam,
    yt: showYt,
    books: showBooks,
    resumes: showResumes,
  } = getModuleTabsOptions(moduleSlug);

  // Calculate number of visible tabs for grid
  const visibleTabCount =
    (showCourse ? 1 : 0) +
    (showTD ? 2 : 0) +
    (showTP ? 2 : 0) +
    (showExam ? 2 : 0); // Course + (TD + TD Solutions) + (TP + TP Solutions) + (Exam + Exam Solutions)

  const { t } = useLanguage();
  const moduleName = t.moduleNames[moduleSlug || ""] || t.module || "Module";

  const combined = getCombinedResources();
  let moduleResources = combined[moduleSlug || ""] || [];
  
  // Filter by semester if semester parameter is provided in URL
  if (semesterFilter) {
    moduleResources = moduleResources.filter((resource) => resource.semester === semesterFilter);
  }
  const navigate = useNavigate();
  const [viewerOpts, setViewerOpts] = useState<{
    moduleSlug?: string | null;
    resourceId?: string;
    pdfUrl?: string;
    filename?: string;
  } | null>(null);

  const openViewer = (opts: { moduleSlug?: string | null; resourceId?: string; pdfUrl?: string; filename?: string }) => {
    setViewerOpts(opts);
  };

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

  // Ensure active tab is always a valid, enabled tab for this module
  useEffect(() => {
    const possibleTabs: string[] = [];

    if (showCourse) possibleTabs.push("course");
    if (showTD) {
      possibleTabs.push("td", "td-solutions");
    }
    if (showTP) {
      possibleTabs.push("tp", "tp-solutions");
    }
    if (showExam) {
      possibleTabs.push("exam", "exam-solutions");
    }

    if (!possibleTabs.length) return;

    if (!possibleTabs.includes(activeTab)) {
      setActiveTab(possibleTabs[0]);
    }
  }, [showCourse, showTD, showTP, showExam, activeTab]);

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
            <div className="mb-4">
              <Button variant="ghost" onClick={() => navigate(-1)} className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                <span>{t.modulePage.back}</span>
              </Button>
            </div>
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
                  <span className="sr-only">{t.modulePage.scrollLeft}</span>
                </Button>
              )}
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide px-10"
                onScroll={checkScrollButtons}
              >
                <TabsList className="inline-flex gap-2 p-2 bg-muted/30 rounded-lg min-w-max backdrop-blur-sm">
                  {showCourse && (
                    <TabsTrigger 
                      className="text-sm px-3 py-2 whitespace-nowrap" 
                      value="course"
                    >
                      {t.tabs.course}
                    </TabsTrigger>
                  )}
                  {showTD && (
                    <>
                      <div className="h-8 w-px bg-border/60 dark:bg-border/40 mx-2" role="separator" />
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
                      <div className="h-8 w-px bg-border/60 dark:bg-border/40 mx-2" role="separator" />
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
                  {showExam && (
                    <>
                      <div className="h-8 w-px bg-border/60 dark:bg-border/40 mx-2" role="separator" />
                      <TabsTrigger 
                        className="text-sm px-3 py-2 whitespace-nowrap" 
                        value="exam"
                      >
                        {t.tabs.exam}
                      </TabsTrigger>
                      <TabsTrigger 
                        className="text-sm px-3 py-2 whitespace-nowrap" 
                        value="exam-solutions"
                      >
                        {t.tabs.examSolutions}
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
                  <span className="sr-only">{t.modulePage.scrollRight}</span>
                </Button>
              )}
            </div>

        {/* Desktop: Regular layout */}
        <div className="relative w-full max-w-3xl mx-auto mb-8 hidden md:flex justify-center overflow-hidden">
          <TabsList 
            className="inline-flex flex-row gap-2 p-2 items-center bg-muted/30 rounded-lg backdrop-blur-sm"
          >
                {/* Main Section */}
                <div className="flex gap-1">
                  {showCourse && (
                    <TabsTrigger 
                      className="text-base px-3 py-2 flex-none" 
                      value="course"
                    >
                      {t.tabs.course}
                    </TabsTrigger>
                  )}
                </div>

                {/* TD Section */}
                {showTD && (
                  <>
                    <div className="h-8 w-px bg-border/60 dark:bg-border/40 mx-2" role="separator" />
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
                    <div className="h-8 w-px bg-border/60 dark:bg-border/40 mx-2" role="separator" />
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

                {/* Exam Section */}
                {showExam && (
                  <>
                    <div className="h-8 w-px bg-border/60 dark:bg-border/40 mx-2" role="separator" />
                    <div className="flex gap-1">
                      <TabsTrigger 
                        className="text-base px-3 py-2 flex-none" 
                        value="exam"
                      >
                        {t.tabs.exam}
                      </TabsTrigger>
                      <TabsTrigger 
                        className="text-base px-3 py-2 flex-none" 
                        value="exam-solutions"
                      >
                        {t.tabs.examSolutions}
                      </TabsTrigger>
                    </div>
                  </>
                )}
              </TabsList>
            </div>

            {showCourse && (
              <TabsContent value="course" className="animate-fade-in">
                {moduleResources.filter((r) => r.type === "course").length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {moduleResources
                      .filter((r) => r.type === "course")
                      .map((res) => (
                        <ResourceCard key={res.id} res={res} moduleSlug={moduleSlug} onShow={openViewer} onTabChange={setActiveTab} />
                      ))}
                  </div>
                ) : (
                  placeholderMessage
                )}
              </TabsContent>
            )}

            {showTD && (
              <TabsContent value="td" className="animate-fade-in">
                {moduleResources.filter((r) => r.type === "td").length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {moduleResources
                      .filter((r) => r.type === "td")
                      .map((res: Resource) => (
                        <ResourceCard key={res.id} res={res} moduleSlug={moduleSlug} onShow={openViewer} onTabChange={setActiveTab} />
                      ))}
                  </div>
                ) : (
                  placeholderMessage
                )}
              </TabsContent>
            )}

            {showTP && (
              <TabsContent value="tp" className="animate-fade-in">
                {moduleResources.filter((r) => r.type === "tp").length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {moduleResources
                      .filter((r) => r.type === "tp")
                      .map((res: Resource) => (
                        <ResourceCard key={res.id} res={res} moduleSlug={moduleSlug} onShow={openViewer} onTabChange={setActiveTab} />
                      ))}
                  </div>
                ) : (
                  placeholderMessage
                )}
              </TabsContent>
            )}

            {/* TD Solutions */}
            {showTD && (
              <TabsContent value="td-solutions" className="animate-fade-in">
                {moduleResources.filter((r) => r.type === "td-solution" || r.type === "td-sols").length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {moduleResources
                      .filter((r) => r.type === "td-solution" || r.type === "td-sols")
                      .map((res: Resource) => (
                        <ResourceCard key={res.id} res={res} moduleSlug={moduleSlug} onShow={openViewer} onTabChange={setActiveTab} />
                      ))}
                  </div>
                ) : (
                  placeholderMessage
                )}
              </TabsContent>
            )}

            {/* TP Solutions */}
            {showTP && (
              <TabsContent value="tp-solutions" className="animate-fade-in">
                {moduleResources.filter((r) => r.type === "tp-solution" || r.type === "tp-sols").length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {moduleResources
                      .filter((r) => r.type === "tp-solution" || r.type === "tp-sols")
                      .map((res: Resource) => (
                        <ResourceCard key={res.id} res={res} moduleSlug={moduleSlug} onShow={openViewer} onTabChange={setActiveTab} />
                      ))}
                  </div>
                ) : (
                  placeholderMessage
                )}
              </TabsContent>
            )}

            {/* Exams */}
            {showExam && (
              <TabsContent value="exam" className="animate-fade-in">
                {(() => {
                  const exams = moduleResources.filter((r) => r.type === "exam");
                  if (exams.length === 0) return placeholderMessage;

                  // Group by year if there are 5+ exams
                  const shouldGroupByYear = exams.length >= 5;
                  
                  if (shouldGroupByYear) {
                    const groupedByYear: Record<string, Resource[]> = {};
                    const ungrouped: Resource[] = [];
                    
                    exams.forEach((exam) => {
                      if (exam.year) {
                        if (!groupedByYear[exam.year]) {
                          groupedByYear[exam.year] = [];
                        }
                        groupedByYear[exam.year].push(exam);
                      } else {
                        ungrouped.push(exam);
                      }
                    });

                    // Sort years descending (newest first)
                    // Extract numeric year for better sorting (handles "2024", "2023-2024", etc.)
                    const sortYears = (a: string, b: string): number => {
                      // Try to extract the first 4-digit number from each year string
                      const getYearNum = (yearStr: string): number | null => {
                        const match = yearStr.match(/\b(\d{4})\b/);
                        return match ? parseInt(match[1], 10) : null;
                      };
                      
                      const yearA = getYearNum(a);
                      const yearB = getYearNum(b);
                      
                      // If both have numeric years, compare numerically
                      if (yearA !== null && yearB !== null) {
                        return yearB - yearA; // Descending (newest first)
                      }
                      
                      // Fallback to string comparison
                      return b.localeCompare(a);
                    };
                    const sortedYears = Object.keys(groupedByYear).sort(sortYears);

                    return (
                      <div className="space-y-8">
                        {sortedYears.map((year) => (
                          <div key={year} className="space-y-4">
                            <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                              {year}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {groupedByYear[year].map((res: Resource) => (
                                <ResourceCard
                                  key={res.id}
                                  res={res}
                                  moduleSlug={moduleSlug}
                                  onShow={openViewer}
                                  onTabChange={setActiveTab}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                        {ungrouped.length > 0 && (
                          <div className="space-y-4">
                            {sortedYears.length > 0 && (
                              <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                                {t.modulePage.other}
                              </h3>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {ungrouped.map((res: Resource) => (
                                <ResourceCard
                                  key={res.id}
                                  res={res}
                                  moduleSlug={moduleSlug}
                                  onShow={openViewer}
                                  onTabChange={setActiveTab}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Simple grid if fewer than 5 exams
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {exams.map((res: Resource) => (
                        <ResourceCard
                          key={res.id}
                          res={res}
                          moduleSlug={moduleSlug}
                          onShow={openViewer}
                          onTabChange={setActiveTab}
                        />
                      ))}
                    </div>
                  );
                })()}
              </TabsContent>
            )}

            {/* Exam Solutions */}
            {showExam && (
              <TabsContent value="exam-solutions" className="animate-fade-in">
                {(() => {
                  const examSolutions = moduleResources.filter(
                    (r) => r.type === "exam-solution" || r.type === "exam-sols"
                  );
                  if (examSolutions.length === 0) return placeholderMessage;

                  // Group by year if there are 5+ solutions
                  const shouldGroupByYear = examSolutions.length >= 5;
                  
                  if (shouldGroupByYear) {
                    const groupedByYear: Record<string, Resource[]> = {};
                    const ungrouped: Resource[] = [];
                    
                    examSolutions.forEach((solution) => {
                      if (solution.year) {
                        if (!groupedByYear[solution.year]) {
                          groupedByYear[solution.year] = [];
                        }
                        groupedByYear[solution.year].push(solution);
                      } else {
                        ungrouped.push(solution);
                      }
                    });

                    // Sort years descending (newest first)
                    // Extract numeric year for better sorting (handles "2024", "2023-2024", etc.)
                    const sortYears = (a: string, b: string): number => {
                      // Try to extract the first 4-digit number from each year string
                      const getYearNum = (yearStr: string): number | null => {
                        const match = yearStr.match(/\b(\d{4})\b/);
                        return match ? parseInt(match[1], 10) : null;
                      };
                      
                      const yearA = getYearNum(a);
                      const yearB = getYearNum(b);
                      
                      // If both have numeric years, compare numerically
                      if (yearA !== null && yearB !== null) {
                        return yearB - yearA; // Descending (newest first)
                      }
                      
                      // Fallback to string comparison
                      return b.localeCompare(a);
                    };
                    const sortedYears = Object.keys(groupedByYear).sort(sortYears);

                    return (
                      <div className="space-y-8">
                        {sortedYears.map((year) => (
                          <div key={year} className="space-y-4">
                            <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                              {year}
                            </h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {groupedByYear[year].map((res: Resource) => (
                                <ResourceCard
                                  key={res.id}
                                  res={res}
                                  moduleSlug={moduleSlug}
                                  onShow={openViewer}
                                  onTabChange={setActiveTab}
                                />
                              ))}
                            </div>
                          </div>
                        ))}
                        {ungrouped.length > 0 && (
                          <div className="space-y-4">
                            {sortedYears.length > 0 && (
                              <h3 className="text-xl font-semibold text-foreground border-b pb-2">
                                {t.modulePage.other}
                              </h3>
                            )}
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                              {ungrouped.map((res: Resource) => (
                                <ResourceCard
                                  key={res.id}
                                  res={res}
                                  moduleSlug={moduleSlug}
                                  onShow={openViewer}
                                  onTabChange={setActiveTab}
                                />
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  }

                  // Simple grid if fewer than 5 solutions
                  return (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                      {examSolutions.map((res: Resource) => (
                        <ResourceCard
                          key={res.id}
                          res={res}
                          moduleSlug={moduleSlug}
                          onShow={openViewer}
                          onTabChange={setActiveTab}
                        />
                      ))}
                    </div>
                  );
                })()}
              </TabsContent>
            )}
          </Tabs>

          {/* Extra resources section: YT videos, Books, Resumes */}
          {(showYt || showBooks || showResumes) && (
            <div className="mt-12">
              <Tabs value={extraTab} onValueChange={setExtraTab} className="w-full">
                <div className="relative w-full max-w-3xl mx-auto mb-6 flex justify-center overflow-hidden">
                  <TabsList 
                    className="inline-flex flex-row gap-2 p-2 items-center bg-muted/30 rounded-lg backdrop-blur-sm"
                  >
                    {/* YT group */}
                    <div className="flex gap-1">
                      {showYt && (
                        <TabsTrigger 
                          className="text-base px-3 py-2 flex-none" 
                          value="yt"
                        >
                          {t.modulePage.ytVideos}
                        </TabsTrigger>
                      )}
                    </div>

                    {/* Books group */}
                    {showBooks && (
                      <>
                        <div className="h-8 w-px bg-border/60 dark:bg-border/40 mx-2" role="separator" />
                        <div className="flex gap-1">
                          <TabsTrigger 
                            className="text-base px-3 py-2 flex-none" 
                            value="books"
                          >
                            {t.modulePage.books}
                          </TabsTrigger>
                        </div>
                      </>
                    )}

                    {/* Resumes group */}
                    {showResumes && (
                      <>
                        <div className="h-8 w-px bg-border/60 dark:bg-border/40 mx-2" role="separator" />
                        <div className="flex gap-1">
                          <TabsTrigger 
                            className="text-base px-3 py-2 flex-none" 
                            value="resumes"
                          >
                            {t.modulePage.resumes}
                          </TabsTrigger>
                        </div>
                      </>
                    )}
                  </TabsList>
                </div>

                {showYt && (
                  <TabsContent value="yt" className="animate-fade-in">
                    {moduleResources.filter((r) => r.type === "yt-video").length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {moduleResources
                          .filter((r) => r.type === "yt-video")
                          .map((res: Resource) => (
                            <YtVideoCard key={res.id} res={res} />
                          ))}
                      </div>
                    ) : (
                      placeholderMessage
                    )}
                  </TabsContent>
                )}

                {showBooks && (
                  <TabsContent value="books" className="animate-fade-in">
                    {moduleResources.filter((r) => r.type === "book").length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {moduleResources
                          .filter((r) => r.type === "book")
                          .map((res: Resource) => (
                            <BookCard key={res.id} res={res} />
                          ))}
                      </div>
                    ) : (
                      placeholderMessage
                    )}
                  </TabsContent>
                )}

                {showResumes && (
                  <TabsContent value="resumes" className="animate-fade-in">
                    {moduleResources.filter((r) => r.type === "resume").length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {moduleResources
                          .filter((r) => r.type === "resume")
                          .map((res: Resource) => (
                            <ResumeCard
                              key={res.id}
                              res={res}
                              moduleSlug={moduleSlug}
                              onShow={openViewer}
                            />
                          ))}
                      </div>
                    ) : (
                      placeholderMessage
                    )}
                  </TabsContent>
                )}
              </Tabs>
            </div>
          )}
        </div>
      </main>

      {viewerOpts && (
        <PdfViewer
          moduleSlug={viewerOpts.moduleSlug || undefined}
          resourceId={viewerOpts.resourceId}
          pdfUrl={viewerOpts.pdfUrl}
          filename={viewerOpts.filename}
          initialOpen={true}
          onClose={() => setViewerOpts(null)}
        />
      )}

      <Footer />
    </div>
  );
};

export default ModulePage;
