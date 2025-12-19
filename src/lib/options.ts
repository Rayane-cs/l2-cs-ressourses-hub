import si from "./years/L2/S3/si";

export type ModuleTabsOptions = {
  /** Academic section */
  course?: boolean;
  td?: boolean;
  tp?: boolean;
  exam?: boolean;
  /** Extra resources section */
  yt?: boolean;
  books?: boolean;
  resumes?: boolean;
};

const MODULE_TABS_OPTIONS: Record<string, ModuleTabsOptions> = {
  // L2 S3 modules
  algo: { books: false,resumes: false}, 
  "archi-ord": {yt: false,books: false,resumes: false},      // Algorithm has no Course no TD
  thg: { tp: false , yt: false, books: false, resumes: false, exam: false},                    // Graph Theory has no TP
  english: { tp: false, td: false, exam: false, yt: false, books: false, resumes: false }, // English has no TP, no Course
  logique: { tp: false ,yt: false, books: false, resumes: false},                // Logic has no TP
  "method-num": { td: false, yt: false, books: false, resumes: false}, 
  si: { yt: false, books: false, resumes: false },
};

const DEFAULT_OPTIONS: Required<ModuleTabsOptions> = {
  course: true,
  td: true,
  tp: true,
  exam: true,
  yt: true,
  books: true,
  resumes: true,
};

export function getModuleTabsOptions(moduleSlug?: string | null): Required<ModuleTabsOptions> {
  if (!moduleSlug) return DEFAULT_OPTIONS;
  const overrides = MODULE_TABS_OPTIONS[moduleSlug] || {};
  return {
    course: overrides.course ?? DEFAULT_OPTIONS.course,
    td: overrides.td ?? DEFAULT_OPTIONS.td,
    tp: overrides.tp ?? DEFAULT_OPTIONS.tp,
    exam: overrides.exam ?? DEFAULT_OPTIONS.exam,
    yt: overrides.yt ?? DEFAULT_OPTIONS.yt,
    books: overrides.books ?? DEFAULT_OPTIONS.books,
    resumes: overrides.resumes ?? DEFAULT_OPTIONS.resumes,
  };
}

export { MODULE_TABS_OPTIONS };


