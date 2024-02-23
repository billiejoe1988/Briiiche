import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {

}

export const initialState: State = {

};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptionss, state => state),
  on(InscriptionsActions.loadInscriptionssSuccess, (state, action) => state),
  on(InscriptionsActions.loadInscriptionssFailure, (state, action) => state),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

