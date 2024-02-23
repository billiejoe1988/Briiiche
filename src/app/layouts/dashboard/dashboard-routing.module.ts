import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailComponent } from './pages/users/pages/user-details/user-details.component';
import { adminGuard } from '../../core/guards/admin.guard';
import { InscriptionsModule } from './pages/inscriptions/inscriptions.module';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        canActivate: [adminGuard],
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) 
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'inscriptions',
        loadChildren: () => import('./pages/inscriptions/inscriptions.module').then(m => m.InscriptionsModule) 
      },
      {
        path: 'courses',
        loadChildren: () => import('./pages/courses/courses.module').then(m => m.CoursesModule) 
      },
      {
        path: 'users/:id',
        component: UserDetailComponent,
      },
            {
        path: '**',
        redirectTo: 'home',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
