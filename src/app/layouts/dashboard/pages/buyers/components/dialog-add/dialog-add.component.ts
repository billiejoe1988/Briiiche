import { Component, Inject, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../users/models';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})

export class DialogAddComponent {
  buyerForm: FormGroup;
  isFormInvalid = false;
  revealPassword =false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buyerForm = this.fb.group({
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
    if (this.buyerForm.invalid) {
      this.isFormInvalid = true;
      this.buyerForm.markAllAsTouched();
    } else {
      this.isFormInvalid = false;
      this.buyerForm.reset();
    }
  }

}
