import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { CreateInscriptionData, Inscription } from '../models';
import { User } from '../../users/models';
import { Courses } from '../../courses/models';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptionss': emptyProps(),
    'Load Inscriptionss Success': props<{ data: Inscription[] }>(),
    'Load Inscriptionss Failure': props<{ error: unknown }>(),
    'Load Buyers': emptyProps(),
    'Load Buyers Success': props<{ data: User[] }>(), 
    'Load Buyers Failure': props<{ error: unknown }>(), 
    'Load Courses': emptyProps(),
    'Load Courses Success': props<{ data: Courses[] }>(), 
    'Load Courses Failure': props<{ error: unknown }>(), 
    'Create Inscription': props<{ data: CreateInscriptionData }> (),
    'Create Inscription Success': props<{ data: Inscription }> (),
    'Create Inscription Failure': props<{ error: unknown }> (),
    'Delete Inscription': props<{id:string}>(),
    'Delete Inscription Success': props<{id:string}>(),
    'Delete Inscription Failure': props<{error: unknown}>(),
  },
});


