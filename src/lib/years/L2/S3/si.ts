import { Resource } from "../../../types";
import { course, exam, td, tp } from "../../../resourceFactory";

const si: Array<Resource> = [
  course(
    "course",
    "Cours (M.Hammouche)", "https://drive.google.com/file/d/1RD8kbleYG28lLcw_gJEOW8_tGBQ0Ty13/view?usp=drive_link","S3","2020-21"
  ),
  course(
    "course-2",
    "SI - Cours", "https://drive.google.com/file/d/1VhvtsB8COSeDwPEZKvbP-ko-VKpjzJRd/view?usp=drive_link","S3","2022-23"
  ),
  td(
    "td1",
    "Td 01", "https://drive.google.com/file/d/12zWO7DH9Q0Ajx5wFI70kINvxMa8knLL2/view?usp=drive_link","S3","2022-23"
  ),
  td(
    "td2",
    "Td 02", "https://drive.google.com/file/d/1VXuJrWllqP_F-oktgyei3mOa9e9pcLcR/view?usp=drive_link","S3","2022-23"
  ),
  tp(
    "tp1",
    "Tp 01", "https://drive.google.com/file/d/1ZZMpStfXGyHsvJKNJmyKylkOTDXKaif5/view?usp=drive_link","S3","2022-23"
  ),
  tp(
    "tp2",
    "Tp 02", "https://drive.google.com/file/d/18C2r7k-i6PGC3nZPsO0Nbon_w2sH_IpD/view?usp=drive_link","S3","2022-23"
  ),
  tp(
    "tp3",
    "Tp 03", "https://drive.google.com/file/d/1liOkzttWIy7Ply6Sz6QZlfx67ihqal_0/view?usp=drive_link","S3","2022-23"
  ),
  tp(
    "tp-final",
    "Tp Final", "https://drive.google.com/file/d/1n1kBnHxLfDbxi6jjgAf5LLq_-HWQ0HBx/view?usp=drive_link","S3","2022-23"
  ),
  exam(
    "test-td",
    "Test Td 1 (Corrigé)", "https://drive.google.com/file/d/1YOiz7GBcw3AJ3JT4SN3FW3F01Uehbz6k/view?usp=drive_link",
    "S3",
    "2020"
  ),
  exam(
    "test-td",
    "Test Td 2 (Corrigé)", "https://drive.google.com/file/d/1rN6if8kO-Dlo6DQgkNQ4gDsXrRZ7SBvY/view?usp=drive_link",
    "S3",
    "2020"
  ),
  exam(
    "test-td",
    "Test Td 3 (Corrigé)", "https://drive.google.com/file/d/1qJjtpMfCJ_lxFlTGg3th2PGVQUfKuss6/view?usp=drive_link",
    "S3",
    "2020"
  ),
  exam(
    "test-td",
    "Test Td 4 (Corrigé)", "https://drive.google.com/file/d/1VVMYOezsZxhdTNgbSTQAy3OXJgNFxQii/view?usp=drive_link",
    "S3",
    "2020"
  ),
];

export default si;
