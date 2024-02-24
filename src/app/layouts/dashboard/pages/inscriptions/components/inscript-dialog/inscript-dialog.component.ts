import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { Observable } from 'rxjs';
import { selectInscriptionBuyers, selectInscriptionLoadingBuyer, selectInscriptionCourses } from '../../store/inscriptions.selectors';
import { User } from '../../../users/models';
import { Courses } from '../../../courses/models';

@Component({
  selector: 'app-inscript-dialog',
  templateUrl: './inscript-dialog.component.html',
  styleUrls: ['./inscript-dialog.component.scss']
})
 
export class InscriptDialogComponent {
  isLoadingBuyers$: Observable<boolean>;
  buyers$: Observable<User[]>;
  courses$: Observable<Courses[]>;

  constructor (private store: Store){

    this.isLoadingBuyers$ = this.store.select(selectInscriptionLoadingBuyer);
    this.store.dispatch(InscriptionsActions.loadBuyers());
    this.store.dispatch(InscriptionsActions.loadCourses());
    this.buyers$ = this.store.select(selectInscriptionBuyers);
    this.courses$ = this.store.select(selectInscriptionCourses);
  }
}
