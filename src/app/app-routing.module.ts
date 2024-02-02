import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/auth/pages/login/login.component';
import { NotFoundModuleComponent } from './layouts/not-found-module/not-found-module.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: '404', component: NotFoundModuleComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { 
    path: 'dashboard', 
    loadChildren: () => import('./layouts/dashboard/dashboard.module').then(m => m.DashboardModule) 
  },
  { path: '**', redirectTo: '/404' }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
