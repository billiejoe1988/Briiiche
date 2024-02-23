import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';


@Injectable()
export class InscriptionsEffects {

  loadInscriptionss$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscriptionsActions.loadInscriptionss),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => InscriptionsActions.loadInscriptionssSuccess({ data })),
          catchError(error => of(InscriptionsActions.loadInscriptionssFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions) {}
}
