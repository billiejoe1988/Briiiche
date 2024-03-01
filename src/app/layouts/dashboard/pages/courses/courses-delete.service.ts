import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesDeleteService {
  private coursesBuyerSubject = new Subject<void>();

  deleteBuyer() {
    this.coursesBuyerSubject.next();
  }

  onDeleteBuyer() {
    return this.coursesBuyerSubject.asObservable();
  }
}
