// src/lib/index.ts
import algo from "./modules/algo";
import thg from "./modules/thg";
import archiOrd from "./modules/archi-ord";
import logique from "./modules/logique";
import methodNum from "./modules/method-num";
import si from "./modules/si";
import english from "./modules/english";
import programmingC from "./pr-langs/programming-c";
import type { Resource } from "./types";

const resources: Record<string, Array<Resource>> = {
  algo,
  thg,
  "archi-ord": archiOrd,
  logique,
  "method-num": methodNum,
  si,
  english,
  "programming-c": programmingC,
};

export default resources;
