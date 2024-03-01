import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Courses } from './models/index';
import { Subject } from 'rxjs';
import { CoursesService } from './courses.service';
import { AlertsService } from '../../../../core/services/alerts.service';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { Course } from '../users/models/complete';
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

  private coursesSavedSubject: Subject<void> = new Subject<void>();

  constructor(
    private dialog: MatDialog,
    private coursesService: CoursesService,
    private alertsService: AlertsService,
  ) { }
     
  ngOnInit(): void {
      this.isAdmin = true;
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
        // Asignar la ID del curso original al resultado actualizado
        result.id = course.id;
  
        // Llamar a la función de actualización con la ID y el objeto del curso actualizado
        this.coursesService.updateCoursesById(course.id, result).subscribe({
          next: () => {
            // Recargar la lista de cursos después de la actualización
            this.loadCourses();
  
            // Mostrar una notificación de éxito
            this.alertsService.showSuccess('Success', 'Course updated successfully.');
  
            // Reemplazar el curso original con el curso actualizado en la lista
            this.courses = this.courses.map(c => c.id === course.id ? result : c);
          },
          error: (error: any) => {
            // Manejar errores
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