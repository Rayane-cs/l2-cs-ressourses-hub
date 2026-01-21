import si from "./years/L2/S3/si";
import algo from "./years/L2/S3/algo";
import thg from "./years/L2/S3/thg";
import english from "./years/L2/S3/english";
import logique from "./years/L2/S3/logique";
import methodNum from "./years/L2/S3/method-num";
import archiOrd from "./years/L2/S3/archi-ord";

import reseaux from "./years/L2/S4/reseaux";
import oop from "./years/L2/S4/oop";
import thl from "./years/L2/S4/thl";
import daw from "./years/L2/S4/daw";
import se from "./years/L2/S4/se";
import bdd from "./years/L2/S4/bdd";
import englishS4 from "./years/L2/S4/english";

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
  exo?: boolean;
};

const MODULE_TABS_OPTIONS: Record<string, ModuleTabsOptions> = {
  // L2 S3 modules
  algo: { books: false , exo: false},
  "archi-ord": { yt: false, books: false, resumes: false , exo: false},      // Algorithm has no Course no TD
  thg: { tp: false, yt: false, books: false, resumes: false, exam: false , exo: false},                    // Graph Theory has no TP
  english: { tp: false, td: false, exam: false, yt: false, books: false, resumes: false , exo: false}, // English has no TP, no Course
  logique: { tp: false, yt: false, books: false, resumes: false , exo: false},                // Logic has no TP
  "method-num": { td: false, yt: false, books: false, resumes: false , exo: false},
  si: { yt: false, books: false, resumes: false , exo: false},
  
  // L2 S4 modules
  reseaux: {yt: false, books: false, resumes: false , exo: false},
  oop: {td: false ,yt: false, books: false, resumes: false , exo: false},
  daw: { td: false, yt: false, books: false, resumes: false , exo: false},
  thl: {yt: false, books: false, resumes: false , exo: false},
  se: {yt: false, books: false, resumes: false},
  bdd: {yt: false, books: false, resumes: false , exo: false},
  englishS4: { tp: false, td: false, exam: false, yt: false, books: false, resumes: false , exo: false}, // English has no TP, no Course
};

const DEFAULT_OPTIONS: Required<ModuleTabsOptions> = {
  course: true,
  td: true,
  tp: true,
  exam: true,
  yt: true,
  books: true,
  resumes: true,
  exo: true,
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
    exo: overrides.exo ?? DEFAULT_OPTIONS.exo,
  };
}

export { MODULE_TABS_OPTIONS };


