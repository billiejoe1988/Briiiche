import { Courses } from "../../courses/models";
import { User } from "../../users/models";

export interface Inscription {
    id: string | number;
    userId: string | number;
    productId: string | number;
    user?: User;
    course?: Courses;
}