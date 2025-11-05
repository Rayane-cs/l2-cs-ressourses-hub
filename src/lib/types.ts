export type Resource = {
  id: string;
  title: string;
  type: string;
  driveUrl?: string; // Made optional
  url?: string; // Added for programming resources
  file?: string; // Added for programming resources
  description?: string;
  uploadedBy?: string;
  semester?: string;
  // For exercises
  problem?: string;
  solution?: string;
  explanation?: { en?: string; fr?: string };
};
