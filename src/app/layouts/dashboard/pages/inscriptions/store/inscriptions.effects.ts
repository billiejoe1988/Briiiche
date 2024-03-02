import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions'; 
import { Store } from '@ngrx/store';
import { InscriptionService } from '../inscription.service';
import { CoursesService } from '../../courses/courses.service';
import { BuyersService } from '../../buyers/buyers.service';

@Injectable()
export class InscriptionsEffects {

  constructor(
    private actions$: Actions,
    private store: Store,
    private inscriptionService: InscriptionService,
    private buyerService: BuyersService,
    private coursesService: CoursesService,
  ) {}

  loadInscriptionss$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadInscriptionss),
      concatMap(() =>
          this.inscriptionService.getInscription().pipe(
            map((data) => InscriptionsActions.loadInscriptionssSuccess({ data })),
            catchError(error => of(InscriptionsActions.loadInscriptionssFailure({ error }))))
      )
    );
  });
  
  loadBuyer$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadBuyers), 
      concatMap(() => 
        this.buyerService.getBuyers().pipe(
          map((resp) => InscriptionsActions.loadBuyersSuccess({ data: resp })),
          catchError((error) => of(InscriptionsActions.loadBuyersFailure({ error })))
        )
      )
    ); 
  });

  loadCourses$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.loadCourses),
      concatMap(() => { 
        return this.coursesService.getCourses().pipe(
          map((resp) => InscriptionsActions.loadCoursesSuccess({ data: resp })),
          catchError((error) => of(InscriptionsActions.loadCoursesFailure({ error })))
        );
      })
    );
  });

  createInscription$ = createEffect (() => {
     return this.actions$.pipe(
      ofType(InscriptionsActions.createInscription),
      concatMap((action) => {
        return this.inscriptionService.createInscription(action.data).pipe(
          map((resp) => InscriptionsActions.createInscriptionSuccess({data: resp})),
          catchError((error) => of(InscriptionsActions.createInscriptionFailure({error})))
        );
      })
     )
   });

   createInscriptionSuccess$ = createEffect (() => {
     return this.actions$.pipe(ofType(InscriptionsActions.createInscriptionSuccess),
       map(() => InscriptionsActions.loadInscriptionss())
     );
   });

  deleteInscription$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(InscriptionsActions.deleteInscription),
      concatMap((action) =>
        this.inscriptionService.deleteInscription(action.id).pipe(
          map(() => InscriptionsActions.deleteInscriptionSuccess({ id: action.id })),
          catchError(error => of(InscriptionsActions.deleteInscriptionFailure({ error })))
        )
      )
    );
  });
}
