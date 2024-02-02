import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatNativeDateModule } from '@angular/material/core';
import { AlertsService } from './core/services/alerts.service';
import { UsersService } from './layouts/dashboard/pages/users/users.service';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
  ],
  providers: [
    AlertsService,
    UsersService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
