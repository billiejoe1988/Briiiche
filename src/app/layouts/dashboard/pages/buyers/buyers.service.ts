import { Injectable } from '@angular/core';
import { User } from '../users/models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';
import { AlertsService } from '../../../../core/services/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {
  constructor(private httpClient: HttpClient, private alerts: AlertsService) {}

  getAllBuyers(): Observable<User[]> {
    return this.httpClient.get<User[]>(`${enviroment.apiURL}/users?rol=BUYER`).pipe(
      catchError((error) => {
        this.alerts.showError('Error', 'An error occurred while fetching buyers.');
        return throwError(error);
      })
    );
  }

  createBuyer(newBuyer: User): Observable<User> {
    return this.httpClient.post<User>(`${enviroment.apiURL}/users`, newBuyer).pipe(
      catchError((error) => {
        this.alerts.showError('Error', 'An error occurred while creating the buyer.');
        return throwError(error);
      })
    );
  }

  updateBuyer(updatedBuyer: User): Observable<User> {
    return this.httpClient.put<User>(`${enviroment.apiURL}/users/${updatedBuyer.id}`, updatedBuyer).pipe(
      catchError((error) => {
        this.alerts.showError('Error', 'An error occurred while updating the buyer.');
        return throwError(error);
      })
    );
  }

  deleteBuyer(buyerId: string): Observable<void> {
    return this.httpClient.delete<void>(`${enviroment.apiURL}/users/${buyerId}`).pipe(
      catchError((error) => {
        this.alerts.showError('Error', 'An error occurred while deleting the buyer.');
        return throwError(error);
      })
    );
  }
}
