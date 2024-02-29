import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, concatMap, throwError, mergeMap } from 'rxjs';
import { enviroment } from "../../../../enviroments/enviroment";
import { Inscription } from "./models";
import { CreateInscriptionData } from "./models";
import { Buyer } from "../buyers/model";

@Injectable({ providedIn: 'root'})
export class InscriptionService {
  
  constructor(private http: HttpClient) {}

  getInscription() {
    return this.http.get<Inscription[]>(`${enviroment.apiURL}/inscriptions?_embed=buyers&_embed=course`);    
  }

  getInscriptionsById(buyerId: string | number) {
    return this.http.get<Buyer>(`${enviroment.apiURL}/buyers/${buyerId}`).pipe(
      concatMap((buyer) =>
        this.http.get(`${enviroment.apiURL}/inscriptions?buyerId=${buyerId}`)
      ),
      catchError((error) => {
        console.error('Error fetching inscriptions by buyer ID:', error);
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
