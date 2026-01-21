import { Resource } from "../../../types";
import { course } from "../../../resourceFactory";

const english: Array<Resource> = [
   course(
     "session-1",
     "Session 01",
     "https://drive.google.com/file/d/...",
     "S4" // Explicitly set semester to S4
   ),
];

export default english;
