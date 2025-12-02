import { useEffect, useRef, useMemo, useState } from "react";
import resources from "@/lib/index";
import type { Resource } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Download, Eye, X, ExternalLink } from "lucide-react";
import DownloadButton from "@/components/DownloadButton";

interface PdfViewerProps {
  pdfUrl?: string;
  moduleSlug?: string;
  resourceId?: string;
  filename?: string;
  initialOpen?: boolean;
  onClose?: () => void;
}

// Lightweight PDF viewer component using an <iframe>.
// - Click "Show PDF" to set the iframe src (lazy load)
// - Download button uses `download` when same-origin otherwise opens in new tab
export default function PdfViewer({ pdfUrl, moduleSlug, resourceId, filename, initialOpen = false, onClose }: PdfViewerProps) {
  const [open, setOpen] = useState(initialOpen);
  const [iframeError, setIframeError] = useState(false);
  const [useFallbackUrl, setUseFallbackUrl] = useState(false);
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
  // Alternative URLs for Google Drive files when preview is blocked
  const driveEmbedUrl = (id: string) => `https://drive.google.com/file/d/${id}/view?usp=sharing`;
  const driveViewerUrl = (id: string) => `https://docs.google.com/viewer?url=https://drive.google.com/uc?export=download%26id=${id}&embedded=true`;
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
      if (id) {
        // Return multiple preview options to try in order
        return { 
          resolvedPreviewUrl: driveViewerUrl(id), // Try Google Docs Viewer first (works with blocked files)
          resolvedDownloadUrl: driveDownloadUrl(id), 
          resolvedRawUrl: candidate 
        };
      }
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
      setIframeError(false);
      // Use fallback Google Docs Viewer URL if primary failed
      let srcUrl = resolvedRawUrl || pdfUrl || "";
      if (isGoogleDriveUrl(srcUrl) && !useFallbackUrl) {
        // Try the Google Docs Viewer URL first (more compatible with blocked files)
        const id = extractDriveId(srcUrl);
        if (id) {
          srcUrl = driveViewerUrl(id);
        }
      }
      if (useFallbackUrl && isGoogleDriveUrl(srcUrl)) {
        // If Google Docs Viewer failed, try direct preview as fallback
        const id = extractDriveId(srcUrl);
        if (id) {
          srcUrl = drivePreviewUrl(id);
        }
      }
      if (srcUrl && iframeRef.current.src !== srcUrl) {
        iframeRef.current.src = srcUrl;
      }
    } else if (!open && iframeRef.current) {
      iframeRef.current.src = "";
      setIframeError(false);
      setUseFallbackUrl(false);
    }
  }, [open, resolvedRawUrl, pdfUrl, useFallbackUrl]);

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
      <div className="pdf-buttons flex flex-col sm:flex-row gap-2 items-stretch sm:items-center mb-3">
        <Button
          aria-controls="pdf-modal"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 w-full sm:w-auto justify-center"
        >
          <Eye className="h-4 w-4" />
          <span>Show PDF</span>
        </Button>

        {/* Desktop download button kept visible on sm and up; on mobile a prominent header download is shown instead */}
        <Button className="hidden sm:inline-flex flex items-center gap-2" onClick={handleDownload}>
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
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
        >
          <div className="absolute inset-0 bg-black/50 z-40" onClick={() => { setOpen(false); onClose?.(); }} />

          {/*
            Responsive modal:
            - On small screens the modal becomes fullscreen (`w-full h-full`) so the PDF fills the viewport.
            - On larger screens (sm and up) it uses a centered max width (`max-w-5xl`) and auto height.
            - Header is sticky on top so close button remains accessible while scrolling.
          */}
          <div className="relative w-screen h-screen sm:w-screen sm:h-screen sm:max-w-none bg-background rounded-none shadow-lg overflow-hidden z-50">
            <div className="flex items-center justify-between p-4 sm:p-3 border-b sticky top-0 bg-background z-10">
              <div className="flex items-center gap-3">
                <div className="text-base sm:text-sm font-semibold">{filename || "PDF Preview"}</div>
              </div>

              <div className="flex items-center gap-2">
                {/* download button in header (visible on all sizes) */}
                <DownloadButton
                  onClick={handleDownload}
                  tooltip="Download PDF"
                  ariaLabel="Download PDF"
                />

                <button
                  aria-label="Close PDF"
                  onClick={() => { setOpen(false); onClose?.(); }}
                  className="p-2 rounded-full hover:bg-muted"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            <div className="p-0 sm:p-0 h-[calc(100vh-60px)] sm:h-[calc(100vh-60px)] flex flex-col">
              <div className="flex-1 overflow-auto">
                {iframeError && !useFallbackUrl ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-muted p-6">
                    <div className="text-center max-w-md">
                      <div className="text-lg font-semibold text-foreground mb-2">Trying Alternative Preview...</div>
                      <p className="text-sm text-muted-foreground mb-4">
                        Your file preview is being loaded using an alternative method.
                      </p>
                      <Button onClick={() => setUseFallbackUrl(true)} className="flex items-center gap-2">
                        Try Alternative Viewer
                      </Button>
                    </div>
                  </div>
                ) : iframeError && useFallbackUrl ? (
                  <div className="w-full h-full flex flex-col items-center justify-center bg-muted p-6">
                    <div className="text-center max-w-md">
                      <div className="text-lg font-semibold text-foreground mb-2">Preview Unavailable</div>
                      <p className="text-sm text-muted-foreground mb-4">
                        This file's sharing settings don't allow preview in embedded viewers. You can download or open it directly in Google Drive.
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button onClick={handleDownload} className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          Download
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => {
                            if (resolvedRawUrl) {
                              window.open(resolvedRawUrl, "_blank", "noopener,noreferrer");
                            }
                          }}
                          className="flex items-center gap-2"
                        >
                          <ExternalLink className="h-4 w-4" />
                          Open in Drive
                        </Button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    ref={iframeRef}
                    title={filename || "PDF viewer"}
                    className="w-full h-full border-0"
                    src={resolvedPreviewUrl || resolvedRawUrl || ""}
                    frameBorder={0}
                    allow="autoplay; encrypted-media"
                    sandbox="allow-scripts allow-same-origin allow-popups"
                    onError={() => !useFallbackUrl ? setIframeError(true) : null}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
