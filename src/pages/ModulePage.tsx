import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, User } from "lucide-react";
import resources from "@/lib/resources";
import { useLanguage } from "@/contexts/LanguageContext";

// Merge static resources with any admin-provided entries saved in localStorage under
// `drive_resources`. Local entries take precedence (are appended) so admins can add
// links without a backend. Admin UI writes to that key via AdminDriveManager.
interface Resource {
  id: string;
  title: string;
  type: string;
  driveUrl: string;
  semester?: string;
  serie?: number | string;
  series?: number | string;
  [key: string]: unknown;
}

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
  
  // Define which modules don't have TPs or TDs
  const noTPModules = ["thg", "english", "logique"];
  const noTDModules = ["method-num"];
  
  const showTP = !noTPModules.includes(moduleSlug || "");
  const showTD = !noTDModules.includes(moduleSlug || "");

  const { t } = useLanguage();
  const moduleName = t.moduleNames[moduleSlug || ""] || t.module || "Module";

  const combined = getCombinedResources();
  const moduleResources = combined[moduleSlug || ""] || [];

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
            <TabsList className="grid w-full max-w-2xl grid-cols-6 mb-8">
                <TabsTrigger value="all">{t.tabs.all}</TabsTrigger>
                <TabsTrigger value="course">{t.tabs.course}</TabsTrigger>
                {showTD && <TabsTrigger value="td">{t.tabs.td}</TabsTrigger>}
                {showTP && <TabsTrigger value="tp">{t.tabs.tp}</TabsTrigger>}
                {showTD && <TabsTrigger value="td-solutions">{t.tabs.tdSolutions}</TabsTrigger>}
                {showTP && <TabsTrigger value="tp-solutions">{t.tabs.tpSolutions}</TabsTrigger>}
              </TabsList>

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
