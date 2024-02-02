import {Injectable} from '@angular/core';
import { of, delay, finalize } from 'rxjs';
import { Courses } from './models/index'
import { LoadingService } from '../../../../core/services/loading.service';

    let courses: Courses [] = [
        {
          id: 1,
          name: 'Cuisine Begin',
          createdAt: new Date (),
        },
        {
          id: 2,
          name: 'Cuisine Professional',
          createdAt: new Date (),
        },
        {
          id: 3,
          name: 'Pastry Begin',
          createdAt: new Date (),
        },
        {
          id: 4,
          name: 'Pastr Professional',
          createdAt: new Date (),
        }
    ];

    @Injectable()
    export class CoursesService {

      constructor(private loadingService: LoadingService) {}

      getCourses(){
        this.loadingService.setIsLoading(true)
        return of (courses).pipe(delay(1000), finalize(() => this.loadingService.setIsLoading(false)))
      }

      createCourses(data: Courses) {
        courses = [...courses, {...data, id: courses.length + 1 }];
        return this.getCourses();
      }

      deleteCoursesById (id: number) {
        courses = courses.filter((el) => el.id != id);
        return of (courses);
      }
     
      updateCoursesById(id: number, data:Courses){
        courses = courses.map((el) =>(el.id === id ? {...el, ...data} : el));
        return this.getCourses();
      }
}