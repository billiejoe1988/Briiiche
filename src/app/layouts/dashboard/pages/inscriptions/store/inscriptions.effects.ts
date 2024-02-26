import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import { InscriptionsActions } from './inscriptions.actions';
import { InscriptionService } from '../inscription.service';
import { UsersService } from '../../users/users.service';
import { CoursesService } from '../../courses/courses.service';

@Injectable()
export class InscriptionsEffects {

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
        this.usersService.getAllBuyers().pipe(
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
  constructor(
    private actions$: Actions,
    private inscriptionService: InscriptionService,
    private usersService: UsersService,
    private coursesService: CoursesService,
  ) {}
}
