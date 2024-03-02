import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-users-form-dialog',
  templateUrl: './add-users-form-dialog.component.html',
  styleUrl: './add-users-form-dialog.component.scss'
})
export class AddUsersFormDialogComponent {
  userForm: FormGroup;
  isFormInvalid = false;
  revealPassword =false;

  @Output()
  userSubmitted = new EventEmitter();

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<AddUsersFormDialogComponent>) {
    this.userForm = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]), 
      lastName: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]),
      password: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]), 
      country: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]),
      email: this.fb.control('', [ Validators.required, Validators.email, Validators.maxLength(25), Validators.minLength(4)]),
      rol: this.fb.control('', [Validators.required]),
      comision:  this.fb.control('', [Validators.required]),
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.isFormInvalid = true;
      this.userForm.markAllAsTouched();
    } else {
      this.isFormInvalid = false;
      this.userSubmitted.emit(this.userForm.value);
      this.userForm.reset();
      this.dialogRef.close(this.userForm.value);
    }
  }
}
