import { Resource } from "../../../types";
import { course, exam, examSolution, resume, td, tdSolution, tp, tpSolution, ytVideo } from "../../../resourceFactory";

const reseaux: Resource[] = [
    course(
        "course-1",
        "1.Introd_RésInf",
        "https://docs.google.com/presentation/d/1vaf22vJMCLxACW49-hqnsh226H2kzn5L/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    course(
        "course-2",
        "2.Couche 1",
        "https://docs.google.com/presentation/d/1oZK7KQEuZA5bmvu4IFbu4jxaCNgh1Ko5/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    course(
        "course-3",
        "3.Couche 2",
        "https://docs.google.com/presentation/d/1ZlyWZE4rGkfYK94G2SiUzsrrVSnXOGIh/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    course(
        "course-4",
        "4.Couche 3",
        "https://docs.google.com/presentation/d/1gTs4IxaRXyTjjxawJqnttAROTqxLOdG-/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    course(
        "course-5",
        "5.Couche transport (TCP&UDP)",
        "https://docs.google.com/presentation/d/1aIGByc_2uUW0Rp2FIvAY_2rw5PPqOhZo/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    course(
        "course-6",
        "6.Couches Applicatives",
        "https://docs.google.com/presentation/d/1dJBWH-m6yDr1DWaxizTmxqJV7DZ6xDUz/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2023"
    ),
    td(
        "td-1",
        "TD 2",
        "https://docs.google.com/document/d/1m341WRrkxNj63wmIGSeirhwRL9-rKnGV/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2022-23"
    ),
    td(
        "td-2",
        "TD 3",
        "https://docs.google.com/document/d/1BnMB3OfGARPQWw6GH0y4ceMOlXz2wzMm/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2022-23"
    ),
    td(
        "td-3",
        "TD 4",
        "https://docs.google.com/document/d/1pszXzejYPcp5PgtQlSPQCfEOnSsWGIIL/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2022-23"
    ),
    tp(
        "tp-1",
        "TP 1",
        "https://drive.google.com/file/d/1bGgJbaQb3W0OTVzDZyZJ9OjEXOXR0xiQ/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tp(
        "tp-2",
        "TP 2",
        "https://drive.google.com/file/d/1O3vIuK2y32jyDN1TjHXX87Y5DXUMBici/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tp(
        "tp-3",
        "TP 3",
        "https://drive.google.com/file/d/1vDPhHxQ5hOyyBE2EPCqGPsz5S37hZeiK/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tp(
        "tp-4",
        "TP 4",
        "https://drive.google.com/file/d/1gQIj3oIsSKug5P-0ZBmRubPSfPHGc93E/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tp(
        "tp-5",
        "TP 5",
        "https://drive.google.com/file/d/1904KLct45cLrNdUtZp1_OQg2Vej1XekX/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tpSolution(
        "tp-sol-1",
        "TP 1 Solution",
        "https://drive.google.com/file/d/1xNVOMijdYaaFICXbELb4A22QbwF9kHKe/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tpSolution(
        "tp-sol-2",
        "TP 2 Solution",
        "https://drive.google.com/file/d/1eU7mhP8fhoHvwNsYWnRghWTa1M5Tgf97/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tpSolution(
        "tp-sol-3",
        "TP 3 Solution",
        "https://drive.google.com/file/d/1Wp9ESBMGaCDJF7DMQsJWCFio3fUlW2zE/view?usp=drive_link",
        "S4", "2024-25"
    ),
    tpSolution(
        "tp-sol-4",
        "TP 4 Solution",
        "https://drive.google.com/file/d/1alK1_CpxschkHcy_XLTTqRVrTZcAM2MU/view?usp=drive_link",
        "S4", "2024-25"
    ),
    exam(
        "exam-1",
        "Exam 2016",
        "https://docs.google.com/document/d/1wCn2D1fx6C03rBRwHTm-K77dT0I8rvw-/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2016"
    ),
    exam(
        "exam-4",
        "Exam 2019",
        "https://docs.google.com/document/d/1tMz33SqHylLH9_XpAnch7PRPEfSwkWuA/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2019"
    ),
    exam(
        "exam-6",
        "Exam 2020",
        "https://docs.google.com/document/d/16Gfvia-uWEEDQhRApj0YPP-R-t7t-o8X/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2020"
    ),
    exam(
        "exam-6",
        "Exam 2021",
        "https://docs.google.com/document/d/1Yhz9kJNLI4cCEH-X7NUpgM-ZxX24CRXT/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2021"
    ),
    exam(
        "exam-2",
        "Exam Rattrapage 2016",
        "https://docs.google.com/document/d/1a0dNRv_9iKjC28e6eFVK519VojaccElC/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2016"
    ),
    exam(
        "exam-2",
        "Exam Rattrapage 2017",
        "https://docs.google.com/document/d/1FGiaO1c3mihvDhHJC9OGVJhK5H71UyCU/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2017"
    ),
    exam(
        "exam-3",
        "Exam Rattrapage 2018",
        "https://docs.google.com/document/d/1UDynoFHcSaaIxKh7X8CrBjbluHXtancc/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2018"
    ),
    exam(
        "exam-5",
        "Exam Rattrapage 2019",
        "https://drive.google.com/file/d/1RLaN6uZetHrjVtstM1GpoCKDmXKd0vAU/view?usp=drive_link",
        "S4", "2019"
    ),
    exam(
        "exam-7",
        "Exam Rattrapage 2021",
        "https://docs.google.com/document/d/19UzeptTnUZeI6Ey4-VAMTI4NoDUpzIYL/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2021"
    ),
    examSolution(
        "exam-sol-1",
        "Exam 2016 Solution",
        "https://docs.google.com/document/d/1LX2bclMT-on2O8g6VmkJsAGaQktaqJmD/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2016"
    ),
    examSolution(
        "exam-sol-2",
        "Exam 2017 Solution",
        "https://docs.google.com/document/d/1eH4PusvmP3XNw-rXX1Q2ZI4q7h9nvdbK/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2017"
    ),
    examSolution(
        "exam-sol-3",
        "Exam 2018 Solution",
        "https://docs.google.com/document/d/158wCHjydWuQyu5h1rysTYL7fn8HBH_QO/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2018"
    ),
    examSolution(
        "exam-sol-4",
        "Exam 2019 Solution",
        "https://docs.google.com/document/d/1U5V344LHCIE4YVLfvQ7ki9707R9ZOFvr/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2019"
    ),
    examSolution(
        "exam-sol-6",
        "Exam 2020 Solution",
        "https://docs.google.com/document/d/14xLvEYhQJuSgcY7a9b9j1Goe3PmMa4Dk/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2020"
    ),
    examSolution(
        "exam-sol-6",
        "Exam 2021 Solution",
        "https://docs.google.com/document/d/10nVFDvjICRd_6TCOWead41KCoO1QgKS5/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2021"
    ),
    examSolution(
        "exam-sol-7",
        "Exam 2022 Solution",
        "https://drive.google.com/file/d/1Au9b7uY0EZIkbxfdZteHobmvFLApmFF8/view?usp=drive_link",
        "S4", "2022"
    ),
    examSolution(
        "exam-sol-10",
        "Exam 2025 Solution",
        "https://drive.google.com/file/d/1-NMrFTbtsgCLWoYlIp_D34Hwi58J7tPL/view?usp=drive_link",
        "S4", "2025"
    ),
    examSolution(
        "exam-sol-11",
        "Exam Rattrapage 2017 Solution",
        "https://docs.google.com/document/d/1N0c4M-sTcvmGsMdgrxiF6A-tPX5v8Nta/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2017"
    ),
    examSolution(
        "exam-sol-13",
        "Exam Rattrapage 2019 Solution",
        "https://docs.google.com/document/d/1YnuA290vx29cA5lCWShwYFwDwQqNcE6I/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2019"
    ),
    examSolution(
        "exam-sol-15",
        "Exam Rattrapage 2021 Solution",
        "https://docs.google.com/document/d/1CPTetrLDK0aJT-mpuYbnJaE3MGbXUrJA/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2021"
    ),
];

export default reseaux;
