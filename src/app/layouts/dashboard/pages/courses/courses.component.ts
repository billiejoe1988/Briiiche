import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Courses } from './models/index';
import { CoursesService } from './courses.service';
import { AlertsService } from '../../../../core/services/alerts.service';
import { CoursesEditDialogComponent } from './components/coursedialog-edit/coursedialog-edit.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  displayedColumns = ['id', 'courseName', 'createdAt', 'actions'];
  isAdmin: boolean = false;
  courses: Courses[] = [];

  constructor(
    private dialog: MatDialog,
    private coursesService: CoursesService,
    private alertsService: AlertsService
  ) { 
    
    this.isAdmin = true; 
    this.loadCourses(); 
  }

  onCreate(): void {
    this.dialog.open(CoursesEditDialogComponent).afterClosed().subscribe(result => {
      if (result) {
        this.coursesService.createCourses(result).subscribe({
          next: () => {
            this.loadCourses();
            this.alertsService.showSuccess('Success', 'Course added successfully.');
          },
          error: (error) => {
            console.error('Error creating course:', error);
            this.alertsService.showError('Error', 'An error occurred while creating the course.');
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
          next: () => { 
            this.loadCourses(); 
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

  onEdit(course: Courses) {
    const dialogRef = this.dialog.open(CoursesEditDialogComponent, {
      data: course,
    });

    dialogRef.afterClosed().subscribe((result: Courses | undefined) => {
      if (result) {
        this.coursesService.updateCoursesById(result).subscribe({
          next: () => {
            this.loadCourses(); 
            this.alertsService.showSuccess('Success', 'Course updated successfully.');
          },
          error: (error: any) => {
            console.error('Error updating course:', error);
            this.alertsService.showError('Error', 'An error occurred while updating the course.');
          }
        });
      }
    });
  }

  loadCourses(): void {
    this.coursesService.getCourses().subscribe({
      next: (courses: Courses[]) => {
        this.courses = courses;
      },
      error: (error: any) => {
        console.error('Error retrieving courses:', error);
        this.alertsService.showError('Error', 'An error occurred while retrieving the courses.');
      }
    });
  }
}
