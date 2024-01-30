import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseComponent } from './course.component';



@NgModule({
  declarations: [
    CourseComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    CourseComponent,
  ]
})
export class CourseModule { }
