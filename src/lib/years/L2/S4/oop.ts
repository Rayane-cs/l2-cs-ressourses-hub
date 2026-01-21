import { Resource } from "../../../types";
import { course, exam, examSolution, resume, td, tdSolution, tp, tpSolution, ytVideo } from "../../../resourceFactory";

const oop: Resource[] = [
    course(
        "course-1",
        "Cour",
        "https://drive.google.com/file/d/1gJhdqD7_KXwC3PHHXvDg7D_hbtOd36ub/view?usp=drive_link",
        "S4", "20??"
    ),
    course(
        "course-1",
        "Cour Ibri",
        "https://drive.google.com/file/d/1z44evHcrGv2STSUX9plI0p9RwPJTBPsL/view?usp=drive_link",
        "S4", "2016"
    ),
];

export default oop;
