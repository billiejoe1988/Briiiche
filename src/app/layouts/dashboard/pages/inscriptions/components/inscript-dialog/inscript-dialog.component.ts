import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscriptionsActions } from '../../store/inscriptions.actions';
import { Observable } from 'rxjs';
import { selectInscriptionBuyers, selectInscriptionLoadingBuyer, selectInscriptionCourses } from '../../store/inscriptions.selectors';
import { User } from '../../../users/models';
import { Courses } from '../../../courses/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AlertsService } from '../../../../../../core/services/alerts.service'; 

@Component({
  selector: 'app-inscript-dialog',
  templateUrl: './inscript-dialog.component.html',
  styleUrls: ['./inscript-dialog.component.scss']
})
 
export class InscriptDialogComponent {
  isLoadingBuyers$: Observable<boolean>;
  buyers$: Observable<User[]>;
  courses$: Observable<Courses[]>;
  inscriptionForm: FormGroup;

  constructor(private store: Store, 
              private formBuilder: FormBuilder, 
              private matDialogRef: MatDialogRef<InscriptDialogComponent>,
              private alertsService: AlertsService 
            ) {

    this.inscriptionForm = this.formBuilder.group({
      courseId: this.formBuilder.control('', [Validators.required]),
      userId: this.formBuilder.control('', [Validators.required]),
    })

    this.isLoadingBuyers$ = this.store.select(selectInscriptionLoadingBuyer);
    this.store.dispatch(InscriptionsActions.loadBuyers());
    this.store.dispatch(InscriptionsActions.loadCourses());
    this.buyers$ = this.store.select(selectInscriptionBuyers);
    this.courses$ = this.store.select(selectInscriptionCourses);
  }

  onSubmit(): void {
    if(this.inscriptionForm.invalid){
      this.inscriptionForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscriptionsActions.createInscription ({ data: this.inscriptionForm.value })
      );
      this.matDialogRef.close();
      this.alertsService.showSuccess('Success', 'Inscription created successfully.');
    }
  }
}