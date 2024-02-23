import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InscriptionsComponent } from './inscriptions.component';
import { EffectsModule } from '@ngrx/effects';
import { InscriptionsEffects } from './store/inscriptions.effects';

@NgModule({
  declarations: [
    InscriptionsComponent
  ],
  imports: [
    CommonModule,
    EffectsModule.forFeature([InscriptionsEffects]),
  ]
})
export class InscriptionsModule { }
