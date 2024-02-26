import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './pages/users/models';
import { selectAuthUser } from '../../core/store/auth/selectors';
import { AlertsService } from '../../core/services/alerts.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentDateTime: string = '';
  showFiller = false;
  authUser$: Observable<User | null>;

  constructor(private router: Router, private authService: AuthService, private store: Store, private alertsService: AlertsService) {
    this.authUser$ = this.store.select(selectAuthUser);
  }

  ngOnInit() {
    setInterval(() => {
      this.updateCurrentDateTime();
    }, 1000);

    this.updateCurrentDateTime();
  }

  private updateCurrentDateTime() {
    const now = new Date();
    this.currentDateTime = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
  }

  logout(): void {
    this.alertsService.showAlert({
      title: 'Logout Confirmation',
      text: 'Are you sure you want to logout?',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, logout',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['auth', 'login']);
        this.authService.logout();
        this.alertsService.showSuccess('Success', 'Logged out successfully.');
      }
    });
  }
}
