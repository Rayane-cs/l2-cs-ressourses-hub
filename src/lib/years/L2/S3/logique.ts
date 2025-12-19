import { Resource } from "../../../types";
import { course, exam, td } from "../../../resourceFactory";

const logique: Array<Resource> = [
  course(
    "course",
    "Logique - Cours (PDF)",
    "https://drive.google.com/file/d/1Nm8HrHAEoNHU-AFGKoSxWgvrjgUy0dPW/view?usp=drive_link"
  ),
  td(
    "td1",
    "Td 01",
    "https://drive.google.com/file/d/1iC19kXULZVOTjUGSJQv8dgDpzw2GqCM-/view?usp=drive_link"
  ),
  td(
    "td2",
    "Td 02",
    "https://drive.google.com/file/d/1kNVEV5lkCBmf15BA8_9RhiVjQknW5qX-/view?usp=drive_link"
  ),
  td(
    "td-all",
    "Td (ALL)",
    "https://drive.google.com/file/d/1mBnpzCWtcEy7q3xWtmizNzimx-dM6rO4/view?usp=drive_link"
  ),
  exam(
    "exam",
    "Exams","https://drive.google.com/file/d/1WsjPekh4ehGEFQ28UGc3fMPLv-IS2SAu/view?usp=drive_link"
  ),
];

export default logique;
