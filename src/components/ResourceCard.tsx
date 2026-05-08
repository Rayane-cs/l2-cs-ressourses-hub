import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FileText, Download, Eye, ExternalLink } from "lucide-react";
import type { Resource } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { GuestDownloadDialog } from "./GuestDownloadDialog";

interface Props {
  res: Resource;
  moduleSlug?: string | null;
  onShow?: (opts: { moduleSlug?: string | null; resourceId?: string; pdfUrl?: string; filename?: string }) => void;
  onTabChange?: (tab: string) => void;
}

const ResourceCardComponent = React.memo(function ResourceCard({ res, moduleSlug, onShow, onTabChange }: Props) {
  const fileHref = res.driveUrl || res.url || res.file || "";
  const { isGuest } = useAuth();
  const [showGuestDialog, setShowGuestDialog] = React.useState(false);

  // Helpers for Google Drive links
  const isGoogleDriveUrl = (u: string) => /drive\.google\.com/.test(u);
  const extractDriveId = (u: string) => {
    try {
      const url = new URL(u, window.location.href);
      const pathMatch = url.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (pathMatch) return pathMatch[1];
      const idParam = url.searchParams.get("id");
      if (idParam) return idParam;
      const seg = url.pathname.split("/").pop();
      if (seg && seg.length > 10) return seg;
    } catch (e) {
      // ignore
    }
    return null;
  };
  const drivePreviewUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
  const driveDownloadUrl = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

  const openPreview = () => {
    if (!fileHref) return;
    if (isGoogleDriveUrl(fileHref)) {
      const id = extractDriveId(fileHref);
      if (id) return drivePreviewUrl(id);
    }
    return fileHref;
  };

  const handleShow = () => {
    const preview = openPreview();
    if (onShow) {
      onShow({ moduleSlug: moduleSlug || null, resourceId: res.id, pdfUrl: preview || fileHref, filename: res.title });
      return;
    }

    // fallback: open in new tab
    if (preview) {
      window.open(preview, "_blank", "noopener,noreferrer");
      return;
    }
    if (fileHref) window.open(fileHref, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    if (!fileHref) return;

    if (isGuest) {
      setShowGuestDialog(true);
      return;
    }

    if (isGoogleDriveUrl(fileHref)) {
      const id = extractDriveId(fileHref);
      if (id) window.open(driveDownloadUrl(id), "_blank", "noopener,noreferrer");
      else window.open(fileHref, "_blank", "noopener,noreferrer");
      return;
    }
    // direct link
    window.open(fileHref, "_blank", "noopener,noreferrer");
  };

  const openDrive = () => {
    if (!fileHref) return;

    if (isGuest) {
      setShowGuestDialog(true);
      return;
    }

    window.open(fileHref, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <Card className="overflow-hidden border-transparent w-full relative">
        {/* Download button - top right corner */}
        <Button
          onClick={handleDownload}
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 h-8 w-8 text-muted-foreground hover:text-primary"
        >
          <Download className="w-4 h-4" />
        </Button>

        <CardHeader className="p-4 pt-10">
          <div className="flex flex-col items-center gap-3">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <CardTitle className="text-card-foreground px-2 text-center line-clamp-2 text-sm font-semibold">
              {res.title}
            </CardTitle>

            {/* Buttons below title */}
            <div className="flex flex-wrap justify-center gap-2 mt-2">
              <Button onClick={handleShow} size="sm" className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>Show</span>
              </Button>
              <Button onClick={openDrive} size="sm" variant="secondary" className="flex items-center gap-1">
                <ExternalLink className="w-4 h-4" />
                <span>Drive</span>
              </Button>
              {res.type === "exam" && onTabChange && (
                <Button
                  onClick={() => onTabChange("exam-solutions")}
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <span>Solution</span>
                </Button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <GuestDownloadDialog
        open={showGuestDialog}
        onOpenChange={setShowGuestDialog}
      />
    </>
  );
});

export default ResourceCardComponent;
