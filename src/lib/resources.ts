export type Resource = {
  id: string;
  title: string;
  type: string;
  driveUrl?: string; // Made optional
  url?: string; // Added for programming resources
  file?: string; // Added for programming resources
  thumbnailUrl?: string; // For book covers / custom thumbnails
  description?: string;
  uploadedBy?: string;
  semester?: string;
  year?: string; // For sorting exams by academic year (e.g., "2023-2024", "2024-2025")
  // For exercises
  problem?: string;
  solution?: string;
  explanation?: { en?: string; fr?: string };
};