import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Inscription } from '../models';
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
  },
});


