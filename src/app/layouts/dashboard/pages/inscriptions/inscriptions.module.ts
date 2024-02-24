import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';
import { InscriptionsRoutingModule } from './inscriptions-routing.module';
import { StoreModule } from '@ngrx/store';
import { inscriptionsFeature } from './store/inscriptions.reducer';
import { InscriptDialogComponent } from './components/inscript-dialog/inscript-dialog.component';
import { SharedModule } from '../../../../shared/shared.module';
import { UsersModule } from '../users/users.module';
import { CoursesService } from '../courses/courses.service';
import { CoursesModule } from '../courses/courses.module';

@NgModule({
  declarations: [
    InscriptionsComponent,
    InscriptDialogComponent
  ],
  imports: [
    CommonModule,
    InscriptionsRoutingModule,
    SharedModule,
    StoreModule.forFeature(inscriptionsFeature),
    EffectsModule.forFeature([InscriptionsEffects]),
    UsersModule,
    CoursesModule
  ]
})
export class InscriptionsModule { }
