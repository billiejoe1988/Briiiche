import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './layouts/dashboard/dashboard.component';
import { LoginComponent } from './layouts/auth/pages/login/login.component';
import { UsersComponent } from './layouts/dashboard/pages/users/users.component';
import { HomeComponent } from './layouts/dashboard/pages/home/home.component';
import { NotFoundModuleComponent } from './layouts/not-found-module/not-found-module.component';
import { CoursesComponent } from './layouts/dashboard/pages/courses/courses.component';

const routes: Routes = [
  {path: 'dashboard', component: DashboardComponent, 
        children: [
          {
            path: 'home', component: HomeComponent,
          },
          {
            path: 'users', component: UsersComponent,
          },
          {
            path: 'courses', component: CoursesComponent,
          },
          {
            path: '**', redirectTo:'home',
          },
        ]},
  {path: 'auth/login', component: LoginComponent},
  {path: '404', component: NotFoundModuleComponent},
  {path: '**', redirectTo: '/dashboard/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
