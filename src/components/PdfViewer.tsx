import { useEffect, useRef, useMemo, useState } from "react";
import resources from "@/lib/index";
import type { Resource } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download, Eye, X } from "lucide-react";

interface PdfViewerProps {
  pdfUrl?: string;
  moduleSlug?: string;
  resourceId?: string;
  filename?: string;
  initialOpen?: boolean;
}

// Lightweight PDF viewer component using an <iframe>.
// - Click "Show PDF" to set the iframe src (lazy load)
// - Download button uses `download` when same-origin otherwise opens in new tab
export default function PdfViewer({ pdfUrl, moduleSlug, resourceId, filename, initialOpen = false }: PdfViewerProps) {
  const [open, setOpen] = useState(initialOpen);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const prevOverflowRef = useRef<string>("");

  // Helpers to support Google Drive links
  const isGoogleDriveUrl = (u: string) => /drive\.google\.com/.test(u);

  const extractDriveId = (u: string) => {
    try {
      const url = new URL(u, window.location.href);
      // patterns: /file/d/FILEID/, /open?id=FILEID, uc?export=download&id=FILEID
      const pathMatch = url.pathname.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (pathMatch) return pathMatch[1];
      const idParam = url.searchParams.get("id");
      if (idParam) return idParam;
      // fallback: check for id in path segments
      const seg = url.pathname.split("/").pop();
      if (seg && seg.length > 10) return seg;
    } catch (e) {
      // ignore
    }
    return null;
  };

  const drivePreviewUrl = (id: string) => `https://drive.google.com/file/d/${id}/preview`;
  const driveDownloadUrl = (id: string) => `https://drive.google.com/uc?export=download&id=${id}`;

  // Resolve PDF url: priority -- explicit pdfUrl prop, then lookup by moduleSlug+resourceId
  const { resolvedPreviewUrl, resolvedDownloadUrl, resolvedRawUrl } = useMemo(() => {
    let candidate = pdfUrl || "";
    if (!candidate && moduleSlug && resourceId) {
      const list = (resources as Record<string, Array<Resource>>)[moduleSlug] || [];
      const found = list.find((r) => r.id === resourceId);
      if (found) {
        candidate = found.driveUrl || found.url || found.file || "";
      }
    }

    if (!candidate) return { resolvedPreviewUrl: "", resolvedDownloadUrl: "", resolvedRawUrl: "" };

    if (isGoogleDriveUrl(candidate)) {
      const id = extractDriveId(candidate);
      if (id) return { resolvedPreviewUrl: drivePreviewUrl(id), resolvedDownloadUrl: driveDownloadUrl(id), resolvedRawUrl: candidate };
    }

    return { resolvedPreviewUrl: candidate, resolvedDownloadUrl: candidate, resolvedRawUrl: candidate };
  }, [pdfUrl, moduleSlug, resourceId]);

  // Try to download via fetch -> blob so the browser saves the file directly.
  // If fetch fails (CORS or network error), fallback to opening in a new tab.
  const handleDownload = async () => {
    // Prefer resolvedDownloadUrl (transforms Drive links to uc?export=download)
    const downloadTarget = resolvedDownloadUrl || pdfUrl;
    try {
      const resp = await fetch(downloadTarget, { method: "GET", credentials: "include" });
      if (!resp.ok) throw new Error("Network response was not ok");

      const contentType = resp.headers.get("content-type") || "";

      // Google Drive: sometimes returns an HTML confirmation page requiring a confirm token
      if (isGoogleDriveUrl(downloadTarget) && contentType.includes("text/html")) {
        const text = await resp.text();
        // Try to extract confirm token from HTML (common patterns)
        // Look for &confirm=TOKEN or confirm=TOKEN in links
          const confirmMatch = text.match(/confirm=([0-9A-Za-z_-]+)/) || text.match(/confirm\s*[:=]\s*["']?([0-9A-Za-z_-]+)["']?/);
        if (confirmMatch && confirmMatch[1]) {
          const token = confirmMatch[1];
          const separator = downloadTarget.includes("?") ? "&" : "?";
          const confirmedUrl = `${downloadTarget}${separator}confirm=${token}`;
          // Try fetching the confirmed URL (include credentials)
          const resp2 = await fetch(confirmedUrl, { method: "GET", credentials: "include" });
          if (resp2.ok) {
            const ct2 = resp2.headers.get("content-type") || "";
            if (!ct2.includes("text/html")) {
              const blob = await resp2.blob();
              const blobUrl = URL.createObjectURL(blob);
              const a = document.createElement("a");
              a.href = blobUrl;
              a.download = filename || "document.pdf";
              document.body.appendChild(a);
              a.click();
              a.remove();
              setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
              return;
            }
          }
        }
        // If we couldn't parse a token or confirmed fetch failed, fallback to opening the download URL
        window.open(downloadTarget, "_blank", "noopener,noreferrer");
        return;
      }

      // Not an HTML confirmation: proceed to blob download
      const blob = await resp.blob();
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = filename || "document.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(blobUrl), 1500);
    } catch (e) {
      // Best-effort fallback: open the direct download URL in a new tab
      window.open(downloadTarget, "_blank", "noopener,noreferrer");
    }
  };

  useEffect(() => {
    if (open && iframeRef.current) {
      // Use preview URL for Google Drive to ensure embeddable preview
      iframeRef.current.src = resolvedPreviewUrl || resolvedRawUrl || pdfUrl || "";
    }

    if (!open && iframeRef.current) {
      iframeRef.current.src = "";
    }
  }, [open, resolvedPreviewUrl, resolvedRawUrl, pdfUrl]);

  // Prevent background scrolling when modal is open. Save previous overflow and restore on close/unmount.
  useEffect(() => {
    // store original on first mount
    prevOverflowRef.current = document.body.style.overflow || "";
    return () => {
      document.body.style.overflow = prevOverflowRef.current || "";
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevOverflowRef.current || "";
    }
  }, [open]);

  return (
    <div className="pdf-viewer w-full">
      <div className="pdf-buttons flex gap-2 items-center mb-3">
        <Button
          aria-controls="pdf-modal"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex items-center gap-2"
        >
          <Eye className="h-4 w-4" />
          <span>Show PDF</span>
        </Button>

        <Button className="flex items-center gap-2" onClick={handleDownload}>
          <Download className="h-4 w-4" />
          <span>Download</span>
        </Button>
      </div>

      {/* Modal popup */}
      {open && (
        <div
          id="pdf-modal"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          <div className="absolute inset-0 bg-black/50 z-40" onClick={() => setOpen(false)} />

          <div className="relative w-full max-w-5xl bg-background rounded-md shadow-lg overflow-hidden z-50">
            <div className="flex items-center justify-between p-3 border-b">
              <div className="text-sm font-medium">{filename || "PDF Preview"}</div>
              <button
                aria-label="Close PDF"
                onClick={() => setOpen(false)}
                className="p-2 rounded hover:bg-muted"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-3 max-h-[90vh] overflow-auto">
              <iframe
                ref={iframeRef}
                title={filename || "PDF viewer"}
                className="w-full rounded-md border min-h-[60vh] md:min-h-[80vh]"
                src={resolvedPreviewUrl || resolvedRawUrl || ""}
                frameBorder={0}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
