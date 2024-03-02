export interface UserClean{
  id: any;
  firstName: string;
  lastName: string;
  password: string;
  country: string;
  email: string;
  rol: string;
  comision: string;
  token: any;
}

export interface Course {
  id: any;
  courseName: string;
  createdAt: Date;
}

export interface Inscription {
  id: any;
  courseId: any;
  userId: any;
}
  