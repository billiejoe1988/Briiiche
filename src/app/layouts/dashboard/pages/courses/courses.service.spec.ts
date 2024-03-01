import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CoursesService } from './courses.service';
import { AlertsService } from '../../../../core/services/alerts.service';
import { enviroment } from '../../../../enviroments/enviroment';
import { Courses } from './models';
import { of } from 'rxjs';

describe('CoursesService', () => {
  let service: CoursesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CoursesService, AlertsService]
    });
    service = TestBed.inject(CoursesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch courses', () => {
    const mockCourses: Courses[] = [
        { id: 1, courseName: 'Course 1', createdAt: new Date('2022-01-01T00:00:00Z') },
        { id: 2, courseName: 'Course 2', createdAt: new Date('2022-01-02T00:00:00Z') }
      ];
      
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses).toEqual(mockCourses);
    });

    const req = httpMock.expectOne(`${enviroment.apiURL}/courses`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });
});
