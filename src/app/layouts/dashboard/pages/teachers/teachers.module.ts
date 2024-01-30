import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TeachersComponent } from './teachers.component';



@NgModule({
  declarations: [
    TeachersComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TeachersComponent,
  ]
})
export class TeachersModule { }
