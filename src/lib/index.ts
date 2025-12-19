import algo from "./years/L2/S3/algo";
import thg from "./years/L2/S3/thg";
import archiOrd from "./years/L2/S3/archi-ord";
import logique from "./years/L2/S3/logique";
import methodNum from "./years/L2/S3/method-num";
import si from "./years/L2/S3/si";
import englishS3 from "./years/L2/S3/english";
import englishS4 from "./years/L2/S4/english";
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
  english: englishS3, // S3 English (keep "english" for backward compatibility)
  "english-s4": englishS4, // S4 English (separate module)
  "programming-c": programmingC,
  "programming-python": programmingpy,
  "programming-assembly": programmingassembly,
};

export default resources;
