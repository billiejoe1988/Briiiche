import { Inscription } from "../../inscriptions/models";

export interface Courses {
    id: string;
    courseName: string;
    createdAt: Date;
    inscriptions?: Inscription[]; 
}