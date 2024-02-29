import { Component, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Buyer } from '../../model';
import { BuyersService } from '../../buyers.service';

@Component({
  selector: 'app-dialog-add',
  templateUrl: './dialog-add.component.html',
  styleUrls: ['./dialog-add.component.scss']
})
export class DialogAddComponent {
  buyerForm: FormGroup;
  isFormInvalid = false;
  revealPassword = false;
  @Output() buyerAdded: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private fb: FormBuilder,
    private buyersService: BuyersService,
    private dialogRef: MatDialogRef<DialogAddComponent>
  ) {
    this.buyerForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]],
      lastName: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]],
      country: ['', [Validators.required, Validators.maxLength(15), Validators.minLength(4)]],
      email: ['', [Validators.required, Validators.email, Validators.maxLength(25), Validators.minLength(4)]],
      rol: ['', [Validators.required]],
      comision: ['', [Validators.required]],
    });
  }

  onSubmitAndClose(): void {
    if (this.buyerForm.valid) {
      const buyerData = this.buyerForm.value as Buyer;
      this.buyersService.createBuyer(buyerData).subscribe(() => {
        this.buyerAdded.emit(); // Emitir el evento cuando se añade el comprador
        this.dialogRef.close();
      });
    } else {
      this.isFormInvalid = true;
      this.buyerForm.markAllAsTouched();
    }
  }
}