import algo from "./years/L2/S3/algo";
import thg from "./years/L2/S3/thg";
import archiOrd from "./years/L2/S3/archi-ord";
import logique from "./years/L2/S3/logique";
import si from "./years/L2/S3/si";
import englishS3 from "./years/L2/S3/english";
import methodNum from "./years/L2/S3/method-num";

// S4 Modules
import englishS4 from "./years/L2/S4/english";
import bdd from "./years/L2/S4/bdd";
import se from "./years/L2/S4/se";
import reseaux from "./years/L2/S4/reseaux";
import daw from "./years/L2/S4/daw";
import thl from "./years/L2/S4/thl";
import oop from "./years/L2/S4/oop";

import programmingC from "./years/programming/programming-c";
import programmingassembly from "./years/programming/programming-assembly";
import programmingpy from "./years/programming/programming-python";
import type { Resource } from "./types";

const resources: Record<string, Array<Resource>> = {
  algo,
  thg,
  "archi-ord": archiOrd,
  logique,
  "method-num": methodNum,
  si,
  english: englishS3,

  // S4
  "english-s4": englishS4, // S4 English
  bdd,
  thl,
  oop,
  se,
  reseaux,
  "daw": daw,

  "programming-c": programmingC,
  "programming-python": programmingpy,
  "programming-assembly": programmingassembly,
};

export default resources;
