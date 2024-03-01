import { Course } from "../../users/models/complete";
import { Inscription } from "../../inscriptions/models";

export interface Buyer {
  id: any;
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
