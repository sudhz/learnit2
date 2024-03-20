export default interface Course {
  id: number;
  name: string;
  i_id: number;
  instructors: Instructor[];
  cDesc?: string;
  imgUrl?: string;
  price: number;
  createdAt: string;
  instructorId: number;
}
