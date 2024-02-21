import {Injectable} from '@angular/core';
import { of, Observable, mergeMap, catchError, throwError } from 'rxjs';
import { Courses } from './models/index'
import { LoadingService } from '../../../../core/services/loading.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';
import { AlertsService } from '../../../../core/services/alerts.service';

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
      
      getCourses(){
       return this.httpClient.get<Courses[]>(`${enviroment.apiURL}/courses`);
      }

      createCourses(data: Courses) {
        this.alerts.showSuccess('Success', 'Course created successfully.');
        return this.httpClient.post<Courses[]>(`${enviroment.apiURL}/courses`,  {...data, token: this.generateString(5),});
      }

      deleteCoursesById (courseID: number) {
        return this.httpClient.delete<Courses>(`${enviroment.apiURL}/courses/${courseID}`)
       .pipe(mergeMap(() => this.getCourses()));
      }
     
      updateCoursesById(id: number, data: Courses) {
        return this.httpClient.put<Courses>(`${enviroment.apiURL}/courses/${id}`, data)
          .pipe(
            mergeMap(() => {
              this.alerts.showSuccess('Success', 'Course updated successfully.');
              return this.getCourses();
            }),
            catchError(error => {
              this.alerts.showError('Error', 'Failed to update course.');
              return throwError(error);
            })
          );
      }
    }