export interface User {
    id: number;
    firstName: string;
    lastName: string;
    password:string;
    country: string;
    email:string;
    rol:string;
    comision: string;
  }

export type Country = 'ARG' | 'BRA' | 'COL' | 'MEX' | 'USA' | 'URU';