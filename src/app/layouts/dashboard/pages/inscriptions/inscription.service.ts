import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, throwError, mergeMap } from 'rxjs';
import { enviroment } from "../../../../enviroments/enviroment";
import { Inscription } from "./models";
import { User } from "../users/models";
import { CreateInscriptionData } from "./models";

@Injectable({ providedIn: 'root'})
export class InscriptionService {
  
  constructor(private http: HttpClient) {}

  getInscription() {
    return this.http.get<Inscription[]>(`${enviroment.apiURL}/inscriptions?_embed=user&_embed=course`);    
  }

  updateInscription(id: string, changes: Partial<Inscription>) {
    return this.http.get<Inscription>(`${enviroment.apiURL}/inscriptions/${id}`).pipe(
      catchError(error => {
        console.error('Error fetching inscription:', error);
        return throwError(() => error);
      }),
      mergeMap(inscription => {
        const updatedInscription: Inscription = { ...inscription, ...changes };
        return this.http.put(`${enviroment.apiURL}/inscriptions/${id}`, updatedInscription).pipe(
          catchError(error => {
            console.error('Error updating inscription:', error);
            return throwError(() => error);
          })
        );
      })
    );
  }

  getInscriptionsById(userId: string | number) {
    return this.http.get<User>(`${enviroment.apiURL}/users/${userId}`).pipe(
      concatMap((user) =>
        this.http.get(`${enviroment.apiURL}/inscriptions?userId=${user.id}`)
      ),
      catchError((error) => {
        console.error('Error fetching inscriptions by user ID:', error);
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
