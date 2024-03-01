import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuyerDeleteService {
  private deleteBuyerSubject = new Subject<void>();

  deleteBuyer() {
    this.deleteBuyerSubject.next();
  }

  onDeleteBuyer() {
    return this.deleteBuyerSubject.asObservable();
  }
}
