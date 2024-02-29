import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { Courses } from './models/index';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from '../../../../core/services/alerts.service';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { AuthService } from '../../../auth/auth.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  displayedColumns = ['id', 'courseName', 'createdAt', 'actions'];
  isAdmin: boolean = false;
  courses: Courses[] = [];

  constructor(private coursesService: CoursesService, public dialog: MatDialog, private alertsService: AlertsService, private authService: AuthService, private userService: UsersService) { 
    this.userService.getRoles().subscribe(roles => {
      this.isAdmin = roles.includes('ADMIN');
    });

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
  onEdit(course: Courses) {
    this.dialog.open(CoursesDialogComponent, {
      data: course,
    }).afterClosed().subscribe((result: any) => { 
      if (result) {
        this.coursesService.updateCoursesById(Number(course.id), result).subscribe({
          next: () => { 
            this.coursesService.getCourses().subscribe({
              next: (courses: Courses[]) => {
                this.courses = courses;
                this.alertsService.showSuccess('Success', 'Course updated successfully.');
              },
              error: (error: any) => {
                console.error('Error retrieving courses after updating a course:', error);
                this.alertsService.showError('Error', 'An error occurred while retrieving the courses after updating a course.');
              }
            });
          },
          error: (error: any) => {
            console.error('Error updating course:', error);
            this.alertsService.showError('Error', 'An error occurred while updating the course.');
          }
        });
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