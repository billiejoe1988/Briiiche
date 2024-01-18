import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users-form',
  templateUrl: './users-form.component.html',
  styleUrls: ['./users-form.component.scss']
})
export class UsersFormComponent {
  userForm: FormGroup;
  isFormInvalid = false;

  @Output()
  userSubmitted = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.userForm = this.fb.group({
      firstName: this.fb.control('', Validators.required),
      lastName: this.fb.control('', Validators.required),
      password: this.fb.control('', Validators.required),
      country: this.fb.control('', Validators.required),
      email: this.fb.control('', [Validators.required, Validators.email]),
      rol: this.fb.control('', Validators.required),
      comision: this.fb.control('', Validators.required),
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
    }
  }
}

