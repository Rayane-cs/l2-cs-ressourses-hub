import React from "react";
import type { Resource } from "@/lib/types";
import { Youtube, Play } from "lucide-react";

interface Props {
  res: Resource;
}

function getYoutubeThumbId(url?: string) {
  if (!url) return null;
  try {
    const u = new URL(url);
    const hostname = u.hostname.replace("www.", "");

    if (hostname === "youtu.be") {
      const id = u.pathname.slice(1);
      return id || null;
    }

    const v = u.searchParams.get("v");
    if (v) return v;

    const parts = u.pathname.split("/");
    const last = parts[parts.length - 1];
    return last || null;
  } catch {
    return null;
  }
}

const YtVideoCard: React.FC<Props> = ({ res }) => {
  const href = res.url || res.driveUrl || res.file || "";
  const thumbUrl = res.firstVdoUrl || href;
  const thumbId = getYoutubeThumbId(thumbUrl);
  const thumb = thumbId
    ? `https://img.youtube.com/vi/${thumbId}/mqdefault.jpg` // mqdefault is slightly better quality than hq for some thumbnails
    : res.thumbnailUrl;

  const handleClick = () => {
    if (!href) return;
    window.open(href, "_blank", "noopener,noreferrer");
  };

  return (
    <div
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-border/50 bg-background/40 shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-500"
      onClick={handleClick}
    >
      <div className="aspect-video w-full bg-slate-900 overflow-hidden relative">
        {thumb ? (
          <img
            src={thumb}
            alt={res.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-muted-foreground/30">
            <Youtube size={32} />
          </div>
        )}
        
        {/* Play Icon Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-[1px]">
          <div className="w-11 h-11 bg-red-600 rounded-full flex items-center justify-center text-white shadow-xl shadow-red-600/40 transform translate-y-2 group-hover:translate-y-0 group-hover:scale-110 transition-all duration-300">
            <Play className="w-5 h-5 fill-white text-white translate-x-0.5" />
          </div>
        </div>

        {/* Duration badge if we had it, but we don't. So just title overlay */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-3 pt-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-[10px] font-bold text-white uppercase tracking-wider line-clamp-1 opacity-80 mb-0.5">
            Watch Tutorial
          </p>
          <h4 className="text-xs font-bold text-white line-clamp-1">
            {res.title}
          </h4>
        </div>
      </div>
    </div>
  );
};

export default YtVideoCard;


