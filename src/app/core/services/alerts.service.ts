import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import Swal, { SweetAlertOptions } from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class AlertsService {
  private notification$ = new Subject<SweetAlertOptions>();

  constructor() {
    this.notification$.subscribe(options => {
      Swal.fire(options);
    });
  }

  showAlert(options: SweetAlertOptions): Promise<any> {
    return new Promise(resolve => {
      this.notification$.next(options);
      Swal.fire(options).then(result => {
        resolve(result);
      });
    });
  }

  showSuccess(title: string, message: string): void {
    this.notification$.next({
      icon: 'success',
      title,
      text: message,
    });
  }

  showError(title: string, message: string): void {
    this.notification$.next({
      icon: 'error',
      title,
      text: message,
    });
  }
}
