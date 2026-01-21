import { Resource } from "../../../types";
import { course, exam, examSolution, resume, td, tdSolution, tp, tpSolution, ytVideo } from "../../../resourceFactory";

const thl: Resource[] = [
    course(
        "course-1",
        "Chapter 1",
        "https://drive.google.com/file/d/1Z2Ao0nNUJUtnVtiPcemWhmDttU_ozAs8/view?usp=drive_link",
        "S4", "2022-23"
    ),
    course(
        "course-2",
        "Chapter 2",
        "https://drive.google.com/file/d/11H24rnZFzEFV6XgXAmgDD2C4OO8O0ICj/view?usp=drive_link",
        "S4", "2022-23"
    ),
    course(
        "course-3",
        "Chapter 3",
        "https://drive.google.com/file/d/1O8Xj4HWNARC_arSQaO2-5bJksvFiYzZ0/view?usp=drive_link",
        "S4", "2022-23"
    ),
    course(
        "course-4",
        "Chapter 4",
        "https://drive.google.com/file/d/1flHsySDZwYJBLL8eh2RbXiDC3MQHrG3g/view?usp=drive_link",
        "S4", "2022-23"
    ),
    course(
        "course-5",
        "Chapter 5",
        "https://drive.google.com/file/d/1lcMWW7pf0uJnd1v_HuoDKtOJfY77x-Dz/view?usp=drive_link",
        "S4", "2022-23"
    ),
    course(
        "course-6",
        "Chapter 6",
        "https://drive.google.com/file/d/1nfJN_fXOyT8fR_BZXmZfADrlgV1tzG_n/view?usp=drive_link",
        "S4", "2022-23"
    ),
    course(
        "course-7",
        "Chapter 7",
        "https://drive.google.com/file/d/1yICb7NeHi7VIQI25YSrM8HZv5JMufdzB/view?usp=drive_link",
        "S4", "2022-23"
    ),
    course(
        "course-8",
        "Chapter 8",
        "https://drive.google.com/file/d/15HUkcLRILh19fcUIAZZyJuJK_srUjUXA/view?usp=drive_link",
        "S4", "2022-23"
    ),
    td(
        "td-1",
        "TD 1",
        "https://drive.google.com/file/d/1luuEMo6elQ1dqdFyaxR5ElT5poYANjEo/view?usp=drive_link",
        "S4", "2024-25"
    ),
    td(
        "td-2",
        "TD 2",
        "https://drive.google.com/file/d/1gSCT825gwbycPRlWJdoukzYhesdzdYsT/view?usp=drive_link",
        "S4", "2024-25"
    ),
    td(
        "td-3",
        "TD 3",
        "https://drive.google.com/file/d/1-CSNDwGjlMZ0uLsi5P5cp3HsXyHGtRIa/view?usp=drive_link",
        "S4", "2024-25"
    ),
    td(
        "td-4",
        "TD 4",
        "https://drive.google.com/file/d/1Kv1rgcMzYxEfGYKZ3dH3TJaipbDc6-Ud/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tdSolution(
        "td-sol-1",
        "TD 1 Solution",
        "https://drive.google.com/file/d/1Y2_vTAtTU9YwFJ_bV1XjWlhMWljXPv7b/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tdSolution(
        "td-sol-2",
        "TD 2 Solution",
        "https://drive.google.com/file/d/12VYIwK6jlu83mJ02wtd4yEstnmw2B0BQ/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tdSolution(
        "td-sol-4",
        "TD 4 Solution",
        "https://drive.google.com/file/d/1GmJBD7hnl_iTmlpEaiPpJNdM7rW0hXtH/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tp(
        "tp-3",
        "TP 3",
        "https://drive.google.com/file/d/1AlRp091ra4_V3_R3XqxTi6FVEcYtiF8W/view?usp=drive_link",
        "S4", "2020-21"
    ),
    tpSolution(
        "tp-sol-5",
        "TP 5 Solution",
        "https://drive.google.com/file/d/1arLyZsg8qODaXkxBzgvPAh-of-gXs8VT/view?usp=drive_link",
        "S4", "2020-21"
    ),
    tpSolution(
        "tp-sol-6",
        "TP 6 Solution",
        "https://drive.google.com/file/d/1J5GZBdIiwrk6lrYo76WGWogDFmknUzZv/view?usp=drive_link",
        "S4", "2020-21"
    ),
    exam(
        "exam-0",
        "Exam 2016",
        "https://docs.google.com/document/d/1YyHwYcwk-J4pFl1R_tBlht80vb2YSMEt/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2016"
    ),
    exam(
        "exam-1",
        "Exam 2017",
        "https://docs.google.com/document/d/15gXtDK-0EGRbxobkiTR1B2MKE_E-1_vO/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2017"
    ),
    exam(
        "exam-2",
        "Exam 2018",
        "https://docs.google.com/document/d/1bTKf3frAK-1P_jMqmqqHrUDIAiecv7Zr/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2018"
    ),
    exam(
        "exam-3",
        "Exam 2019",
        "https://docs.google.com/document/d/1_d5nAALOs2mSy17yXu-_1PKmVohTpril/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2019"
    ),
    exam(
        "exam-4",
        "Exam 2020",
        "https://docs.google.com/document/d/1JddSU8z_BLid9_UXn3DWU3i4iEJHLti_/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2020"
    ),
    exam(
        "exam-6",
        "Exam 2022",
        "https://docs.google.com/document/d/1gl83_w_N-T4FlRLnShIl7-eOxq4obhsf/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2022"
    ),
    exam(
        "exam-5",
        "Exam Remplacement 2022",
        "https://docs.google.com/document/d/1fYObMCQpSrE6AmVXtsgj_-GPYugll1Jn/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2022"
    ),
    exam(
        "exam-7",
        "Exam 2023",
        "https://docs.google.com/document/d/1Gjm0F6aRCxuOJG9wpaqREBS6CI81jKFd/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    exam(
        "exam-7",
        "Exam Remplacement 2023",
        "https://docs.google.com/document/d/1Oz4sCgW3h-OYlMQ8xMU8OjOmA6Ri6Lu6/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    exam(
        "exam-8",
        "Exam 2024",
        "https://docs.google.com/document/d/1OijNxJ24MrgMHvbwbkLwmkcttadL4BdB/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2024"
    ),
    exam(
        "exam-8",
        "Exam Remplacement 2024",
        "https://docs.google.com/document/d/1TZFVvF_001nVqjBxEfX5S8fCWKThI8x_/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2024"
    ),
    exam(
        "exam-1",
        "Exam Rattrapage 2016",
        "https://docs.google.com/document/d/1TXfybev_uDk5Wvh-CNX4erIXVbuCs71S/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2016"
    ),
    exam(
        "exam-2",
        "Exam Rattrapage 2017",
        "https://docs.google.com/document/d/10y53yzAyvMmvoFxmjBHghAFD6lQlYbAK/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2017"
    ),
    exam(
        "exam-2",
        "Exam Rattrapage 2018",
        "https://docs.google.com/document/d/1a9SHa5065okivAG9BGf4SbSpKowG6LO1/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2018"
    ),
    exam(
        "exam-2",
        "Exam Rattrapage 2019",
        "https://docs.google.com/document/d/1kHCu-2UrqNctoWsvyo_oB1pdkbEdU7pt/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2019"
    ),
    exam(
        "exam-2",
        "Exam Rattrapage 2020",
        "https://docs.google.com/document/d/1HzwqcyMLNAqif9P0SvQ8PY_rugLSWc3j/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2020"
    ),
    exam(
        "exam-2",
        "Exam Rattrapage 2022",
        "https://docs.google.com/document/d/13cjP_HvPgZH9zyNltw930S10ZjfZr61H/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2022"
    ),
    exam(
        "exam-2",
        "Exam Rattrapage 2023",
        "https://docs.google.com/document/d/1v9UH3Zjfv8Jh1hVW8ihHeQ7BWYAS3XrO/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    exam(
        "exam-2",
        "Exam Rattrapage 2024",
        "https://docs.google.com/document/d/1ChFKQYEd6C8o2in8PxucWfpNhhnr0zOg/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2024"
    ),
    examSolution(
        "exam-sol-2",
        "Exam Rattrapage 2024 Solution",
        "https://docs.google.com/document/d/1o9QeYUDOAeMzTifzdgY5FUGW5zNi2qDD/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2024"
    ),
    examSolution(
        "exam-sol-2",
        "Exam Rattrapage 2023 Solution",
        "https://docs.google.com/document/d/1ys_cvt4M0A_0BabH2CRoUGGV1ZgQynCW/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    examSolution(
        "exam-sol-2",
        "Exam Rattrapage 2022 Solution",
        "https://docs.google.com/document/d/1pQQImZnS0TplVzHeW6gZX-VDQKbZDOqe/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2022"
    ),
    examSolution(
        "exam-sol-2",
        "Exam Rattrapage 2020 Solution",
        "https://drive.google.com/file/d/1QBvtrKIiTlHA6p1s7FMb8e5cDkXLfKdE/view?usp=drive_link",
        "S4", "2020"
    ),
    examSolution(
        "exam-sol-2",
        "Exam 2024 Solution",
        "https://docs.google.com/document/d/1WmOhHFq9bRl4NF90imbFvUSNST_4yBGJ/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2024"
    ),
    examSolution(
        "exam-sol-2",
        "Exam 2023 Solution",
        "https://docs.google.com/document/d/1SfBI5YEcsgt62jTHTPJxF3CCqP0Y2aIY/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    examSolution(
        "exam-sol-2",
        "Exam 2022 Solution",
        "https://docs.google.com/document/d/15INFb2awruHanxjZaSHRI5xFun_D9Vzc/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2022"
    ),
    examSolution(
        "exam-sol-2",
        "Exam 2020 Solution",
        "https://docs.google.com/document/d/1sKoGIe8lmxRAEH2_MrpK3FNZo6iHu7HF/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2020"
    ),

    
];

export default thl;
