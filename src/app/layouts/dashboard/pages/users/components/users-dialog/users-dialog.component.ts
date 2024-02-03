import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../models';

@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent { 
  userFormEdit: FormGroup;

  constructor (
    private fb: FormBuilder, 
    private dialogRef: MatDialogRef<UsersDialogComponent>, 
    @Inject(MAT_DIALOG_DATA) private editingUser?: User
  ) {
    this.userFormEdit = this.fb.group({
      firstName: [editingUser ? editingUser.firstName : '', [Validators.required]],
      lastName: [editingUser ? editingUser.lastName : '', [Validators.required]],
      password: [editingUser ? editingUser.password : '', [Validators.required]],
      country: [editingUser ? editingUser.country : '', [Validators.required]],
      email: [editingUser ? editingUser.email : '', [Validators.required, Validators.email]],
      rol: [editingUser ? editingUser.rol : '', [Validators.required]],
      comision: [editingUser ? editingUser.comision : '', [Validators.required]]
    });
  }

  onSave(): void {
    if (this.userFormEdit.valid) {
      this.dialogRef.close(this.userFormEdit.value);
    } else {
      this.markFormGroupTouched(this.userFormEdit);
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
