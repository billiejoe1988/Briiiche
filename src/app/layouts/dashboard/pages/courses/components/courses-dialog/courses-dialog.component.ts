import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Courses } from '../../models';
import { Course } from '../../../users/models/complete';
import { CoursesService } from '../../courses.service';
import { AlertsService } from '../../../../../../core/services/alerts.service'; 

@Component({
  selector: 'app-product-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'],
})

export class CoursesDialogComponent {
  coursesForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CoursesDialogComponent>,
    private coursesService: CoursesService,
    private alertsService: AlertsService,
    @Inject(MAT_DIALOG_DATA) private editingCourses?: Courses
  ) {
    this.coursesForm = this.fb.group({
      courseName: ['', [Validators.required]],
      createdAt: ['', [Validators.required]]
    });

    if (this.editingCourses) {
      this.coursesForm.patchValue(this.editingCourses);
    }
  }

  onSave(): void {
    if (this.coursesForm.valid) {
      this.dialogRef.close(this.coursesForm.value);
    } else {
      this.markFormGroupTouched(this.coursesForm);
    }
  }

onCreate(): void {
  if (this.coursesForm.valid) {
    const newCourse: Courses = this.coursesForm.value;
    this.coursesService.createCourses(newCourse).subscribe({
      next: () => {
        this.dialogRef.close('created');
      },
      error: (error: any) => {
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
