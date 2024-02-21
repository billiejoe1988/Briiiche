import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from './pages/users/models';
import { selectAuthUser } from '../../core/store/auth/selectors';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentDateTime: string = '';
  showFiller = false;
  authUser$: Observable<User | null>;

  constructor(private router: Router, private authService: AuthService, private store: Store) {
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
    this.router.navigate(['auth', 'login']);
    this.authService.logout();
  }
}