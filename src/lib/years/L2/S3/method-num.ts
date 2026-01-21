import { Resource } from "../../../types";
import { course, exam, tp, tpSolution } from "../../../resourceFactory";

const methodNum: Array<Resource> = [
  course(
    "ch0",
    "Chapter 00",
    "https://drive.google.com/file/d/1AjeM5OA_8NfAXlSBUFRKNZ7slSjXcGXn/view?usp=drive_link","S3","2025-26"
  ),
  course(
    "ch1",
    "Chapter 01",
    "https://drive.google.com/file/d/1AndmbrmED5dWivLjghDX7jDcDGFWYlWN/view?usp=drive_link","S3","2025-26"
  ),
  course(
    "ch2",
    "Chapter 02",
    "https://drive.google.com/file/d/1eLh8A4m_8tbJo6NfDEIWQCdLyj6AXJnK/view?usp=drive_link","S3","2025-26"
  ),
  course(
    "ch3",
    "Chapter 03",
    "https://drive.google.com/file/d/1JIQ4MnPt91aMZ6GOtTpNrnvzfqh1he2A/view?usp=drive_link","S3","2025-26"
  ),
  course(
    "ch3_2",
    "Chapter 03_2",
    "https://drive.google.com/file/d/1rXnTXk-ngquzwdulHPJGHnwDS7Am6HV3/view?usp=drive_link","S3","2025-26"
  ),
  course(
    "ch4",
    "Chapter 04",
    "https://drive.google.com/file/d/1RuvbD7V57aOxu3uKL_YIQKIgFAhwS7l0/view?usp=drive_link","S3","2025-26"
  ),
  course(
    "ch5",
    "Chapter 05",
    "https://drive.google.com/file/d/1zY7nwspe67xCVgOlpJYwDO2LMA3yAQPl/view?usp=drive_link","S3","2025-26"
  ),

  tp(
    "tp1",
    "Practical Sheet 01",
    "https://drive.google.com/file/d/1aNdfNOK_7-5nFgEATDBmyLOZFkKJyqa9/view?usp=drive_link","S3","2025-26"
  ),
  tp(
    "tp2",
    "Practical Sheet 02",
    "https://drive.google.com/file/d/1gk85IOihlbFluGMpJAzML1pUQFDPHDAx/view?usp=drive_link","S3","2025-26"
  ),
  tp(
    "tp3",
    "Practical Sheet 03",
    "https://drive.google.com/file/d/1fcXOQp1LGeODtIWOVoCl-j7FX3GE1SFY/view?usp=drive_link","S3","2025-26"
  ),
  tp(
    "tp4",
    "Practical Sheet 04",
    "https://drive.google.com/file/d/1nUDEMP-dDcB7WxTs7zvUjzshPh_wVq3R/view?usp=drive_link","S3","2025-26"
  ),
  tp(
    "tp5",
    "Practical Sheet 05",
    "https://drive.google.com/file/d/1jKduBXZxrICfvfgPDXNAQXT5ij_HrGYK/view?usp=drive_link","S3","2025-26"
  ),
  tp(
    "tp6",
    "Practical Sheet 06", "https://drive.google.com/file/d/1UPs9LqEI7WjiTTZYrP83Npg3y1lC5gov/view?usp=drive_link","S3","2025-26"
  ),
  tp(
    "tp7",
    "Practical Sheet 07", "https://drive.google.com/file/d/1c9F2r8-hDYDpvcjH6e9u17R17SZbi0Tr/view?usp=drive_link","S3","2025-26"
  ),
  tpSolution(
    "tp1s",
    "Practical Sheet 01 Solution",
    "https://drive.google.com/file/d/1jEcN7fBPEXpBCsRZhMb3jCrsUNczVUJX/view?usp=drive_link","S3","2025-26"
  ),
  tpSolution(
    "tp2s",
    "Practical Sheet 02 Solution",
    "https://drive.google.com/file/d/1tYEAYvYdQqRto9ze5DPGDDnSdR5Ug2eU/view?usp=drive_link","S3","2025-26"
  ),
  tpSolution(
    "tp3s",
    "Practical Sheet 03 Solution",
    "https://drive.google.com/drive/folders/154OfdAn_bgqIQZskqvhLUdhlQV0kydR2?usp=drive_link","S3","2025-26"
  ),
  tpSolution(
    "tp4s",
    "Practical Sheet 04 Solution",
    "https://drive.google.com/file/d/1D4O1WcFMICaUuNQaISoSj3ei6-Wf2gCX/view?usp=drive_link","S3","2025-26"
  ),
  exam(
    "exam1", "Exam 2020 (+Corrigé)",
    "https://drive.google.com/file/d/1oqMq3QkxmJEtAKAoM_U5WSuxn-cKlrSL/view?usp=drive_link",
    "S3",
    "2020"
  ),
  exam(
    "exam2", "Exam 2021 (+Corrigé)",
    "https://drive.google.com/file/d/1e9nXsKDQ5dLJ8QylsJdC4coBjUHFyscE/view?usp=drive_link",
    "S3",
    "2021"
  ),
];

export default methodNum;
