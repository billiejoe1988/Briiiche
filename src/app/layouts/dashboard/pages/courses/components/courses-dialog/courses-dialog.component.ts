import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'; 
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; // Importa Validators
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
      courseName: ['', Validators.required],
      createdAt: ['', [Validators.required, Validators.pattern('[0-9]{2}/[0-9]{2}/[0-9]{4}')]], 
    });
  
    if (editingCourses) {
      this.coursesForm.patchValue(editingCourses);
    }
  }
  

  onSave(): void{
    this.dialogRef.close(this.coursesForm.value);
  }
}

