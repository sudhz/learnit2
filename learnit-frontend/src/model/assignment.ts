export default interface Assignment {
  AQuestionId?: number; //auto-increment
  ADetails: string | null;
  CourseId: number;
  ADeadline: string | null;
}