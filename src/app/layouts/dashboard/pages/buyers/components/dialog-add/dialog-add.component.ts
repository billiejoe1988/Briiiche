import { Component, Inject } from '@angular/core';
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

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buyerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]], 
      lastName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]],
      country: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(25), Validators.minLength(4)]],
      rol: ['', [Validators.required]],
      comision:  ['', [Validators.required]],
    });
  }

  onSave(): void {
    if (this.buyerForm.valid) {
      const newBuyer: User = this.buyerForm.value;
      this.dialogRef.close(newBuyer);
    } else {
      this.markFormGroupTouched(this.buyerForm);
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
