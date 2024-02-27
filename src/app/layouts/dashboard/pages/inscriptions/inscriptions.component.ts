import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from './store/inscriptions.actions';
import { selectInscription, selectInscriptionLoading } from './store/inscriptions.selectors';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { InscriptDialogComponent } from './components/inscript-dialog/inscript-dialog.component';
import { Inscription } from './models';
import { AlertsService } from '../../../../core/services/alerts.service';
import { InscriptEditComponent } from './components/inscript-edit/inscript-edit.component';

@Component({
  selector: 'app-inscriptions',
  templateUrl: './inscriptions.component.html',
  styleUrls: ['./inscriptions.component.scss']
})
export class InscriptionsComponent implements OnDestroy {

  inscriptions: Inscription[] = [];
  isLoading$: Observable<boolean>;
  private destroyed$ = new Subject<void>();

  displayedColumns: string[] = ['id', 'userId', 'lastName', 'courseId', 'courseName', 'actions'];

  constructor(private store: Store, private matDialog: MatDialog, private alertsService: AlertsService) {
    this.store.select(selectInscription)
      .pipe(takeUntil(this.destroyed$))
      .subscribe({
        next: (inscriptions) => {
          this.inscriptions = inscriptions;
        },
      });

    this.isLoading$ = this.store.select(selectInscriptionLoading);
    this.store.dispatch(InscriptionsActions.loadInscriptionss());
  }

  createInscription(): void {
    this.matDialog.open(InscriptDialogComponent);
  }

  onEdit(index: number): void {
    const inscriptionToEdit = this.inscriptions[index];
    const dialogRef = this.matDialog.open(InscriptEditComponent, {
      data: { inscription: inscriptionToEdit }
    });

    dialogRef.afterClosed().subscribe((updatedInscription: Inscription) => {
      if (updatedInscription) {
        this.inscriptions[index] = updatedInscription;
      }
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  deleteInscription(index: number): void {
    const id = String(this.inscriptions[index].id);
    this.store.dispatch(InscriptionsActions.deleteInscription({ id }));
    this.alertsService.showSuccess('Success', 'Inscription Delete successfully.');
  }
  
}
