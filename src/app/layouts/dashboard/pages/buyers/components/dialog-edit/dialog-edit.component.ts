import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserWithCoursesAndInscriptions } from '../../../users/models/complete';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent implements OnInit {
  buyerForm!: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: UserWithCoursesAndInscriptions, 
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.buyerForm = this.formBuilder.group({
      firstName: [this.data.firstName, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      lastName: [this.data.lastName, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      country: [this.data.country, [Validators.required, Validators.minLength(4), Validators.maxLength(15)]],
      email: [this.data.email, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(25)]],
    });
  }

  onSave(): void {
    if (this.buyerForm.valid) {
      const updatedUserData = {
        ...this.data,
        firstName: this.buyerForm.value.firstName,
        lastName: this.buyerForm.value.lastName,
        country: this.buyerForm.value.country,
        email: this.buyerForm.value.email
      };
      this.dialogRef.close(updatedUserData);
    }
  }
  
  displayCourses(): string {
    return this.data.courses.map(course => course.courseName).join(', ');
  }
}
