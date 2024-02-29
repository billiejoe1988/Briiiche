import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Courses } from '../../models';
import { CoursesService } from '../../courses.service';
import { AlertsService } from '../../../../../../core/services/alerts.service'; 

@Component({
  selector: 'app-product-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'],
  providers: [CoursesService]
})
export class CoursesDialogComponent {
  coursesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CoursesDialogComponent>,
    private coursesService: CoursesService,
    private alertsService: AlertsService 
  ) {
    this.coursesForm = this.fb.group({
      courseName: ['', [Validators.required]],
      createdAt: ['', [Validators.required]]
    });
  }

  onSave(): void {
    if (this.coursesForm.valid) {
      const courseData: Courses = this.coursesForm.value;
      this.coursesService.createCourses(courseData).subscribe({
        next: () => {
          this.alertsService.showSuccess('Success', 'Course added successfully.'); 
          this.dialogRef.close(courseData);
        },
        error: (error) => {
          console.error('Error creating course:', error);
          this.alertsService.showError('Error', 'An error occurred while creating the course.'); 
        }
      });
    } else {
      this.markFormGroupTouched(this.coursesForm);
    }
  }
  
  private markFormGroupTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }
}
