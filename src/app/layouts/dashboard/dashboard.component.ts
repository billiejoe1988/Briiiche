import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  currentDateTime: string = '';
  showFiller = false;

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
}
