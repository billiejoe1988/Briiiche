import { Component } from '@angular/core';
import { CoursesService } from './courses.service';
import { Courses } from './models/index';
import { MatDialog } from '@angular/material/dialog';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  displayedColumns = ['id', 'courseName', 'createdAt', 'actions'];

  courses: Courses[] = [];

  constructor(private coursesService: CoursesService, public dialog: MatDialog) { 

    this.coursesService.getCourses().subscribe({
      next: (courses) => {
        this.courses = courses;
      },
    });
  }

  onCreate() :void {
    this.dialog.open(CoursesDialogComponent).afterClosed().subscribe({
      next: (result) => {
        if (result) {
          this.coursesService.createCourses(result).subscribe({
            next: (courses) => (this.courses = courses),
          })
        }
      }
    });
  }

  onEdit(courses: Courses) {
    const dialogRef = this.dialog.open(CoursesDialogComponent, {
      data: courses,
    });
  
    dialogRef.afterClosed().subscribe((result: Courses) => {
      if (result) {
        this.coursesService.updateCoursesById(courses.id, result)
          .subscribe({
            next: (updatedCourses) => {
              this.courses = updatedCourses;
            },
            error: (err) => {
              console.error('Error updating course:', err);
            }
          });
      }
    });
  }

  onDelete(id: number) {
    if (confirm ('Are you sure?')){
      this.coursesService.deleteCoursesById(id).subscribe({
        next: (courses) => {
          this.courses = courses;
        },
      });
    }
  }
}
