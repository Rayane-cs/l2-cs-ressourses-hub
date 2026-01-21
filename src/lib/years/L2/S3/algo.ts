import { Resource } from "../../../types";
import { course, exam, examSolution, resume, td, tdSolution, tp, tpSolution, ytVideo } from "../../../resourceFactory";

const algo: Resource[] = [
  course(
    "algo-course",
    "Cours Mohammed Amin Tahraoui 25-26",
    "https://drive.google.com/file/d/1D8toM_ekRej1rRS4BMNMra53lT9U2_hW/view?usp=drive_link","S3","2025-26"
  ),
  td(
    "td1",
    "Toturial Sheet 01",
    "https://drive.google.com/file/d/1m4X1Hsmqx8YuIyjKGKuwKbYVkoCa1dZG/view?usp=drive_link",
    "S3", "2025-26"
  ),
  td(
    "td2",
    "Toturial Sheet 02",
    "https://drive.google.com/file/d/11boy7Fx2ZlqlDuW3CBRm2p1taNH1tHKl/view?usp=drive_link",
    "S3", "2025-26"
  ),
  td(
    "td3",
    "Toturial Sheet 03",
    "https://drive.google.com/file/d/1ktqKwSrmCNwzwt2C-txCsgU8-W34RiiA/view?usp=drive_link",
    "S3", "2025-26"
  ),
  td(
    "td4",
    "Toturial Sheet 04",
    "https://drive.google.com/file/d/15OtXoBM4jS8-Y1HX5jfkH1iH8lsU4s0A/view?usp=drive_link",
    "S3", "2025-26"
  ),

  tdSolution(
    "td1-solution",
    "Toturial Sheet 01 Solution",
    "https://drive.google.com/file/d/1RTb50dy7ZwfyesIiHNWGP7AuYCzrZyAF/view?usp=drive_link",
    "S3", "2025-26"
  ),
  tdSolution(
    "td2-solution",
    "Toturial Sheet 02 Solution",
    "https://drive.google.com/file/d/1fYFy0f5tdybv0VZwZHbDYYtSoRDCr7Ju/view?usp=drive_link",
    "S3", "2025-26"
  ),

  tp(
    "tp2",
    "Practical Sheet 02",
    "https://drive.google.com/file/d/1T0wI1oo4g6Nc5VZEMB_3oUcCuyO1hZz1/view?usp=drive_link",
    "S3", "2025-26"
  ),

  tpSolution(
    "test1-solution",
    "Test Tp 1 Solution",
    "https://drive.google.com/file/d/1KDw6XFG1Hi9HNYw2O5p11onqbU_WZ3mj/view?usp=drive_link",
    "S3", "2025-26"
  ),
  tpSolution(
    "test2-solution",
    "Test Tp 2 Solution",
    "https://drive.google.com/file/d/1NYjEgf2uiom0TxyOkp_R13OwMlo4jEqU/view?usp=drive_link",
    "S3", "2025-26"
  ),

  tpSolution(
    "homework-solution",
    "Homework Solution",
    "https://drive.google.com/drive/folders/1oNtQsnvVvUvDROsWV1bRrAAAPwPwvV3a?usp=drive_link",
    "S3", "2025-26"
  ),
  exam(
    "exam1",
    "Exam 2024", "https://drive.google.com/file/d/1ASDv9OVvs474V_hIc_zG3ZwEglVew7lQ/view?usp=drive_link",
    "S3",
    "2024"
  ),
  exam(
    "test-td",
    "Test Td 2024 (+Solution)",
    "https://drive.google.com/file/d/133TLG8XvIqg2i92D1kJ1dKea2a-IIxqP/view?usp=drive_link",
    "S3",
    "2024"
  ),
  exam(
    "rattrapage-2019",
    "Rattrapage 2019 USTHB (+Solution)",
    "https://drive.google.com/file/d/1vnEXSeE76fTwcjoZKAMMxk7Uzcdk_FYh/view?usp=drive_link",
    "S3",
    "2019"
  ),
  exam(
    "rattrapage-2017",
    "Rattrapage 2017",
    "https://docs.google.com/document/d/1U3eszeP7YSijx-bPZjAlC_qXnpKyCFE4/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    "2017"
  ),
  exam(
    "rattrapage-2016",
    "Rattrapage 2016",
    "https://docs.google.com/document/d/1I-XtavkLKen9DDqVWWBCH9U17A_qjXnc/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    "2016"
  ),
  exam(
    "rattrapage-2014",
    "Rattrapage 2014 (+Solution)",
    "https://drive.google.com/file/d/1L37GngGcVH3_vtsEJYK5pwEUcSUs-QOn/view?usp=drive_link",
    "S3",
    "2014"
  ),
  exam(
    "emd-2022",
    "EMD 2022 Sétif (+Solution)",
    "https://drive.google.com/file/d/1q4HgIKSphsg8UZmbEm6MlKMTHF-lVljz/view?usp=drive_link",
    "S3",
    "2022"
  ),
  exam(
    "emd-2021",
    "EMD 2021 Sétif (+Solution)",
    "https://drive.google.com/file/d/1ZflgX-6ILsDgnVhllQiDlaZFWrVewDVg/view?usp=drive_link",
    "S3",
    "2021"
  ),
  exam(
    "emd-2018",
    "EMD 2018",
    "https://docs.google.com/document/d/1uqEuLD5I3mLwINiqEyUM9gT6nS0Sex3_/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    "2018"
  ),
  exam(
    "emd-2016",
    "EMD 2016",
    "https://docs.google.com/document/d/1MiNFDVt_JJajCGs9V8Zxs27oY7YSz9AQ/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
    "S3",
    "2016"
  ),
  examSolution(
    "emd-2016",
    "EMD 2016 Solution",
    "https://drive.google.com/file/d/1RraTZNPbKZdSNdrBk8XBG2psnZE4iaoH/view?usp=drive_link",
    "S3",
    "2016"
  ),
  exam(
    "emd-2014",
    "EMD 2014 (+Solution)",
    "https://drive.google.com/file/d/1bn4DFP3A1k8htnh7N9LYn57t7pqCvvz2/view?usp=drive_link",
    "S3",
    "2014"
  ),
  exam(
    "emd-2010",
    "EMD 2010 (+Solution)",
    "https://drive.google.com/file/d/1GgYyTYifeO-t2jLl39-L9MFhz49ZxALi/view?usp=drive_link",
    "S3",
    "2010"
  ),
  ytVideo(
    "yt1",
    "Complexity", "https://youtu.be/-LOcMaNuEzo?si=ZpoURat660E5bMvV"
  ),
  ytVideo(
    "yt2",
    "Search & Sort Algorithms (Playlist)",
    "https://www.youtube.com/playlist?list=PLKaNcVK2FfuXS7ZguACFzpLP2HDGs30uE",
    "https://youtu.be/U1wy9kZzOGI?si=tCN2AGhI27t5dSuF"
  ),
  ytVideo(
    "yt3",
    "Data Structures", "https://www.youtube.com/watch?v=O9v10jQkm5c"
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
  resume(
    "complixity-resume",
    "Complexity",
    "https://drive.google.com/file/d/13WQ3hf7zNgQaqwkGpPgJwjRaHYqI2IK_/view?usp=drive_link"
  ),
  resume(
    "search-algos-resume",
    "Search Algorithms",
    "https://drive.google.com/file/d/13rpm-6tmOqU6UKOqXg-cF6FnJep7_V9n/view?usp=drive_link"
  ),
  resume(
    "sort-algos-resume",
    "Sorting Algorithms",
    "https://drive.google.com/file/d/1yHXk6zH0m-ow7ApYCAmbjaZtWUxMehoI/view?usp=drive_link"
  ),
  resume(
    "linked-lists-resume",
    "Linked Lists",
    "https://drive.google.com/file/d/1ZSd5sHyXuv1JoBIHlOQGupVRHIBAl6rB/view?usp=drive_link"
  ),
  resume(
    "stack-resume",
    "Stack", "https://drive.google.com/file/d/16RS0Hgniq4tuJUstpIZz6P0YnqpPP-u8/view?usp=drive_link"
  ),
  resume(
    "queue-resume",
    "Queue", "https://drive.google.com/file/d/1Gv5wgHOKPPHFpt_XLOKgsqSRR1A9fM8C/view?usp=drive_link"
  ),
  resume(
    "trees-resume",
    "Trees", "https://drive.google.com/file/d/1WuOA7jWoyNcfz5UUCbdTwRSa0Om233Px/view?usp=drive_link"
  ),
  resume(
    "graphs-resume",
    "Graphs", "https://drive.google.com/file/d/18ZSF4z8Ipsb8zBws9J42GJpZIjEPNUnS/view?usp=drive_link"
  ),
];

export default algo;
