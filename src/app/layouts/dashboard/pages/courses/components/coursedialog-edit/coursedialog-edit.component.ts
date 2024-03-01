import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Courses } from '../../models';
import { AlertsService } from '../../../../../../core/services/alerts.service';
import { CoursesService } from '../../courses.service';

@Component({
  selector: 'app-courses-edit-dialog', 
  templateUrl: './coursedialog-edit.component.html', 
  styleUrls: ['./coursedialog-edit.component.scss']
})
export class CoursesEditDialogComponent {
  coursesEditForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CoursesEditDialogComponent>,
    private alertsService: AlertsService,
    private coursesService: CoursesService,
    @Inject(MAT_DIALOG_DATA) private editingCourses?: Courses
  ) {
    this.coursesEditForm = this.fb.group({
      courseName: ['', [Validators.required]],
      createdAt: ['', [Validators.required]],
    });
  
    if (this.editingCourses) {
      this.coursesEditForm.patchValue(this.editingCourses);
    }
  }

  onSave(): void {
    if (this.coursesEditForm.valid) {
      this.dialogRef.close(this.coursesEditForm.value);
    } else {
      this.markFormGroupTouched(this.coursesEditForm);
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
