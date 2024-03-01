import { Course } from "./complete";
import { Inscription } from "../../inscriptions/models";

export interface User {
  id: any;
  firstName: string;
  lastName: string;
  password: string;
  country: string;
  email: string;
  rol: string;
  comision: any;
  token: any;
  courses: Course[]; 
  inscriptions: Inscription[];
}

