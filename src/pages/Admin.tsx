import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import resourceStore, { type Resource } from "@/lib/resourceStore";
import { useToast } from "@/hooks/use-toast";

const semesters = ["S3", "S4"];
const types = ["course", "TD", "TP"];

const Admin = () => {
  const [moduleSlug, setModuleSlug] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [semester, setSemester] = React.useState(semesters[0]);
  const [type, setType] = React.useState(types[0]);
  const [driveUrl, setDriveUrl] = React.useState("");
  const [uploadedBy, setUploadedBy] = React.useState("");
  const [persistToFile, setPersistToFile] = React.useState(false);
  const toast = useToast();

  const modules = resourceStore.getModules();

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!moduleSlug || !title || !driveUrl) {
      toast.toast({ title: "Missing fields", description: "Please provide module, title and link." });
      return;
    }

    const resource: Resource = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
      title,
      type,
      driveUrl,
      uploadedBy: uploadedBy || "unknown",
      semester,
    };

    resourceStore.addResource(moduleSlug, resource);

    toast.toast({ title: "Resource added", description: `${title} has been saved locally.` });

    if (persistToFile) {
      // attempt to persist to local repo file via dev API
      fetch("http://localhost:4000/add-resource", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ moduleSlug, resource }),
      })
        .then((r) => r.json())
        .then((data) => {
          if (data && data.ok) {
            toast.toast({ title: "Saved to file", description: "resources.ts updated (dev server)." });
          } else {
            toast.toast({ title: "Failed to save to file", description: data?.message || "Unknown error" });
          }
        })
        .catch((err) => {
          console.error(err);
          toast.toast({ title: "Error contacting local API", description: "Start the API server with `npm run start:api` to enable saving to resources.ts" });
        });
    }

    // clear some fields but keep module for convenience
    setTitle("");
    setDriveUrl("");
    setUploadedBy("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-2xl font-semibold mb-3">Admin upload</h1>
          <p className="text-sm text-muted-foreground mb-6">You can access this page directly at <code>/admin/upload</code>. This page is not protected — keep the link private if you want it to be restricted.</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <div className="text-sm font-medium mb-1">Module slug</div>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. algo or comp-networks"
                  value={moduleSlug}
                  onChange={(e) => setModuleSlug(e.target.value)}
                />
                <div className="w-48">
                  <Select value={moduleSlug} onValueChange={(v) => setModuleSlug(v)}>
                    <SelectTrigger>
                      <SelectValue>{moduleSlug || "Choose module"}</SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {modules.map((m) => (
                        <SelectItem key={m} value={m}>{m}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </label>

            <label className="block">
              <div className="text-sm font-medium mb-1">Title</div>
              <Input placeholder="Enter the file title" value={title} onChange={(e) => setTitle(e.target.value)} />
            </label>

            <div className="grid grid-cols-2 gap-4">
              <label>
                <div className="text-sm font-medium mb-1">Semester</div>
                <Select value={semester} onValueChange={(v) => setSemester(v)}>
                  <SelectTrigger>
                    <SelectValue>{semester}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {semesters.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>

              <label>
                <div className="text-sm font-medium mb-1">Type</div>
                <Select value={type} onValueChange={(v) => setType(v)}>
                  <SelectTrigger>
                    <SelectValue>{type}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {types.map((t) => (
                      <SelectItem key={t} value={t}>{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </label>
            </div>

            <label className="block">
              <div className="text-sm font-medium mb-1">Drive / external link</div>
              <Input placeholder="https://drive.google.com/..., or any URL" value={driveUrl} onChange={(e) => setDriveUrl(e.target.value)} />
            </label>

            <label className="block">
              <div className="text-sm font-medium mb-1">Uploaded by</div>
              <Input placeholder="e.g. admin@uhbc.edu" value={uploadedBy} onChange={(e) => setUploadedBy(e.target.value)} />
            </label>

            <label className="block">
              <div className="text-sm font-medium mb-1">Notes (optional)</div>
              <Textarea placeholder="Any notes or description" />
            </label>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={persistToFile} onChange={(e) => setPersistToFile(e.target.checked)} />
              <span className="text-sm">Save to <code>src/lib/resources.ts</code> (requires running <code>npm run start:api</code>)</span>
            </label>

            <div className="flex items-center gap-3">
              <Button type="submit">Save resource</Button>
              <div className="text-sm text-muted-foreground">After saving, the resource is stored in your browser (localStorage). To make it persistent for other users, integrate a backend or an external datastore.</div>
            </div>
          </form>

          <section className="mt-8">
            <h2 className="font-medium mb-2">Preview / placeholders</h2>
            <div className="max-h-40 overflow-y-auto rounded border p-3 bg-background">
              <p className="text-sm text-muted-foreground">When you save, the new entry will appear in the project data (localStorage). You can view resources on their module pages if the app is wired to read localStorage via `resourceStore.getResources()`.</p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Admin;
