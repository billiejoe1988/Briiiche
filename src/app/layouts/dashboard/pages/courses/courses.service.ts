import { Injectable } from '@angular/core';
import { Observable, throwError, forkJoin, of, tap } from 'rxjs';
import { catchError, map, mergeMap} from 'rxjs/operators';
import { Courses } from './models/index';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';
import { AlertsService } from '../../../../core/services/alerts.service';
import { Inscription } from '../inscriptions/models';
import { Course } from '../users/models/complete';

const ROLES_DB: string[] = ['ADMIN', 'USER', 'BUYER'];

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(
    private alerts: AlertsService,
    private httpClient: HttpClient,
    private alertsService: AlertsService
  ) {}

  generateString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  getInscriptionsByCourseId(courseId: string): Observable<Inscription[]> {
    return this.httpClient.get<Inscription[]>(`${enviroment.apiURL}/inscriptions/course/${courseId}`).pipe(
      catchError(error => {
        return throwError(error);
      })
    );
  }

  getCourses(): Observable<Courses[]> {
    return this.httpClient.get<any[]>(`${enviroment.apiURL}/courses`).pipe(
      map(coursesData => {
        return coursesData.map((courseData: any, index: number) => {
          if (!courseData.id) {
            courseData.id = `generatedId_${index}`;
          }
          return courseData as Courses;
        });
      })
    );
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB);
  }

  getCoursesById(courseId: string): Observable<Courses> {
    return this.httpClient.get<Courses>(`${enviroment.apiURL}/courses/${courseId}`);
  }

  createCourses(data: Courses) {
    this.alerts.showSuccess('Success', 'Course created successfully.');
    return this.httpClient.post<Courses[]>(`${enviroment.apiURL}/courses`, 
    { ...data, token: this.generateString(5) }).pipe(mergeMap(() => this.getCourses()));
  }

  deleteCoursesById(courseID: number) {
    return this.httpClient.delete<Courses>(`${enviroment.apiURL}/courses/${courseID}`)
    .pipe(mergeMap(() => this.getCourses()));
  }
  
  updateCoursesById(courseId: number, updatedCourse: Course): Observable<Course[]> {
    return this.httpClient.put<Course>(`${enviroment.apiURL}/courses/${courseId}`, updatedCourse)
      .pipe(
        mergeMap(() => {
          this.alertsService.showSuccess('cursos', 'curso modificado correctamente !!');
          return this.getCourses();
        }),
        catchError(error => {
          this.alertsService.showError('Error', 'Failed to update course.');
          return throwError(error);
        })
      );
  }
  
  getInscriptonsWithCourseDetails(): Observable<Inscription[]> {
    return this.httpClient.get<Inscription[]>(`${enviroment.apiURL}/inscriptions`).pipe(
      mergeMap((inscriptions: Inscription[]) => {
        const courseIds = Array.from(new Set(inscriptions.map(inscription => inscription.courseId)));
        const courseRequests = courseIds.map(courseId =>
          this.getCoursesById(courseId.toString()).pipe(
            map(course => ({
              courseId: courseId,
              courseDetails: course
            }))
          )
        );

        return forkJoin(courseRequests).pipe(
          map(courseDetailsArray => {
            inscriptions.forEach(inscription => {
              const courseDetails = courseDetailsArray.find(
                courseDetails => courseDetails.courseId === inscription.courseId
              );
              if (courseDetails) {
                inscription.courseDetails = courseDetails.courseDetails;
              }
            });
            return inscriptions;
          })
        );
      }),
      catchError(error => {
        return throwError(error);
      })
    );
  }
  getCoursesDetails(courseId: string): Observable<Courses> {
    const url =`${enviroment.apiURL}/courses/${courseId}`;
    return this.httpClient.get<Courses>(url).pipe();
    }
}
