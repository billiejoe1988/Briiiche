import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentDateTime: string = '';
  showFiller = false;

  constructor(private router: Router, private authService: AuthService) {}

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
    this.authService.logout()
    this.router.navigate(['auth', 'login'],
    );
  }
}
