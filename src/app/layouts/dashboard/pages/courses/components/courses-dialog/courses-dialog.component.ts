import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Courses } from '../../models';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './courses-dialog.component.html',
  styleUrls: ['./courses-dialog.component.scss'] 
})
export class CoursesDialogComponent { 
  coursesForm: FormGroup;
  dateCreatorPicker: any;

  constructor (private fb: FormBuilder, private dialogRef: MatDialogRef<CoursesDialogComponent>, @Inject(MAT_DIALOG_DATA) private editingCourses?: Courses,) {
    this.coursesForm = this.fb.group({
      courseName: this.fb.control(''),
      createdAt: this.fb.control(''),
    });

    if (editingCourses) {
      this.coursesForm.patchValue(editingCourses);
    }
  }

  onSave(): void{
    this.dialogRef.close(this.coursesForm.value);
  }
}

