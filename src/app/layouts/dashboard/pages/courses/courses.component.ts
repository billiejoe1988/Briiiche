import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Courses } from './models/index';
import { Subject } from 'rxjs';
import { CoursesService } from './courses.service';
import { AlertsService } from '../../../../core/services/alerts.service';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { Course } from '../users/models/complete';
import { CoursesEditDialogComponent } from './components/coursedialog-edit/coursedialog-edit.component';
import { AuthService } from '../../../auth/auth.service';
import { UsersService } from '../users/users.service';
import { User } from '../users/models';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../../../../core/store/auth/selectors';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit {
  displayedColumns = ['id', 'courseName', 'createdAt', 'actions'];
  courses: Courses[] = [];
  authUser$: Observable<User | null>;

  private coursesSavedSubject: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private coursesService: CoursesService,
    private alertsService: AlertsService,
    private authService: AuthService,
    private userService: UsersService,
    private store: Store
    ) { 
      this.authUser$ = this.store.select(selectAuthUser);
  }
     
  ngOnInit(): void {
    this.loadCourses();
    this.coursesSavedSubject.subscribe(() => {
      this.loadCourses();
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

  onCreate(): void {
    this.dialog.open(CoursesDialogComponent).afterClosed().subscribe(
      (result: string | undefined) => {
        if (result === 'created') {
          this.loadCourses();
          this.alertsService.showSuccess('Success', 'Course added successfully.');
        }
      }
    );
  }

  onCourseSubmitted(course: Courses): void {
    this.coursesService.createCourses(course).subscribe({
      next: () => {
        this.loadCourses();
        this.alertsService.showSuccess('Success', 'Course added successfully.'); 
      },
      error: (error: any) => {
        this.alertsService.showError('Error', 'An error occurred while creating the Course.');
      }
    });
  }
  
  onEdit(course: Courses): void {
    const dialogRef = this.dialog.open(CoursesEditDialogComponent, {
      data: course,
    });
  
    dialogRef.afterClosed().subscribe((result: Courses | undefined) => {
      if (result) {
        result.id = course.id;
        this.coursesService.updateCoursesById(course.id, result).subscribe({
          next: () => {
            this.loadCourses();
            this.alertsService.showSuccess('Success', 'Course updated successfully.');

            this.courses = this.courses.map(c => c.id === course.id ? result : c);
          },
          error: (error: any) => {
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
        this.alertsService.showError('Error', 'An error occurred while retrieving the courses.');
      }
    });
  }

 deleteCourse(course: Course): void {
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
          this.loadCourses();
          this.alertsService.showSuccess('Success', 'User deleted successfully.');
        },
        error: (error: any) => {
          this.alertsService.showError('Error', 'An error occurred while deleting the user.');
        }
      });
    }
  });
}
}