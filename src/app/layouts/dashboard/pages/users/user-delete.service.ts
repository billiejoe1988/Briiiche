import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserDeleteService {
  private deleteUserSubject = new Subject<void>();

  deleteUser() {
    this.deleteUserSubject.next();
  }

  onDeleteUser() {
    return this.deleteUserSubject.asObservable();
  }
}
