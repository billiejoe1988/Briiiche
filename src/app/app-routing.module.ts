import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './layouts/auth/pages/login/login.component';
import { NotFoundModuleComponent } from './layouts/not-found-module/not-found-module.component';
import { DashboardRoutingModule } from './layouts/dashboard/dashboard-routing.module';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: '404', component: NotFoundModuleComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/404' }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    DashboardRoutingModule, 
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
