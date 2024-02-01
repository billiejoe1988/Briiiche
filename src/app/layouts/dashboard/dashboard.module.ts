import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import { UsersModule } from './pages/users/users.module';
import { CoursesModule } from './pages/courses/courses.module';
import {MatListModule} from '@angular/material/list';
import { HomeModule } from './pages/home/home.module';
import { RouterModule, RouterOutlet } from '@angular/router';


@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule, MatSidenavModule, MatButtonModule, MatToolbarModule, MatIconModule, 
    UsersModule, CoursesModule, MatListModule, HomeModule, RouterOutlet, RouterModule
  ],
  exports: [DashboardComponent],
})
export class DashboardModule { }
