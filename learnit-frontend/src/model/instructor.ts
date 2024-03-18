export default interface Instructor {
  id?: number;
  name: string;
  email: string;
  phone: string | null;
  password: string;
  bio?: string;
}
