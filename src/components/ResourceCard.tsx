import React from "react";
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
    } catch {
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

  const handleDownload = (e?: React.MouseEvent) => {
    e?.stopPropagation();
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

  const openDrive = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!fileHref) return;
    window.open(fileHref, "_blank", "noopener,noreferrer");
  };

  return (
    <>
      <div 
        className="group w-full h-48 sm:h-52 relative rounded-3xl border border-border/50 bg-card p-5 sm:p-6 flex flex-col justify-between hover:border-primary/40 hover:shadow-xl transition-all cursor-pointer select-none"
        onClick={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest('button')) return;
          handleShow();
        }}
      >
        {/* Top: File Icon, Title, and Download button */}
        <div className="flex items-start gap-4">
          {/* File Icon Badge */}
          <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <FileText className="w-6 h-6" />
          </div>

          {/* Title */}
          <div className="flex-1 min-w-0 pt-0.5">
            <h4 
              className="text-base sm:text-[17px] font-bold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors"
              title={res.title}
            >
              {res.title}
            </h4>
          </div>

          {/* Download Icon Button */}
          <button
            type="button"
            onClick={handleDownload}
            title="Download"
            aria-label="Download resource"
            className="text-muted-foreground/70 hover:text-foreground transition-colors p-1.5 -mr-1.5 -mt-1 rounded-lg hover:bg-muted/30 shrink-0"
          >
            <Download className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom: Action Buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-4">
          <Button 
            onClick={(e) => {
              e.stopPropagation();
              handleShow();
            }} 
            className="h-10 px-5 text-sm font-bold rounded-2xl bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            <Eye className="w-4 h-4" />
            <span>Show</span>
          </Button>

          <Button 
            onClick={openDrive} 
            variant="outline"
            className="h-10 px-4 text-sm font-semibold rounded-2xl bg-muted/30 hover:bg-muted/60 border-border/50 text-foreground transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Open in Drive</span>
          </Button>

          {res.type === "exam" && onTabChange && (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                onTabChange("exam-solutions");
              }}
              className="h-10 px-4 text-sm font-semibold rounded-2xl bg-primary/20 hover:bg-primary/30 text-primary border border-primary/30 transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-95"
            >
              <span>Solution</span>
            </Button>
          )}
        </div>
      </div>

      <GuestDownloadDialog 
        open={showGuestDialog} 
        onOpenChange={setShowGuestDialog} 
      />
    </>
  );
});

export default ResourceCardComponent;
