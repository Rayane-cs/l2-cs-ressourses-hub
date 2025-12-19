import type { Resource } from "./types";

type Extra = Omit<
  Partial<Resource>,
  "id" | "title" | "type" | "driveUrl" | "semester" | "year"
>;

const base = (
  id: string,
  title: string,
  type: Resource["type"],
  driveUrl: string,
  semester: Resource["semester"] = "S3",
  year?: Resource["year"],
  extra: Extra = {}
): Resource => ({
  id,
  title,
  type,
  driveUrl,
  semester,
  year,
  ...extra,
});

// Academic
export const course = (
  id: string,
  title: string,
  driveUrl: string,
  semester: Resource["semester"] = "S3",
  extra?: Extra
) => base(id, title, "course", driveUrl, semester, undefined, extra);

export const td = (
  id: string,
  title: string,
  driveUrl: string,
  semester: Resource["semester"] = "S3",
  year?: Resource["year"],
  extra?: Extra
) => base(id, title, "td", driveUrl, semester, year, extra);

export const tdSolution = (
  id: string,
  title: string,
  driveUrl: string,
  semester: Resource["semester"] = "S3",
  extra?: Extra
) => base(id, title, "td-solution", driveUrl, semester, undefined, extra);

export const tp = (
  id: string,
  title: string,
  driveUrl: string,
  semester: Resource["semester"] = "S3",
  year?: Resource["year"],
  extra?: Extra,
) => base(id, title, "tp", driveUrl, semester, year, extra);

export const tpSolution = (
  id: string,
  title: string,
  driveUrl: string,
  semester: Resource["semester"] = "S3",
  extra?: Extra,
) => base(id, title, "tp-solution", driveUrl, semester, undefined, extra);

export const exam = (
  id: string,
  title: string,
  driveUrl: string,
  semester: Resource["semester"] = "S3",
  year?: Resource["year"],
  extra?: Extra
) => base(id, title, "exam", driveUrl, year, semester, extra);

export const examSolution = (
  id: string,
  title: string,
  driveUrl: string,
  semester: Resource["semester"] = "S3",
  year?: Resource["year"],
  extra?: Extra
) => base(id, title, "exam-solution", driveUrl, year, semester, extra);

// Extra section
export const ytVideo = (
  id: string,
  title: string,
  url: string,
  firstVdoUrl?: string,
  extra?: Extra
) => {
  const resource = base(id, title, "yt-video", url, "S3", undefined, extra);
  // For yt-video, we need url instead of driveUrl
  return {
    ...resource,
    url: resource.driveUrl, // Move driveUrl to url
    driveUrl: undefined,
    ...(firstVdoUrl && { firstVdoUrl }),
  };
};

export const book = (
  id: string,
  title: string,
  driveUrl: string,
  semester: Resource["semester"] = "S3",
  extra?: Extra
) => base(id, title, "book", driveUrl, semester, undefined, extra);

export const resume = (
  id: string,
  title: string,
  driveUrl: string,
  semester: Resource["semester"] = "S3",
  extra?: Extra
) => base(id, title, "resume", driveUrl, semester, undefined, extra);

// Programming
export const exercise = (
  id: string,
  title: string,
  url: string,
  extra?: Extra
) => base(id, title, "exercise", url, "S3", undefined, extra);

