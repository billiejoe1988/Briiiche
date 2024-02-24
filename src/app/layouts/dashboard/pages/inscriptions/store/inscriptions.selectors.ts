import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromInscriptions from './inscriptions.reducer';

export const selectInscriptionsState = createFeatureSelector<fromInscriptions.State>(
  fromInscriptions.inscriptionsFeatureKey
);

export const selectInscription = createSelector (
  selectInscriptionsState, (state) => state.inscriptions
);

export const selectInscriptionLoading = createSelector (
  selectInscriptionsState, (state) => state.loading
);

export const selectInscriptionLoadingBuyer = createSelector (
  selectInscriptionsState, (state) => state.loadingBuyers
);

export const selectInscriptionBuyers = createSelector (
  selectInscriptionsState, (state) => state.buyers
)

export const selectInscriptionCourses = createSelector(
  selectInscriptionsState, (state) => state.courses
);
