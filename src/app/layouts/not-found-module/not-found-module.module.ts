import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundModuleComponent } from './not-found-module.component';



@NgModule({
  declarations: [
    NotFoundModuleComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NotFoundModuleComponent]
})
export class NotFoundModuleModule { }
