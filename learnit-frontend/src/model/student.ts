import Comment from "./comment";

export default interface Student {
  studentId: number;
  studentName: string;
  email: string;
  phone: string | null;
  password: string;
  comments: Comment[];
  studentCourses?: [];
}
