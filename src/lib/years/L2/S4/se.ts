import { Resource } from "../../../types";
import { course, exam, examSolution, exo, resume, td, tdSolution, tp, tpSolution, ytVideo } from "../../../resourceFactory";

const se: Resource[] = [
    td(
        "td-1",
        "TD 1",
        "https://drive.google.com/file/d/1B_d1z5_a4YfXQOB_5Yk5lPiYTH1uJYRe/view?usp=drive_link",
        "S4", "2024-25"
    ),
    td(
        "td-2",
        "TD 2",
        "https://drive.google.com/file/d/11unbvRDjkMHWuF3EbIH2ayQJqp7-mTaO/view?usp=drive_link",
        "S4", "2024-25"
    ),
    td(
        "td-3",
        "TD 3",
        "https://drive.google.com/file/d/1f68oQZa82dCsAceITEJ3mfwlUneB-tmq/view?usp=drive_link",
        "S4", "2024-25"
    ),
    td(
        "td-4",
        "TD 4",
        "https://drive.google.com/file/d/12mSsF8sQGCRE06SsWC6eMutmbu0XdyVb/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tdSolution(
        "td-sol-2",
        "TD 2 Solution",
        "https://drive.google.com/file/d/1jujq2zD0_T6BQR5o_uYUgbv_a4qQGSBs/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tdSolution(
        "td-sol-4",
        "TD 4 Solution",
        "https://drive.google.com/file/d/1Dvq03ItsIOVv0gQXhWdMJ48kj87PtdRJ/view?usp=drive_link",
        "S4", "2024-25"
    ),
    exam(
        "exam-1",
        "Exam 2019-20",
        "https://drive.google.com/file/d/1MX-NWmGzGpZ9Gl1aKy162CXHdyepk3Yg/view?usp=drive_link",
        "S4", "2019-20"
    ),
    exam(
        "exam-2",
        "Exam Rattrapage 2019-20",
        "https://drive.google.com/file/d/1MtHyzKA4xs6s93a4ooYLc-3H-5nydTOS/view?usp=drive_link",
        "S4", "2019-20"
    ),
    exam(
        "exam-1",
        "Exam Rattrapage 2020-21",
        "https://drive.google.com/file/d/1-VR1hEq3erf8d1NvsbROlQ3B28GpaMwf/view?usp=drive_link",
        "S4", "2020-21"
    ),
    exam(
        "exam-2",
        "Exam 2022",
        "https://drive.google.com/file/d/11p4HWLbe6luGnK6DMy7iS6op8Pv3M9jP/view?usp=drive_link",
        "S4", "2022"
    ),
    examSolution(
        "exam-sol-2",
        "Exam 2015-16 Solution",
        "https://drive.google.com/file/d/1r3htREF7MpCsZ11mzy6aNzWuQiQzHZtQ/view?usp=drive_link",
        "S4", "2015-16"
    ),
    examSolution(
        "exam-sol-1",
        "Exam 2019-20 Solution",
        "https://drive.google.com/file/d/1VhlGHczT9Ri23iP2ww3tEaTnB5yFQiMP/view?usp=drive_link",
        "S4", "2019-20"
    ),
    examSolution(
        "exam-sol-2",
        "Exam Rattrapage 2020-21 Solution",
        "https://drive.google.com/file/d/14tpXS8Hw-uI0c9KZp-yznXb2q0Jqi7vB/view?usp=drive_link",
        "S4", "2020-21"
    ),
    exo(
        "exo-1",
        "Exercise + Solution",
        "https://drive.google.com/file/d/1e6MJwxqN34nL0zGX-Z5isyAkV03jOzN5/view?usp=drive_link",
        "S4"
    ),
    exam(
        "exam",
        "Exam 2024-25",
        "https://drive.google.com/file/d/1L25vZRyy2NZ9ncNbsOGiMQDaRusueVTw/view?usp=drive_open",
        "S4", "2024-2025"
    ),
    course(
        "c-1",
        "Chapitre 01",
        "https://drive.google.com/file/d/1qiN61DeyRMUtzsEZv-OtET4cl68Zch72/view?usp=drive_link",
        "S4", "2025-26"
    ),
    course(
        "c-2",
        "Chapitre 02",
        "https://drive.google.com/file/d/1nNF1cP1yLO536iLx8bAO9uvTIQnRl9Lx/view?usp=drive_link",
        "S4", "2025-26"
    ),
    course(
        "c-3",
        "Chapitre 03",
        "https://drive.google.com/file/d/1omURotUq1CGaMoovl0QpiyvIJc4CHBiz/view?usp=drive_link",
        "S4", "2025-26"
    ),
];

export default se;
