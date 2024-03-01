import { Inscription } from "../../inscriptions/models";

export interface Courses {
    id: any;
    courseName: string;
    createdAt: Date;
    inscriptions?: Inscription[]; 
}