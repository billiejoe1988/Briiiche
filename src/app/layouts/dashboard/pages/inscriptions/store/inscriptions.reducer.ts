import { createFeature, createReducer, on, Action } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { Inscription } from '../models';
import { Courses } from '../../courses/models';
import { Buyer } from '../../buyers/model';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  inscriptions: Inscription[];
  buyers: Buyer[];
  courses: Courses[];
  loading: boolean;
  error: unknown;
  loadingBuyers: boolean;
  loadingCourses: boolean;
}

export const initialState: State = {
  inscriptions: [],
  buyers: [],
  courses: [],
  loading: false,
  loadingCourses: false,
  loadingBuyers: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptionss, state => ({ ...state, loading: true })),
  on(InscriptionsActions.loadInscriptionssSuccess, (state, action) => ({ ...state, loading: false, inscriptions: action.data })),
  on(InscriptionsActions.loadInscriptionssFailure, (state, action) => ({ ...state, loading: false, error: action.error })),
  on(InscriptionsActions.loadBuyers, (state) => ({ ...state, loadingBuyers: true })),
  on(InscriptionsActions.loadBuyersSuccess, (state, action) => ({ ...state, loadingBuyers: false, buyers: action.data })),
  on(InscriptionsActions.loadCoursesSuccess, (state, action) => ({ ...state, loadingCourses: false, courses: action.data })),
  on(InscriptionsActions.deleteInscriptionSuccess, (state, action) => ({ ...state, inscriptions: state.inscriptions.filter(inscription => inscription.id !== action.id) })),
  on(InscriptionsActions.updateInscription, (state, { id, changes }) => ({
    ...state,
    inscriptions: state.inscriptions.map(inscription =>
      inscription.id === id ? { ...inscription, ...changes } : inscription
    )
  }))
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});
