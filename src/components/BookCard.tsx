import React from "react";
import { Button } from "./ui/button";
import { Download, Eye } from "lucide-react";
import type { Resource } from "@/lib/types";

interface Props {
  res: Resource;
}

const BookCard: React.FC<Props> = ({ res }) => {
  const fileHref = res.driveUrl || res.url || res.file || "";

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

  const handleView = () => {
    if (!fileHref) return;
    if (isGoogleDriveUrl(fileHref)) {
      const id = extractDriveId(fileHref);
      if (id) {
        window.open(drivePreviewUrl(id), "_blank", "noopener,noreferrer");
        return;
      }
    }
    window.open(fileHref, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    if (!fileHref) return;
    if (isGoogleDriveUrl(fileHref)) {
      const id = extractDriveId(fileHref);
      if (id) {
        window.open(driveDownloadUrl(id), "_blank", "noopener,noreferrer");
        return;
      }
    }
    window.open(fileHref, "_blank", "noopener,noreferrer");
  };

  const cover = res.thumbnailUrl || "";

  return (
    <div className="flex flex-col rounded-xl border bg-background/40 shadow-sm overflow-hidden">
      <div className="aspect-[3/4] w-full bg-muted/40 flex items-center justify-center overflow-hidden">
        {cover ? (
          <img
            src={cover}
            alt={res.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-muted-foreground text-sm px-3 text-center">
            No cover available
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col gap-2">
        <div className="text-sm font-semibold line-clamp-2">{res.title}</div>
        <div className="flex gap-2">
          <Button
            onClick={handleView}
            disabled={!fileHref}
            className="flex-1 flex items-center gap-1 px-2 py-1 text-xs"
          >
            <Eye className="w-4 h-4" />
            <span>View</span>
          </Button>
          <Button
            onClick={handleDownload}
            disabled={!fileHref}
            variant="outline"
            className="flex-1 flex items-center gap-1 px-2 py-1 text-xs"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;


