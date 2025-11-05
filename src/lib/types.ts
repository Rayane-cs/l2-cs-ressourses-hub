export type Resource = {
  id: string;
  title: string;
  type: string;
  driveUrl?: string;
  url?: string;
  file?: string;
  description?: string;
  uploadedBy?: string;
  semester?: string;
  problem?: string;
  solution?: string;
  explanation?: { en?: string; fr?: string };
};
