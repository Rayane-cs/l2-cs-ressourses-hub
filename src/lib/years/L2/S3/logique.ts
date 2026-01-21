import { Resource } from "../../../types";
import { course, exam, td } from "../../../resourceFactory";

const logique: Array<Resource> = [
  course(
    "course",
    "Logique - Cours (PDF)",
    "https://drive.google.com/file/d/1MMsrn-HZ9DNgwpkEbMwuHNgwelltqrWb/view?usp=drive_link",
    "S3","2023-2024"
  ),
  course(
    "course",
    "Cour Logique des Prédicats",
    "https://drive.google.com/file/d/12Bfrw0oRWZzRGOwRmDxo3Hhqp50SUiUG/view?usp=drive_link",
    "S3","2025-26"
  ),
  course(
    "course",
    "Cour Logique Propositionnelle",
    "https://docs.google.com/document/d/1UfGzjQWKJYgFTEGUpzUN9awHr5T_Bwsg/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3","2025-26"
  ),
  td(
    "td1",
    "Td 01",
    "https://drive.google.com/file/d/1I8Le7lCsxB41dro0zn1JT9MsJ7Z3p3U2/view?usp=drive_link",
    "S3",
    "2025-26"
  ),
  td(
    "td2",
    "Td 02",
    "https://drive.google.com/file/d/136dRDJ3037wfMg4mt9nOIjkaMWvt7P0o/view?usp=drive_link",
    "S3",
    "2025-26"
  ),
  exam(
    "exam",
    "Exams",
    "https://drive.google.com/file/d/1WsjPekh4ehGEFQ28UGc3fMPLv-IS2SAu/view?usp=drive_link",
    "S3",
    "2017-18"
  ),
];

export default logique;
