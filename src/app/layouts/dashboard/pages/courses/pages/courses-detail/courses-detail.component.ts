import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../courses.service';
import { Courses } from '../../models'; 
import { Inscription } from '../../../inscriptions/models';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent implements OnInit {
  course: Courses | undefined;
  inscriptions: Inscription[] | undefined;

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const courseId = params.get('id');
      if (courseId) {
        this.coursesService.getCoursesById(courseId).subscribe(course => {
          this.course = course; 
          this.loadInscriptions(courseId); 
        });
      }
    });
  }

  loadInscriptions(courseId: string): void {
    this.coursesService.getInscriptionsByCourseId(courseId).subscribe(inscriptions => {
      this.inscriptions = inscriptions;
    });
  }

  goBackToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deleteCourse(): void {
    const courseId = this.course?.id;
    if (courseId) {
      const courseIdNumber = parseInt(courseId, 10);
      this.coursesService.deleteCoursesById(courseIdNumber).subscribe(() => {
        this.router.navigate(['../'], { relativeTo: this.route }); 
      });
    }
  }
}
