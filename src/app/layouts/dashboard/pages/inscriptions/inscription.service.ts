import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, throwError } from 'rxjs';
import { enviroment } from "../../../../enviroments/enviroment";
import { Inscription } from "./models";
import { CreateInscriptionData } from "./models";

@Injectable({ providedIn: 'root'})
export class InscriptionService {
  
  constructor(private http: HttpClient) {}

  getInscription() {
    return this.http.get<Inscription[]>(`${enviroment.apiURL}/inscriptions?_embed=buyer&_embed=course`);    
  }

  getInscriptionsById(buyerId: string | number) {
    return this.http.get<Inscription[]>(`${enviroment.apiURL}/inscriptions?buyerId=${buyerId}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  getInscriptionsByCourseId(courseId: string | number) {
    return this.http.get<Inscription[]>(`${enviroment.apiURL}/inscriptions?courseId=${courseId}`).pipe(
      catchError((error) => {
        return throwError(() => error);
      })
    );
  }
  
  createInscription(data: CreateInscriptionData) {
    return this.http.post<Inscription>(`${enviroment.apiURL}/inscriptions`, data);
  }

  deleteInscription(id: string | number) {
    return this.http.delete(`${enviroment.apiURL}/inscriptions/${id}`).pipe(
      catchError(error => {
        console.error('Error deleting inscription:', error);
        return throwError(() => error);
      })
    );
  }
}
