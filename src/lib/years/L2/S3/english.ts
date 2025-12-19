import { Resource } from "../../../types";
import { course } from "../../../resourceFactory";

const english: Array<Resource> = [
  course(
    "session-1",
    "Session 01",
    "https://docs.google.com/document/d/1jVLj-gbeshjjKzSl70KT3vsH9gh_3zDB/edit?usp=sharing&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3" // Explicitly set semester to S3
  ),
  course(
    "session-2",
    "Session 02",
    "https://drive.google.com/file/d/1IhuSDgsDD2pDIPI7jbI2BwjgcvXmsqPp/view?usp=drive_link",
    "S3"
  ),
  course(
    "session-3",
    "Session 03",
    "https://drive.google.com/file/d/1E1SqVeZDMwA0BVfhwN6ca8xwAFyD7saM/view?usp=drive_link",
    "S3"
  ),
  course(
    "session-5",
    "Session 05",
    "https://drive.google.com/file/d/11qQ5RIIc-J58ZMgyr29FDDz6grMr1wmQ/view?usp=drive_link",
    "S3"
  ),
  course(
    "session-6",
    "Session 06",
    "https://drive.google.com/file/d/1HjEthXqf8dOlNZTIen4hVAdndE26wxqX/view?usp=drive_link",
    "S3"
  ),
];

export default english;
