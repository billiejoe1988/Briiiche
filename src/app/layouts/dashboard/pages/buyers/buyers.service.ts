import { Injectable } from '@angular/core';
import { User } from '../users/models';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';
import { AlertsService } from '../../../../core/services/alerts.service';
import { UserWithCoursesAndInscriptions } from '../users/models/complete';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {
  constructor(private httpClient: HttpClient, private alerts: AlertsService) {}

  getAllBuyersWithCourses(): Observable<UserWithCoursesAndInscriptions[]> {
    return this.httpClient.get<UserWithCoursesAndInscriptions[]>(`${enviroment.apiURL}/users?rol=BUYER&_embed=courses&_embed=inscriptions`).pipe(
      catchError((error) => {
        this.alerts.showError('Error', 'An error occurred while fetching buyers with courses.');
        return throwError(error);
      })
    );
  }

  createBuyer(newBuyer: UserWithCoursesAndInscriptions): Observable<UserWithCoursesAndInscriptions> {
    return this.httpClient.post<UserWithCoursesAndInscriptions>(`${enviroment.apiURL}/users`, newBuyer).pipe(
      catchError((error) => {
        this.alerts.showError('Error', 'An error occurred while creating the buyer.');
        return throwError(error);
      })
    );
  }

  updateBuyer(updatedBuyer: UserWithCoursesAndInscriptions): Observable<UserWithCoursesAndInscriptions> {
    return this.httpClient.put<UserWithCoursesAndInscriptions>(`${enviroment.apiURL}/users/${updatedBuyer.id}`, updatedBuyer).pipe(
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