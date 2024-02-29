import { User } from "../../users/models";
import { Course } from "../../users/models/complete";
import { Inscription } from "../../inscriptions/models";

export interface Buyer {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  country: string;
  email: string;
  rol: string;
  comision: string;
  token: string;
  courses: Course[]; 
  inscriptions: Inscription[];
}
