import {Injectable} from '@angular/core';
import { of, Observable, mergeMap, catchError, throwError, map } from 'rxjs';
import { Courses } from './models/index'
import { LoadingService } from '../../../../core/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';
import { AlertsService } from '../../../../core/services/alerts.service';
import { Inscription } from '../inscriptions/models';

    let courses: Courses [] = [];

    @Injectable()
    export class CoursesService {
      constructor( private alerts: AlertsService, private loadingService: LoadingService, private httpClient: HttpClient) {}

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
        return this.httpClient.get<Inscription[]>(`${enviroment.apiURL}/inscriptions/course/${courseId}`)
          .pipe(
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

      getCoursesById(courseId: string): Observable<Courses> {
        return this.httpClient.get<Courses>(`${enviroment.apiURL}/courses/${courseId}`);
      }
      
      createCourses(data: Courses) {
        this.alerts.showSuccess('Success', 'Course created successfully.');
        return this.httpClient.post<Courses[]>(`${enviroment.apiURL}/courses`,  {...data, token: this.generateString(5),});
      }

      deleteCoursesById (courseID: number) {
        return this.httpClient.delete<Courses>(`${enviroment.apiURL}/courses/${courseID}`)
       .pipe(mergeMap(() => this.getCourses()));
      }
     
      updateCoursesById(courseID: number, data: Courses) {
        return this.httpClient.put<Courses>(`${enviroment.apiURL}/courses/${courseID}`, data)
          .pipe(
            mergeMap(() => {
              this.alerts.showSuccess('Success', 'Course updated successfully.');
              return of(data); 
            }),
            catchError(error => {
              this.alerts.showError('Error', 'Failed to update course.');
              return throwError(error);
            })
          );
      }
  }