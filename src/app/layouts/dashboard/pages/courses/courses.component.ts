import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { Courses } from './models/index';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from '../../../../core/services/alerts.service';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  displayedColumns = ['id', 'courseName', 'createdAt', 'actions'];

  courses: Courses[] = [];

  constructor(private coursesService: CoursesService, public dialog: MatDialog, private alertsService: AlertsService) { 
    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  onCreate(): void {
    this.dialog.open(CoursesDialogComponent).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.coursesService.createCourses(result).subscribe({
            next: () => {
              this.coursesService.getCourses().subscribe({
                next: (courses) => {
                  this.courses = courses;
                  this.alertsService.showSuccess('Success', 'Course added successfully.'); 
                },
                error: (error) => {
                  console.error('Error retrieving courses after creating a new course:', error);
                  this.alertsService.showError('Error', 'An error occurred while retrieving the courses after creating a new course.');
                }
              });
            },
            error: (error) => {
              console.error('Error creating course:', error);
              this.alertsService.showError('Error', 'An error occurred while creating the course.');
            }
          });
        }
      }
    });
  }
  

  onEdit(courses: Courses) {
    this.dialog.open(CoursesDialogComponent, {
      data: courses,
    }).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.coursesService.updateCoursesById(courses.id, result).subscribe({
            next: (courses) => {
              this.courses = courses;
              this.alertsService.showSuccess('Success', 'Course updated successfully.');
            },
            error: (error) => {
              console.error('Error updating course:', error);
              this.alertsService.showError('Error', 'An error occurred while updating the course.');
            }
          });
        }
      }
    });
  }
  
  onDelete(id: number) {
    this.alertsService.showAlert({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursesService.deleteCoursesById(id).subscribe({
          next: (courses) => {
            this.courses = courses;
            this.alertsService.showSuccess('Success', 'Course deleted successfully.');
          },
          error: (error) => {
            console.error('Error deleting course:', error);
            this.alertsService.showError('Error', 'An error occurred while deleting the course.');
          }
        });
      }
    });
  }
}