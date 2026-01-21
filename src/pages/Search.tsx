import { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search as SearchIcon, Filter, ExternalLink, FileText, Code, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import resources from "@/lib";
import type { Resource } from "@/lib/types";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSearch } from "@/hooks/useSearch";

// Map Levels to Semesters
const LEVEL_SEMESTERS: Record<string, string[]> = {
  "L1": ["S1", "S2"],
  "L2": ["S3", "S4"],
  "L3": ["S5", "S6"],
  "M1": ["S1", "S2"],
  "M2": ["S1", "S2"]
};

const Search = () => {
  const { t, lang } = useLanguage();
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";

  const [searchTerm, setSearchTerm] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState("all");
  const [moduleFilter, setModuleFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all"); // Represents Level (L1, L2...)
  const [semesterFilter, setSemesterFilter] = useState("all");
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Update search term when URL changes
  useEffect(() => {
    const query = searchParams.get("q");
    if (query !== null) {
      setSearchTerm(query);
    }
  }, [searchParams]);

  // Reset semester filter when year (level) changes
  useEffect(() => {
    setSemesterFilter("all");
  }, [yearFilter]);

  // Flatten all resources with module information
  const allResources = useMemo(() => {
    const flattened: Array<Resource & { module: string }> = [];
    Object.entries(resources).forEach(([moduleKey, moduleResources]) => {
      moduleResources.forEach(resource => {
        flattened.push({ ...resource, module: moduleKey });
      });
    });
    return flattened;
  }, []);

  // Use the custom search hook for fuzzy matching
  const { results: searchResults, suggestions: searchSuggestions } = useSearch(allResources, searchTerm);

  // Filter resources based on search results and active filters
  const filteredResources = useMemo(() => {
    // Determine the base set of resources: fuzzy results or everything if no search
    const baseResources = searchTerm ? searchResults : allResources;

    return baseResources.filter(resource => {
      // Type filter
      const matchesType = typeFilter === "all" || resource.type === typeFilter;

      // Module filter
      const matchesModule = moduleFilter === "all" || resource.module === moduleFilter;

      // Level (Year) Filter
      let matchesYear = true;
      if (yearFilter !== "all") {
        const allowedSemesters = LEVEL_SEMESTERS[yearFilter] || [];
        // Match if resource semester is in the allowed list for this level
        // (This assumes data uses simple S3, S4 strings)
        if (resource.semester) {
          matchesYear = allowedSemesters.includes(resource.semester);
        } else {
          // If resource has no semester, it might not match level unless we relax logic
          matchesYear = false;
        }
      }

      // Semester filter
      // Only check semantic semester if selected, otherwise handled by Year filter logic implicity (or ignore)
      const matchesSemester = semesterFilter === "all" || resource.semester === semesterFilter;

      return matchesType && matchesModule && matchesYear && matchesSemester;
    });
  }, [allResources, searchResults, searchTerm, typeFilter, moduleFilter, semesterFilter, yearFilter]);

  // Use hook suggestions
  const suggestions = searchSuggestions;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "course": return <BookOpen className="h-4 w-4" />;
      case "exercise": return <Code className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getModuleDisplayName = (module: string) => {
    const moduleNames: Record<string, string> = {
      "algo": "Algorithms",
      "archi-ord": "Architecture",
      "thg": "Graph Theory",
      "english": "English (S3)",
      "english-s4": "English (S4)",
      "si": "Information Systems",
      "method-num": "Numerical Methods",
      "logique": "Logic",
      "programming-c": "C Programming",
      "programming-python": "Python Programming",
      "programming-assembly": "Assembly"
    };
    return moduleNames[module] || module;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 pt-24 pb-10">
        <div className="container mx-auto px-4 relative">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t.search.title}</h1>
            <p className="text-xl text-muted-foreground">
              {t.search.subtitle}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-6">
            <div className="relative animate-fade-in" style={{ animationDelay: "0.1s" }}>
              <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                aria-label={t.search.title}
                placeholder={t.search.placeholder}
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setShowSuggestions(e.target.value.length >= 2);
                }}
                onFocus={() => searchTerm.length >= 2 && setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                className="pl-10 h-12 text-lg"
              />

              {/* Autocomplete Suggestions */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-background border border-border rounded-md shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <button
                      key={index}
                      className="w-full px-4 py-3 text-left hover:bg-muted transition-colors flex items-center gap-3"
                      onClick={() => {
                        setSearchTerm(suggestion);
                        setShowSuggestions(false);
                      }}
                    >
                      <SearchIcon className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{suggestion}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <div>
                <label className="text-sm font-medium mb-2 block">{t.search.type}</label>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.search.allTypes} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.search.allTypes}</SelectItem>
                    <SelectItem value="course">{t.tabs.course}</SelectItem>
                    <SelectItem value="td">{t.tabs.td}</SelectItem>
                    <SelectItem value="tp">{t.tabs.tp}</SelectItem>
                    <SelectItem value="tp-solution">{t.tabs.tpSolutions}</SelectItem>
                    <SelectItem value="td-solution">{t.tabs.tdSolutions}</SelectItem>
                    <SelectItem value="exercise">{lang === "en" ? "Exercise" : "Exercice"}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium mb-2 block">Level</label>
                <Select value={yearFilter} onValueChange={setYearFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Levels" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="L1">L1</SelectItem>
                    <SelectItem value="L2">L2</SelectItem>
                    <SelectItem value="L3">L3</SelectItem>
                    <SelectItem value="M1">M1</SelectItem>
                    <SelectItem value="M2">M2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {yearFilter !== "all" && (
                <div className="animate-fade-in">
                  <label className="text-sm font-medium mb-2 block">{t.search.semester}</label>
                  <Select value={semesterFilter} onValueChange={setSemesterFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder={t.search.allSemesters} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t.search.allSemesters}</SelectItem>
                      {LEVEL_SEMESTERS[yearFilter]?.map(sem => (
                        <SelectItem key={sem} value={sem}>{sem}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <label className="text-sm font-medium mb-2 block">{t.search.module}</label>
                <Select value={moduleFilter} onValueChange={setModuleFilter}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.search.allModules} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.search.allModules}</SelectItem>
                    <SelectItem value="algo">Algorithms</SelectItem>
                    <SelectItem value="archi-ord">Computer Architecture</SelectItem>
                    <SelectItem value="thg">Graph Theory</SelectItem>
                    <SelectItem value="english">English (S3)</SelectItem>
                    <SelectItem value="english-s4">English (S4)</SelectItem>
                    <SelectItem value="si">Information Systems</SelectItem>
                    <SelectItem value="method-num">Numerical Methods</SelectItem>
                    <SelectItem value="logique">Logic</SelectItem>
                    <SelectItem value="programming-c">C Programming</SelectItem>
                    <SelectItem value="programming-python">Python Programming</SelectItem>
                    <SelectItem value="programming-assembly">Assembly</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Search Results */}
            {filteredResources.length > 0 ? (
              <div className="space-y-4 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <div className="flex items-center justify-between">
                  <p className="text-muted-foreground">
                    {t.search.found} {filteredResources.length} {filteredResources.length !== 1 ? t.search.results : t.search.result}
                  </p>
                </div>

                <div className="grid gap-4">
                  {filteredResources.map((resource, index) => (
                    <Card key={`${resource.module}-${resource.id}`} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              {getTypeIcon(resource.type)}
                              <h3 className="text-lg font-semibold">{resource.title}</h3>
                              <Badge variant="secondary" className="text-xs">
                                {resource.type}
                              </Badge>
                            </div>

                            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                              <span>{getModuleDisplayName(resource.module)}</span>
                              {resource.semester && <span>• {resource.semester}</span>}
                              {resource.year && <span>• {resource.year}</span>}
                            </div>

                            {resource.description && (
                              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                {resource.description}
                              </p>
                            )}

                            {resource.problem && (
                              <div className="text-sm text-muted-foreground mb-3">
                                <strong>{t.search.problem}</strong>
                                <div className="line-clamp-2 mt-1" dangerouslySetInnerHTML={{ __html: resource.problem.substring(0, 150) + "..." }} />
                              </div>
                            )}
                          </div>

                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="ml-4"
                          >
                            <a
                              href={resource.driveUrl || resource.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <ExternalLink className="h-4 w-4" />
                              {t.search.open}
                            </a>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : searchTerm || typeFilter !== "all" || moduleFilter !== "all" || semesterFilter !== "all" || yearFilter !== "all" ? (
              <div className="text-center py-20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <Filter className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{t.search.noResults}</h3>
                <p className="text-muted-foreground">
                  {t.search.noResultsDesc}
                </p>
              </div>
            ) : (
              <div className="text-center py-20 animate-fade-in" style={{ animationDelay: "0.3s" }}>
                <SearchIcon className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{t.search.startSearching}</h3>
                <p className="text-muted-foreground">
                  {t.search.startSearchingDesc}
                </p>
              </div>
            )}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Search;
