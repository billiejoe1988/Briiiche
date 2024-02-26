import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { enviroment } from "../../../../enviroments/enviroment";
import { catchError, concatMap, throwError } from 'rxjs';
import { Inscription } from "./models";
import { User } from "../users/models";
import { CreateInscriptionData } from "./models";

@Injectable({ providedIn: 'root'})
export class InscriptionService {
    constructor (private http: HttpClient){}

    getInscription () {
        return this.http.get<Inscription[]>(`${enviroment.apiURL}/inscriptions?_embed=user&_embed=course`);    
    }

    getInscriptionsById(userId: string | number) {
        return this.http.get<User>(`${enviroment.apiURL}/users/${userId}`).pipe(
          concatMap((user) =>
            this.http.get(`${enviroment.apiURL}/inscriptions?userId=${user.id}`)
          ),
          catchError((error) => {
            alert('Oops, Error');
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