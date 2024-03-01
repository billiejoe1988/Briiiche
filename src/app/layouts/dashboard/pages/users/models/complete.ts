export interface UserClean{
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    country: string;
    email: string;
    rol: string;
    comision: string;
    token: string;

  }
  
  export interface Course {
    id: number;
    courseName: string;
    createdAt: Date;
  }
  
  export interface Inscription {
    id: number;
    courseId: number;
    userId: number;
  }
  