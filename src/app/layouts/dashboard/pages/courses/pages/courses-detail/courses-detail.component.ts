import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../courses.service';
import { Courses } from '../../models'; 
import { Inscription } from '../../../inscriptions/models';
import { CoursesDeleteService } from '../../courses-delete.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from '../../../../../../core/services/alerts.service';
import { Course } from '../../../users/models/complete';
import { CoursesEditDialogComponent } from '../../components/coursedialog-edit/coursedialog-edit.component';

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
    private router: Router,
    private coursesDeleteService: CoursesDeleteService,
    private dialog: MatDialog,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = params['id'];
      if (courseId) {
        this.loadCoursesDetails(courseId);
      }
    });
  }

  loadCoursesDetails(courseId: string): void {
    this.coursesService.getCoursesDetails(courseId).subscribe({
      next: (course: Courses) => {
        this.course = course;
      },
      error: (error: any) => {
        console.error('Error loading course details:', error);
        this.alertsService.showError('Error', 'An error occurred while loading course details.');
      }
    });
  }

  goBackToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  
  deleteCourse(course: Courses): void {
    this.alertsService.showAlert({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursesService.deleteCoursesById(course.id).subscribe({
          next: () => {
            this.alertsService.showSuccess('Success', 'course deleted successfully.');
            this.coursesDeleteService.deleteBuyer();
            this.router.navigate(['../'], { relativeTo: this.route }); 
          },
          error: (error: any) => {
            console.error('Error deleting course:', error);
            this.alertsService.showError('Error', 'An error occurred while deleting the course.');
          }
        });
      }
    });
  }

  editCourse(course: Course): void {
    const dialogRef = this.dialog.open(CoursesEditDialogComponent, {
      width: '1000px',
      data: course 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.course = result;
      }
    });
  }
}
