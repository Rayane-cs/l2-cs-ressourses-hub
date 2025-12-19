import { Resource } from "../../../types";
import { course, exam, td, tdSolution, tp, tpSolution, ytVideo } from "../../../resourceFactory";

const algo: Resource[] = [
  course(
    "algo-course",
    "Cours Mohammed Amin Tahraoui 25-26 (PDF)",
    "https://drive.google.com/file/d/1D8toM_ekRej1rRS4BMNMra53lT9U2_hW/view?usp=drive_link"
  ),

  td(
    "td1",
    "Toturial Sheet 01",
    "https://drive.google.com/file/d/1m4X1Hsmqx8YuIyjKGKuwKbYVkoCa1dZG/view?usp=drive_link"
  ),
  td(
    "td2",
    "Toturial Sheet 02",
    "https://drive.google.com/file/d/11boy7Fx2ZlqlDuW3CBRm2p1taNH1tHKl/view?usp=drive_link"
  ),
  td(
    "td3",
    "Toturial Sheet 03",
    "https://drive.google.com/file/d/1ktqKwSrmCNwzwt2C-txCsgU8-W34RiiA/view?usp=drive_link"
  ),
  td(
    "td4",
    "Toturial Sheet 04",
    "https://drive.google.com/file/d/15OtXoBM4jS8-Y1HX5jfkH1iH8lsU4s0A/view?usp=drive_link"
  ),

  tdSolution(
    "td1-solution",
    "Toturial Sheet 01 Solution",
    "https://drive.google.com/file/d/1RTb50dy7ZwfyesIiHNWGP7AuYCzrZyAF/view?usp=drive_link"
  ),
  tdSolution(
    "td2-solution",
    "Toturial Sheet 02 Solution",
    "https://drive.google.com/file/d/1fYFy0f5tdybv0VZwZHbDYYtSoRDCr7Ju/view?usp=drive_link"
  ),

  tp(
    "tp2",
    "Practical Sheet 02",
    "https://drive.google.com/file/d/1T0wI1oo4g6Nc5VZEMB_3oUcCuyO1hZz1/view?usp=drive_link"
  ),

  tpSolution(
    "test1-solution",
    "Test Tp 1 Solution",
    "https://drive.google.com/file/d/1KDw6XFG1Hi9HNYw2O5p11onqbU_WZ3mj/view?usp=drive_link"
  ),
  tpSolution(
    "test2-solution",
    "Test Tp 2 Solution",
    "https://drive.google.com/file/d/1NYjEgf2uiom0TxyOkp_R13OwMlo4jEqU/view?usp=drive_link"
  ),

  tpSolution(
    "homework-solution",
    "Homework Solution",
    "https://drive.google.com/drive/folders/1oNtQsnvVvUvDROsWV1bRrAAAPwPwvV3a?usp=drive_link"
  ),
  exam(
    "exam1",
    "Exam 2024","https://drive.google.com/file/d/1ASDv9OVvs474V_hIc_zG3ZwEglVew7lQ/view?usp=drive_link",
    "2024"
  ),
  ytVideo(
    "yt1",
    "Complexity","https://youtu.be/-LOcMaNuEzo?si=ZpoURat660E5bMvV"
  ),
  ytVideo(
    "yt2",
    "Search & Sort Algorithms (Playlist)",
    "https://www.youtube.com/playlist?list=PLKaNcVK2FfuXS7ZguACFzpLP2HDGs30uE",
    "https://youtu.be/U1wy9kZzOGI?si=tCN2AGhI27t5dSuF"
  ),
  ytVideo(
    "yt3",
    "Data Structures","https://www.youtube.com/watch?v=O9v10jQkm5c"
  ),
  ytVideo(
    "yt4",
    "Single Linked List (Playlist)",
    "https://www.youtube.com/playlist?list=PLKaNcVK2FfuWGvIApFRW6zoxfMr9ghk1p",
    "https://youtu.be/ps_5YNZMagE?si=T8BXIr__-GcDWBMG"
  ),
  ytVideo(
    "yt5",
    "Circular Linked List (Playlist)",
    "https://www.youtube.com/playlist?list=PLKaNcVK2FfuWCaiyY_pX5RxPaLDbIOA4g",
    "https://youtu.be/-ACMP8cn-_M?si=lDTI3uA58W-9mH6W"
  ),
  ytVideo(
    "yt6",
    "Stack",
    "https://youtu.be/rYMuP7e-8CM?si=mCYAGsRJMcdb34L6"
  ),
];

export default algo;
