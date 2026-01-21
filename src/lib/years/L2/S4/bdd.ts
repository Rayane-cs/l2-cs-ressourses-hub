import { Resource } from "../../../types";
import { course, exam, examSolution, resume, td, tdSolution, tp, tpSolution, ytVideo } from "../../../resourceFactory";

const bdd: Resource[] = [
    course(
        "course-1",
        "Chapitre 0 -fichier",
        "https://drive.google.com/file/d/1hYJcujsbZF6Oi8uSYM1jG0geAcC8e8Zt/view?usp=drive_link",
        "S4", "2024-25"
    ),
    course(
        "course-2",
        "Chapitre 1 -intro",
        "https://drive.google.com/file/d/1dv4urLqZZKxrakrrEAxtuOI1SfUQTTYX/view?usp=drive_link",
        "S4", "2024-25"
    ),
    course(
        "course-3",
        "Chapitre 2 -EA",
        "https://drive.google.com/file/d/1R9ofE46QB_CCRWj8pJB9yEuF8gfvy5nS/view?usp=drive_link",
        "S4", "2024-25"
    ),
    course(
        "course-4",
        "Chapitre 3 -MR",
        "https://drive.google.com/file/d/1uUL2lRYF47DaXITMZ_lmmNjv_F8UvFg4/view?usp=drive_link",
        "S4", "2024-25"
    ),
    course(
        "course-5",
        "Chapitre 4 -NORM",
        "https://drive.google.com/file/d/1VdzUHGKwcgMKHqd76i0atDrbEmr5Hycb/view?usp=drive_link",
        "S4", "2024-25"
    ),
    course(
        "course-6",
        "Chapitre 5 -ALGRE",
        "https://drive.google.com/file/d/1MKjQtw-z_zsSaOiDcSA0uwHQy-rj3Bqe/view?usp=drive_link",
        "S4", "2024-25"
    ),
    course(
        "course-7",
        "Chapitre 6 -SQL",
        "https://drive.google.com/file/d/1fla5LOl0cSuR44d04kPWIcEqIekGy0MC/view?usp=drive_link",
        "S4", "2024-25"
    ),
    course(
        "course",
        "Requete SQL",
        "https://drive.google.com/file/d/1q8HSDC6qw2Oi44GPcuz07pNwewD_72zv/view?usp=drive_link",
        "S4", "2024-25"
    ),
    td(
        "td-0",
        "TD 0",
        "https://drive.google.com/file/d/1dylCoRjJMmFM_NcJFO6WVXIGShe0D2xf/view?usp=drive_link",
        "S4", "20??-??"
    ),
    td(
        "td-1",
        "TD 1",
        "https://drive.google.com/file/d/137l5f5oiSRVWlaEkslCjejxFr0FyHa39/view?usp=drive_link",
        "S4", "20??-??"
    ),
    td(
        "td-2",
        "TD 2",
        "https://drive.google.com/file/d/10W-C21jTQdSbbEokL7NGixTDRmcESJom/view?usp=drive_link",
        "S4", "20??-??"
    ),
    td(
        "td-3",
        "TD 3",
        "https://drive.google.com/file/d/1oOJqRyOTEL6my66UNBQG93rb9IZoZoNG/view?usp=drive_link",
        "S4", "20??-??"
    ),
    td(
        "td-4",
        "TD 4",
        "https://drive.google.com/file/d/1kJNhbJHWj-HYsp1US73hDj2Ka9PO5x8t/view?usp=drive_link",
        "S4", "20??-??"
    ),  
    td(
        "td-5",
        "TD 5",
        "https://drive.google.com/file/d/1tu9wtg9K0KjIaEKuzyCFyYLK81LSwmli/view?usp=drive_link",
        "S4", "20??-??"
    ),
    tdSolution(
        "td-2-solution",
        "TD 2 Solution",
        "https://docs.google.com/document/d/1oAxzcifUoRu6iM9yrdqjxlnAgbColTKM/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "20??-??"
    ),
    tdSolution(
        "td-3-solution",
        "TD 3 Solution",
        "https://drive.google.com/file/d/1xt2Dd4NhwYWNsKDQv-uQML9RPjxpyR3D/view?usp=drive_link",
        "S4", "20??-??"
    ),
    tdSolution(
        "td-4-solution",
        "TD 4 Solution",
        "https://drive.google.com/file/d/1dh1PhgzKoE8pOOUcJ1IAhNWS3jGsXf9o/view?usp=drive_link",
        "S4", "20??-??"
    ),
    tdSolution(
        "td-5-solution",
        "TD 5 Solution",
        "https://drive.google.com/file/d/15npKtgC3ISJ3ERLPejBXfWHtAij3fuLI/view?usp=drive_link",
        "S4", "20??-??"
    ),
    tp(
        "tp-1",
        "TP 1",
        "https://docs.google.com/presentation/d/1-qXLrtQseTE87viJxKt1bT0iCMpWzABX/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2024-25"
    ),
    exam(
        "exam-1",
        "Exam 2016",
        "https://drive.google.com/file/d/1PcLBwL-ub0vPhFl_K82KNEslP4UJHRkn/view?usp=drive_link",
        "S4", "2016"
    ),
    exam(
        "exam-2",
        "Exam 2018",
        "https://docs.google.com/document/d/1TB3HW0fiOf4Va3ZOXoyYPe0bYolki_n5/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2018"
    ),
    exam(
        "exam-3",
        "Exam Rattrapage 2019",
        "https://docs.google.com/document/d/12MOAUojVev6vPEbmBMrjltz1SpWZtSw-/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2019"
    ),
    exam(
        "exam-4",
        "Exam 2020",
        "https://docs.google.com/document/d/1w6S3SlrO38fWvWl7cMwr3QjlSNYT372q/edit?usp=drive_link&ouid=114862124461485137731&rtpof=true&sd=true",
        "S4", "2020"
    ),
    exam(
        "exam-5",
        "Exam 2021",
        "https://drive.google.com/file/d/1ZFsUFnuTKvecxrB0B3cT2B-4drxe3afh/view?usp=drive_link",
        "S4", "2021"
    ),
    examSolution(
        "exam-1-solution",
        "Exam 2016 Solution",
        "https://drive.google.com/file/d/1Y5EBa7RxR8ED_cBUQLrv4klEdoNdc-mB/view?usp=drive_link",
        "S4", "2016"
    ),
    examSolution(
        "exam-2-solution",
        "Exam 2017 Solution",
        "https://drive.google.com/file/d/1rJQBFjbtWIyws1HIWEmmODnbZaqDEJ3c/view?usp=drive_link",
        "S4", "2017"
    ),
    examSolution(
        "exam-3-solution",
        "Exam 2019 Solution",
        "https://drive.google.com/file/d/1a2Fa4gb2Nsx1BYLDHKK8KhFB0u05lUt-/view?usp=drive_link",
        "S4", "2019"
    ),
    examSolution(
        "exam-4-solution",
        "Exam 2020 Solution",
        "https://drive.google.com/file/d/12NJsdQkXnmeHR5TvINK8A_9m6ogsHaXG/view?usp=drive_link",
        "S4", "2020"
    ),
    examSolution(
        "exam-5-solution",
        "Exam 2021 Solution",
        "https://drive.google.com/file/d/1yzxC3rsfIEeokEUd7dZDO1fNTgKtT6Id/view?usp=drive_link",
        "S4", "2021"
    ),
    examSolution(
        "exam-6-solution",
        "Exam 2024 Solution",
        "https://drive.google.com/file/d/1-JEuEOiWFKSwkqHQYgVh_Of7M_VT7POF/view?usp=drive_link",
        "S4", "2024"
    )
];

export default bdd;
