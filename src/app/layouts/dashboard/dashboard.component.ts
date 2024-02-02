import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentDateTime: string = '';
  showFiller = false;

  constructor(private router: Router) {}

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
    localStorage.removeItem('access-token');
    this.router.navigate(['auth', 'login'],
    );
  }
}
