import Course from "./course";
import Student from "./student";

export default interface Comment {
  commentId: number;
  commentBody: string;
  courseId: number;
  studentId: number;
  course: Course[];
  student: Student[];
}
