import React from "react";
import type { Resource } from "@/lib/types";

interface Props {
  res: Resource;
}

function getYoutubeThumbId(url?: string) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const hostname = u.hostname.replace("www.", "");

    // Short link: youtu.be/<videoId>
    if (hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return id || null;
    }

    // Standard watch URL with ?v=<videoId>
    const v = u.searchParams.get("v");
    if (v) {
      return v;
    }

    // Fallback to last path segment
    const parts = u.pathname.split("/");
    const last = parts[parts.length - 1];
    return last || null;
  } catch {
    return null;
  }
}

const YtVideoCard: React.FC<Props> = ({ res }) => {
  const href = res.url || res.driveUrl || res.file || "";
  // Use firstVdoUrl for thumbnail extraction if available (for playlists)
  const thumbUrl = res.firstVdoUrl || href;
  const thumbId = getYoutubeThumbId(thumbUrl);
  const thumb = thumbId
    ? `https://img.youtube.com/vi/${thumbId}/hqdefault.jpg`
    : res.thumbnailUrl;

  const handleClick = () => {
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-xl border bg-background/40 shadow-sm hover:shadow-md transition-smooth"
      onClick={handleClick}
    >
      <div className="aspect-video w-full bg-black/60 overflow-hidden">
        {thumb ? (
          <img
            src={thumb}
            alt={res.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground text-sm">
            No thumbnail
          </div>
        )}
      </div>
      {/* Hover overlay with title */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end">
        <div className="p-3 text-sm font-medium text-white line-clamp-2 w-full">
          {res.title}
        </div>
      </div>
    </div>
  );
};

export default YtVideoCard;


