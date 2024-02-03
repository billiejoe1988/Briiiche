import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Courses } from '../../models';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'] 
})
export class CoursesDialogComponent { 
  coursesForm: FormGroup;

  constructor (
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<CoursesDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private editingCourses?: Courses
  ) {
    this.coursesForm = this.fb.group({
      courseName: [editingCourses ? editingCourses.courseName : '', [Validators.required]],
      createdAt: [editingCourses ? editingCourses.createdAt : '', [Validators.required]]
    });
    
    if (editingCourses) {
      this.coursesForm.patchValue(editingCourses);
    }
  }

  onSave(): void{
    if (this.coursesForm.valid) {
      this.dialogRef.close(this.coursesForm.value);
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
