import { createActionGroup, emptyProps, props } from '@ngrx/store';

export const InscriptionsActions = createActionGroup({
  source: 'Inscriptions',
  events: {
    'Load Inscriptionss': emptyProps(),
    'Load Inscriptionss Success': props<{ data: unknown }>(),
    'Load Inscriptionss Failure': props<{ error: unknown }>(),
  }
});
