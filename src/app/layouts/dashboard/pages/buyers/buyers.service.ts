import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';
import { AlertsService } from '../../../../core/services/alerts.service';
import { UserWithCoursesAndInscriptions, Course, Inscription } from '../users/models/complete';

@Injectable({
  providedIn: 'root'
})
export class BuyersService {
  constructor(private httpClient: HttpClient, private alerts: AlertsService) {}

  getAllBuyersWithCourses(): Observable<UserWithCoursesAndInscriptions[]> {
    return this.httpClient.get<any[]>(`${enviroment.apiURL}/inscriptions?_expand=user&_expand=course`).pipe(
      map((inscriptions: any[]) => {
        const buyersWithCourses: UserWithCoursesAndInscriptions[] = [];
        inscriptions.forEach(inscription => {
          const userInscription = inscription.user;
          const courseId = inscription.course?.id;
          const courseName = inscription.course?.courseName;
          const courseCreatedAt = inscription.course?.createdAt;
          
          if (userInscription && courseId && courseName && courseCreatedAt) {
            const courses: Course[] = [{ id: courseId, courseName: courseName, createdAt: new Date(courseCreatedAt) }];
            const userCoursesAndInscriptions: UserWithCoursesAndInscriptions = {
              id: userInscription.id,
              firstName: userInscription.firstName,
              lastName: userInscription.lastName,
              password: userInscription.password,
              country: userInscription.country,
              email: userInscription.email,
              rol: userInscription.rol,
              comision: userInscription.comision,
              token: userInscription.token,
              courses: courses,
              inscriptions: [{ id: inscription.id, courseId: courseId, userId: userInscription.id }]
            };
            buyersWithCourses.push(userCoursesAndInscriptions);
          }
        });
        return buyersWithCourses;
      }),
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
