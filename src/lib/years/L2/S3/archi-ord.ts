import { Resource } from "../../../types";
import { course, td, tp, tpSolution, exam, examSolution } from "../../../resourceFactory";

const archiOrd: Array<Resource> = [
  course(
    "ch1",
    "Chaptre 01",
    "https://drive.google.com/file/d/17cxmHT5Sd-d8gckZucAoOIA80FvbfU6D/view?usp=drive_link"
  ),
  course(
    "ch2",
    "Chaptre 02",
    "https://drive.google.com/file/d/1iFLnY-cYJ6YP6SXVaGNgFWUupwAlUUYc/view?usp=drive_link"
  ),
  course(
    "ch3",
    "Chaptre 03",
    "https://drive.google.com/file/d/1Qvq3bQAPgs2w9smGQvYXvg7DVOwu5RZn/view?usp=drive_link"
  ),
  course(
    "ch4",
    "Chaptre 04",
    "https://drive.google.com/file/d/1J--fAwsJZaxt5Tj5FGFXeb6ONwKGpPRa/view?usp=drive_link"
  ),
  course(
    "ch5",
    "Chaptre 05",
    "https://drive.google.com/file/d/14GhXyjdpmrBCTJ0VwVHcoM6HjpyTK6JD/view?usp=drive_link"
  ),
  course(
    "ch6",
    "Chaptre 06",
    "https://drive.google.com/file/d/1kyOj-bIJv97SiQ2PCrzlDwU8WRAu5FpI/view?usp=drive_link"
  ),
  course(
    "ch7",
    "Chaptre 07",
    "https://drive.google.com/file/d/1B7X3xu_mF_Dkdj0F96tFvbhe_3IBACDp/view?usp=drive_link"
  ),

  td(
    "td1",
    "Td 01",
    "https://drive.google.com/file/d/13L9NzpMkLMgqLk9hTS38zOaMVAzYVwdi/view?usp=drive_link"
  ),
  td(
    "td2",
    "Td 02",
    "https://drive.google.com/file/d/1Vlb6P51JfZejcgqPzejxr1aDE3j5Hryu/view?usp=drive_link"
  ),
  td(
    "td3",
    "Td 03",
    "https://drive.google.com/file/d/1br84p-hAuTlLq1F_PBVv5B5Gqtq56_uC/view?usp=drive_link"
  ),
  td(
    "td4",
    "Td 04",
    "https://drive.google.com/file/d/1gm9dfRfyVGEPjl3zyEXECte8rZhKawzo/view?usp=drive_link"
  ),
  td(
    "td5",
    "Td 05",
    "https://drive.google.com/file/d/1u4VEEVGNyQchDK5HK7l-hhAw5TcRE_dR/view?usp=drive_link"
  ),

  tp(
    "tp1",
    "Tp 01",
    "https://drive.google.com/file/d/1B82_NC5cAhw5W4j9SueuCwbPxtx1dp3U/view?usp=drive_link"
  ),
  tp(
    "tp2",
    "Tp 02",
    "https://drive.google.com/file/d/1DqUROSbfYKEDctAas9jZAQJ68C4Qp3jF/view?usp=drive_link"
  ),

  tpSolution(
    "tp1-solution",
    "Tp 01 Solution",
    "https://drive.google.com/file/d/1YBicbPjLQ3QIEjqTsThQagwMEEjLKLXU/view?usp=drive_link"
  ),
  tpSolution(
    "tp3-solution",
    "Calculatrice project Solution",
    "https://drive.google.com/file/d/1zpJ0E2QGp1WbThGKIIXi-IzN4VsxNaps/view?usp=drive_link"
  ),
  tpSolution(
    "tp2-solution",
    "Tp 02 Solution",
    "https://drive.google.com/file/d/1tI7_MuE1hINXk7F9OH-r6cOUSwnEyKI1/view?usp=drive_link"
  ),

  exam(
    "test-td1",
    "Test td 1 2010",
    "https://docs.google.com/document/d/1liNMF5lD5WkVEB6MgDaFKM6Endl_3wqv/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2010" }
  ),
  exam(
    "test-td2",
    "Test td 2 2010",
    "https://docs.google.com/document/d/1s187LT794SJW-PWLKVYX1BBMCsfq-aZv/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2010" }
  ),

  examSolution(
    "solution-test-1",
    "Solution test 1 2010",
    "https://docs.google.com/document/d/1aePcecOXgzGTXW81e2MLqvbxfE06Qq4L/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2010" }
  ),
  examSolution(
    "solution-test-2",
    "Solution test 2 2010",
    "https://docs.google.com/document/d/1KtdnS2TBcxqJZzK8H7AoVZzlfcGIgREC/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2010" }
  ),

  exam(
    "exam-2024",
    "EMD 2024",
    "https://docs.google.com/document/d/1_Q0lZuYLYpKQFzYIauicGHu995XqAfrF/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2024" }
  ),
  examSolution(
    "solution-exam-2024",
    "Solution exam 2024",
    "https://docs.google.com/document/d/1blFVvCU0q0Xr0FRcLUMWLXre57u-rJ2R/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2024" }
  ),

  exam(
    "exam-2023",
    "EMD 2023",
    "https://docs.google.com/document/d/1vO4uahxUo2sg9AzXI74VlTNIX6b4Nacf/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2023" }
  ),
  examSolution(
    "solution-exam-2023",
    "Solution exam 2023",
    "https://docs.google.com/document/d/1Fc4_tl9EpG1UuuViZMv6AC_7gM71Ro6H/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2023" }
  ),

  exam(
    "exam-2022",
    "EMD 2022",
    "https://docs.google.com/document/d/14zKEKYYX9lOEdhC6SJHa-nPcw4OrW3XO/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2022" }
  ),
  examSolution(
    "solution-exam-2022",
    "Solution exam 2022",
    "https://docs.google.com/document/d/1OUQpVKk05nX2zPTtO66fUsZ0AcoegoB9/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2022" }
  ),

  exam(
    "exam-2021",
    "EMD 2021",
    "https://docs.google.com/document/d/1ZBIGCtyZ94_588a4JrVCM8eU8Wj79x4C/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2021" }
  ),
  examSolution(
    "solution-exam-2021",
    "Solution exam 2021",
    "https://docs.google.com/document/d/10jPwOOrzGaFiWMG5JnSRzRpTeqYTn7m-/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    { year: "2021" }
  ),
];

export default archiOrd;
