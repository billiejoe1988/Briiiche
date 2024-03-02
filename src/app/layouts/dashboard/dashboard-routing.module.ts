import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UserDetailComponent } from './pages/users/pages/user-details/user-details.component';
import { userGuard } from '../../core/guards/user.guard';
import { BuyersComponent } from './pages/buyers/buyers.component';
import { BuyersDetailComponent } from './pages/buyers/pages/buyers-detail/buyers-detail.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        canActivate: [userGuard],
        loadChildren: () => import('./pages/users/users.module').then(m => m.UsersModule) 
      },
      {
        path: 'buyers',
        component: BuyersComponent,
      },
      {
        path: 'buyers/:id',
        component: BuyersDetailComponent,
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
