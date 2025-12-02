import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { FileText, Download, Eye, ExternalLink, RotateCw } from "lucide-react";
import type { Resource } from "@/lib/types";

interface Props {
  res: Resource;
  moduleSlug?: string | null;
  onShow?: (opts: { moduleSlug?: string | null; resourceId?: string; pdfUrl?: string; filename?: string }) => void;
}

const ResourceCardComponent = React.memo(function ResourceCard({ res, moduleSlug, onShow }: Props) {
  const fileHref = res.driveUrl || res.url || res.file || "";

  const [isFlipped, setIsFlipped] = React.useState(false);
  const [isTouchDevice, setIsTouchDevice] = React.useState(false);

  React.useEffect(() => {
    // Dynamic detection for touch-capable devices.
    // Use multiple signals: ontouchstart, maxTouchPoints, and media queries for hover/pointer.
    const supportsWindow = typeof window !== 'undefined';

    const hoverQuery = supportsWindow && window.matchMedia('(hover: none)');
    const pointerQuery = supportsWindow && window.matchMedia('(pointer: coarse)');

    const compute = (_e?: MediaQueryListEvent) => {
      const hasTouch = (supportsWindow && ('ontouchstart' in window)) || (navigator.maxTouchPoints && navigator.maxTouchPoints > 0) || (hoverQuery && hoverQuery.matches) || (pointerQuery && pointerQuery.matches);
      setIsTouchDevice(Boolean(hasTouch));
    };

    compute();

    // Listen for changes to media queries so detection updates dynamically (e.g., docking/undocking)
    if (hoverQuery && typeof hoverQuery.addEventListener === 'function') {
      hoverQuery.addEventListener('change', compute);
    } else if (hoverQuery && typeof (hoverQuery as MediaQueryList & { addListener?: (fn: (e: MediaQueryListEvent) => void) => void }).addListener === 'function') {
      // Safari fallback
      (hoverQuery as MediaQueryList & { addListener?: (fn: (e: MediaQueryListEvent) => void) => void }).addListener!(compute);
    }

    if (pointerQuery && typeof pointerQuery.addEventListener === 'function') {
      pointerQuery.addEventListener('change', compute);
    } else if (pointerQuery && typeof (pointerQuery as MediaQueryList & { addListener?: (fn: (e: MediaQueryListEvent) => void) => void }).addListener === 'function') {
      // Safari fallback
      (pointerQuery as MediaQueryList & { addListener?: (fn: (e: MediaQueryListEvent) => void) => void }).addListener!(compute);
    }

    return () => {
      if (hoverQuery && typeof hoverQuery.removeEventListener === 'function') hoverQuery.removeEventListener('change', compute);
      else if (hoverQuery && typeof (hoverQuery as MediaQueryList & { removeListener?: (fn: (e: MediaQueryListEvent) => void) => void }).removeListener === 'function') {
        // Safari fallback
        (hoverQuery as MediaQueryList & { removeListener?: (fn: (e: MediaQueryListEvent) => void) => void }).removeListener!(compute);
      }
      if (pointerQuery && typeof pointerQuery.removeEventListener === 'function') pointerQuery.removeEventListener('change', compute);
      else if (pointerQuery && typeof (pointerQuery as MediaQueryList & { removeListener?: (fn: (e: MediaQueryListEvent) => void) => void }).removeListener === 'function') {
        // Safari fallback
        (pointerQuery as MediaQueryList & { removeListener?: (fn: (e: MediaQueryListEvent) => void) => void }).removeListener!(compute);
      }
    };
  }, []);

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
    window.open(fileHref, "_blank", "noopener,noreferrer");
  };

  return (
    <Card className="overflow-hidden border-transparent w-full h-40 sm:h-44 md:h-48">
      <CardHeader className="p-0 h-full">
        <div
          className="flip-card w-full h-full relative"
          // make focusable for keyboard users
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              setIsFlipped((s) => !s);
            }
          }}
          onClick={(e) => {
            // Only toggle flip on touch devices; avoid intercepting button clicks
            if (!isTouchDevice) return;
            // If the click originated on a button or inside one, don't toggle
            const target = e.target as HTMLElement;
            if (target.closest('button')) return;
            setIsFlipped((s) => !s);
          }}
        >
          {isTouchDevice && (
            <div aria-hidden className={`absolute top-3 right-3 z-30 pointer-events-none transition-opacity ${isFlipped ? 'opacity-100' : 'opacity-0'}`}>
              <div className="w-7 h-7 rounded-full bg-white/95 dark:bg-slate-800/80 flex items-center justify-center text-sky-600 dark:text-sky-300 shadow">
                <RotateCw className="w-4 h-4" />
              </div>
            </div>
          )}

        <div className={`flip-card-inner ${isFlipped ? 'is-flipped' : ''}`}>
            <div className="flip-card-front p-3 rounded-md bg-white/95 dark:bg-slate-800">
              <div className="flex flex-col items-center justify-center gap-2 h-full">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-sky-50 text-sky-900 dark:bg-slate-700/60 dark:text-sky-100">
                  <FileText className="w-5 h-5" />
                </div>
                <CardTitle className="title mt-1 text-sky-900 dark:text-sky-100 px-2 text-center line-clamp-2">{res.title}</CardTitle>
                <p className="text-xs text-muted-foreground opacity-80">{isTouchDevice ? 'Tap to flip' : 'Hover for more'}</p>
              </div>
            </div>
            <div className="flip-card-back p-3 rounded-md backdrop-blur-sm bg-white/30 dark:bg-slate-900/40 border border-white/5">
              <div className="flex flex-col items-center justify-center gap-3 h-full">
                <div className="flex gap-2 w-full justify-center">
                  <Button onClick={handleShow} className="flex items-center gap-2 px-2 py-1 text-sm bg-primary text-primary-foreground hover:bg-primary/90">
                    <Eye className="w-4 h-4" />
                    <span>Show</span>
                  </Button>
                  <Button onClick={handleDownload} variant="outline" className="flex items-center gap-2 px-2 py-1 text-sm">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </Button>
                </div>
                <div className="w-full flex justify-center">
                  <Button onClick={openDrive} className="flex items-center gap-2 px-3 py-1 text-sm bg-secondary text-foreground hover:bg-secondary/90">
                    <ExternalLink className="w-4 h-4" />
                    <span>Open in Drive</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      <style>{`
        .flip-card { background-color: transparent; perspective: 1000px; width: 100%; height: 100%; }
        .title { font-size: 0.95rem; font-weight: 700; text-align: center; margin: 0; }
        .flip-card-inner { position: relative; width: 100%; height: 100%; text-align: center; transition: transform 0.45s; transform-style: preserve-3d; }
        .flip-card:hover .flip-card-inner { transform: rotateY(180deg); }
        .flip-card-inner.is-flipped { transform: rotateY(180deg); }
        @media (prefers-reduced-motion: reduce) {
          .flip-card-inner { transition: none !important; }
          .flip-card:hover .flip-card-inner { transform: none !important; }
        }
        .flip-card-front, .flip-card-back { box-shadow: 0 6px 18px 0 rgba(2,6,23,0.06); position: absolute; display:flex; flex-direction: column; justify-content: center; width: 100%; height: 100%; min-height: 0; -webkit-backface-visibility: hidden; backface-visibility: hidden; border-radius: 0.5rem; }
        .flip-card-back { color: #fff; transform: rotateY(180deg); }
      `}</style>
    </Card>
  );
});

export default ResourceCardComponent;
