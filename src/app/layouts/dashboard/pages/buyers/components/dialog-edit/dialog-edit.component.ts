import { Component, Inject} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Buyer } from '../../model';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss']
})
export class DialogEditComponent {
  buyerFormEdit!: FormGroup;
  revealPassword =false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogEditComponent>,
    @Inject(MAT_DIALOG_DATA) private editingBuyer?: Buyer, 
  ) {

    this.buyerFormEdit = this.fb.group({
      firstName: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]), 
      lastName: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]),
      password: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]), 
      country: this.fb.control('', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]),
      email: this.fb.control('', [ Validators.required, Validators.email, Validators.maxLength(25), Validators.minLength(4)]),
      rol: this.fb.control('', [Validators.required]),
      comision:  this.fb.control('', [Validators.required]),
    });
    
    if (this.editingBuyer) {
      this.buyerFormEdit.patchValue(this.editingBuyer);
    }
  }
  onSave(): void {
      if (this.buyerFormEdit.valid) {
        this.dialogRef.close(this.buyerFormEdit.value);
      } else {
        this.markFormGroupTouched(this.buyerFormEdit);
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