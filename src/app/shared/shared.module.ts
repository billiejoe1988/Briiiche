import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullNamePipe } from './pipeFullName';
import { UppercaseTitlesDirective } from './uppercasetitles.directive';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { ValidationErrorsPipe } from './validation-errors.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    FullNamePipe, 
    UppercaseTitlesDirective, ValidationErrorsPipe,
  ],
  imports: [CommonModule],
  exports: [
    FullNamePipe,
    UppercaseTitlesDirective, 
    MatTableModule, 
    MatButtonModule, 
    MatIconModule, 
    MatProgressSpinnerModule, 
    MatDialogModule, 
    MatInputModule, 
    MatFormFieldModule, 
    ReactiveFormsModule, 
    MatDatepickerModule,
    MatCardModule,
    ValidationErrorsPipe,
    MatPaginatorModule,
    MatSelectModule,
  ],
})
export class SharedModule {}

