import { useParams } from "react-router-dom";
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Download, Calendar, User } from "lucide-react";
import resources from "@/lib/resources";

// Merge static resources with any admin-provided entries saved in localStorage under
// `drive_resources`. Local entries take precedence (are appended) so admins can add
// links without a backend. Admin UI writes to that key via AdminDriveManager.
function readLocalResources() {
  try {
    const raw = localStorage.getItem("drive_resources");
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, Array<{ id: string; title: string; type: string; driveUrl: string }>>;
  } catch (e) {
    console.error("Failed to read local drive_resources", e);
    return {};
  }
}

function getCombinedResources() {
  const local = readLocalResources();
  const combined: Record<string, Array<{ id: string; title: string; type: string; driveUrl: string }>> = { ...resources } as any;
  Object.keys(local).forEach((k) => {
    combined[k] = (combined[k] || []).concat(local[k]);
  });
  return combined;
}

const ModulePage = () => {
  const { moduleSlug } = useParams();
  const [activeTab, setActiveTab] = useState("all");

  const moduleNames: Record<string, string> = {
    algo: "Algorithms",
    "archi-ord": "Computer Architecture",
    thg: "Graph Theory",
    english: "English",
    si: "Information Systems",
    "method-num": "Numerical Methods",
    logique: "Logic",
  };

  const moduleName = moduleNames[moduleSlug || ""] || "Module";

  // Files are hosted on Google Drive. Admins add public share links (see src/lib/resources.ts).
  const combined = getCombinedResources();
  const moduleResources = combined[moduleSlug || ""] || [];

  const placeholderMessage = (
    <div className="text-center py-20">
      <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
      <h3 className="text-2xl font-semibold mb-2">No Resources Yet</h3>
      <p className="text-muted-foreground">
        Resources are hosted on Google Drive. If you're an admin, add a public Drive share link
        so students can access course materials.
      </p>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24 pb-10">
        <div className="container mx-auto px-4">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{moduleName}</h1>
            <p className="text-xl text-muted-foreground">
              Access all course materials, TDs, TPs, and code files
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-2xl grid-cols-4 mb-8">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
              <TabsTrigger value="td">TDs</TabsTrigger>
              <TabsTrigger value="tp">TPs</TabsTrigger>
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
                            <span className="px-2 py-1 bg-secondary/10 rounded-md">{moduleNames[moduleSlug || ""]}</span>
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
                            <a
                              href={res.driveUrl.replace("/view", "/download")}
                              target="_blank"
                              rel="noreferrer"
                              className="px-3 py-1.5 text-sm border border-input hover:bg-accent hover:text-accent-foreground rounded-md transition-colors inline-flex items-center gap-1"
                            >
                              <Download className="h-4 w-4" />
                              Download
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

            <TabsContent value="td" className="animate-fade-in">
              {moduleResources.filter((r) => r.type === "td").length > 0 ? (
                moduleResources
                  .filter((r) => r.type === "td")
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

            <TabsContent value="tp" className="animate-fade-in">
              {moduleResources.filter((r) => r.type === "tp").length > 0 ? (
                moduleResources
                  .filter((r) => r.type === "tp")
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
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ModulePage;
