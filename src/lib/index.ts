import { Resource } from "./types";

import algo from "./resources/algo";
import thg from "./resources/thg";
import archiOrd from "./resources/archi-ord";
import logique from "./resources/logique";
import methodNum from "./resources/method-num";
import si from "./resources/si";
import english from "./resources/english";
import programmingC from "./resources/programming-c";

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