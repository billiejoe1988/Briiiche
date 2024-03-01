import { Courses } from "../../courses/models";
import { Buyer } from "../../buyers/model";

export interface Inscription {
    id: string | number;
    buyerId: string | number;
    courseId: string | number;
    buyer?: Buyer;
    course?: Courses;
    courseDetails?: Courses;
}

export interface CreateInscriptionData{
    buyerId: number;
    courseId: number;
}