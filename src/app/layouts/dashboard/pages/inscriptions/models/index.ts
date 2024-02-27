import { Courses } from "../../courses/models";
import { User } from "../../users/models";

export interface Inscription {
    id: string | number;
    userId: string | number;
    courseId: string | number;
    user?: User;
    course?: Courses;
}

export interface CreateInscriptionData{
    userId: number;
    courseId: number;
}