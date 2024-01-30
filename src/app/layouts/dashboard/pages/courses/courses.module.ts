import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesComponent } from './courses.component';
import { ProductDialogComponent } from './components/product-dialog/product-dialog.component';



@NgModule({
  declarations: [
    CoursesComponent,
    ProductDialogComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [CoursesComponent],
})
export class CoursesModule { }
