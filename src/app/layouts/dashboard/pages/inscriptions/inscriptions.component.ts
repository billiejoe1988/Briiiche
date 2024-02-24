import { Component } from '@angular/core';
import { InscriptionService } from './inscription.service';
import { Store, select } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { selectInscription } from './store/inscriptions.selectors';
import { selectInscriptionLoading } from './store/inscriptions.selectors';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { Inscription } from './models';
import { MatDialog } from '@angular/material/dialog';
import { InscriptDialogComponent } from './components/inscript-dialog/inscript-dialog.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrl: './inscriptions.component.scss'
})
export class InscriptionsComponent {

  inscriptions: Inscription[] = []; 
  isLoading$: Observable<boolean>;
  inscriptionsSubscripion?: Subscription;  

  destroyed$ = new Subject();

  constructor(private inscriptionsService: InscriptionService, private store: Store, private matDialog: MatDialog){
     this.store.select(selectInscription)
     .pipe(takeUntil(this.destroyed$))
     .subscribe({
      next: (inscriptions) =>{
        this.inscriptions = inscriptions;
      },
    });

    this.isLoading$ = this.store.select(selectInscriptionLoading);
    this.store.dispatch(InscriptionsActions.loadInscriptionss());
  }
  
  createInscription() : void{
    this.matDialog.open(InscriptDialogComponent);
  }

  ngOnDestroy(): void {
     this.destroyed$.next(true);
     this.destroyed$.complete();
  }

}
