import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms'; 
import { CoursesComponent } from './courses.component';
import { CoursesDialogComponent } from './components/courses-dialog/courses-dialog.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '../../../../shared/shared.module';
import { CoursesService } from './courses.service';
import { CoursesDetailComponent } from './pages/courses-detail/courses-detail.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [
    CoursesComponent,
    CoursesDialogComponent,
    CoursesDetailComponent,
  ],
  imports:[
    CommonModule, SharedModule, CoursesRoutingModule, ReactiveFormsModule, MatListModule
  ],
  providers: [CoursesService],
})
export class CoursesModule {
  constructor(private coursesService: CoursesService) {}
 }


