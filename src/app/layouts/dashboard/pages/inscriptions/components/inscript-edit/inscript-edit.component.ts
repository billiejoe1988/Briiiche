import { Component, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AlertsService } from '../../../../../../core/services/alerts.service';
import { Observable } from 'rxjs';
import { selectInscriptionBuyers, selectInscriptionCourses } from '../../store/inscriptions.selectors';
import { Courses } from '../../../courses/models';
import { User } from '../../../users/models';
import { InscriptionsActions} from '../../store/inscriptions.actions';
import { Inscription } from '../../models';

@Component({
  selector: 'app-inscript-edit-dialog',
  templateUrl: './inscript-edit.component.html',
  styleUrls: ['./inscript-edit.component.scss']
})
export class InscriptEditComponent {
  buyers$: Observable<User[]>;
  courses$: Observable<Courses[]>;
  inscriptionForm: FormGroup;
  inscription: Inscription;

  constructor(
    private store: Store,
    private formBuilder: FormBuilder,
    private matDialogRef: MatDialogRef<InscriptEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertsService: AlertsService,
    private dialog: MatDialog,
  ) {
    this.inscription = data.inscription;
    this.buyers$ = this.store.select(selectInscriptionBuyers);
    this.courses$ = this.store.select(selectInscriptionCourses);

    this.inscriptionForm = this.formBuilder.group({
      courseId: [data.inscription.courseId, Validators.required],
      userId: [data.inscription.userId, Validators.required],
    });
  }

 // onEdit() {
  //  if (this.inscription && this.inscription.id) {
   //   const updatedInscription: Partial<Inscription> = {
    //    id: this.inscription.id.toString(),
     //   ...this.inscription 
     // };
     // this.store.dispatch(InscriptionsActions.updateInscription({ id: updatedInscription.id, changes: updatedInscription }));
   // } else {
    //  console.error('No se pudo editar la inscripción: ID no válido');
    //}
}