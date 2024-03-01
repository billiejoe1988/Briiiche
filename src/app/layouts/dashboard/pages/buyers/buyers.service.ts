import { Injectable } from '@angular/core';
import { Observable, of, mergeMap, catchError, throwError, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';
import { FormControl } from '@angular/forms';
import { AlertsService } from '../../../../core/services/alerts.service';
import { Buyer } from './model';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {
  constructor(private httpClient: HttpClient, private alerts: AlertsService) {}

  generateString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

    getBuyers() {
      return this.httpClient.get<Buyer[]>(`${enviroment.apiURL}/buyers`);
    }

    getBuyersById(id: number | string) {
      return this.httpClient.get<Buyer>(`${enviroment.apiURL}/buyers/${id}`);
    }

    createBuyer(payload: Buyer){
      this.alerts.showSuccess('Success', 'User created successfully.');
      return this.httpClient.post<Buyer[]>(`${enviroment.apiURL}/buyers`, {...payload, token: this.generateString(5),})
      .pipe(mergeMap(() => this.getBuyers()));
    }

    updateBuyerById(updatedUser: Buyer): Observable<Buyer[]> {
      return this.httpClient.put<Buyer>(`${enviroment.apiURL}/buyers/${updatedUser.id}`, updatedUser)
        .pipe(
          mergeMap(() => {
            this.alerts.showSuccess('Success', 'User updated successfully.');
            return this.getBuyers();
          }),
          catchError(error => {
            this.alerts.showError('Error', 'Failed to update user.');
            return throwError(error);
          })
        );
    }

  deleteBuyerById(buyerID: number) {
    return this.httpClient.delete<Buyer>(`${enviroment.apiURL}/buyers/${buyerID}`)
    .pipe(mergeMap(() => this.getBuyers()));
  }
  getBuyerDetails(buyerId: string): Observable<Buyer> {
    const url = `${enviroment.apiURL}/buyers/${buyerId}`;
    return this.httpClient.get<Buyer>(url).pipe(
    );
  }
  deleteInscription(buyerId: string, inscriptionId: string): Observable<void> {
    return this.httpClient.delete<void>(`${enviroment.apiURL}/buyers/${buyerId}/inscriptions/${inscriptionId}`).pipe(
      catchError(error => {
        this.alerts.showError('Error', 'Failed to delete inscription.');
        return throwError(error);
      })
    );
  }
}
