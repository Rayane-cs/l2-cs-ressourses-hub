import React from "react";
import type { Resource } from "@/lib/types";
import ResourceCard from "./ResourceCard";

interface Props {
  res: Resource;
  moduleSlug?: string | null;
  onShow?: (opts: { moduleSlug?: string | null; resourceId: string; pdfUrl: string; filename: string }) => void;
}

const ResumeCard: React.FC<Props> = ({ res, moduleSlug, onShow }) => {
  return <ResourceCard res={res} moduleSlug={moduleSlug} onShow={onShow} />;
};

export default ResumeCard;


