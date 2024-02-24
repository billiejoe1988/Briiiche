import { createFeature, createReducer, on } from '@ngrx/store';
import { InscriptionsActions } from './inscriptions.actions';
import { Inscription } from '../models';
import { User } from '../../users/models';
import { Courses } from '../../courses/models';

export const inscriptionsFeatureKey = 'inscriptions';

export interface State {
  inscriptions: Inscription[];
  buyers: User[];
  courses: Courses[];
  loading:boolean;
  error: unknown;
  loadingBuyers: boolean;
  loadingCourses: boolean;
}

export const initialState: State = {
  inscriptions: [],
  buyers: [],
  courses:[],
  loading: false,
  loadingCourses:false,
  loadingBuyers: false,
  error: null,
};

export const reducer = createReducer(
  initialState,
  on(InscriptionsActions.loadInscriptionss, state => ({...state, loading: true })),
  on(InscriptionsActions.loadInscriptionssSuccess, (state, action) => ({...state, loading: false, inscriptions: action.data })),
  on(InscriptionsActions.loadInscriptionssFailure, (state, action) => ({...state, loading: false, error: action.error })),
  on(InscriptionsActions.loadBuyers, (state) => { return {...state, loadingBuyers: true} }),
  on(InscriptionsActions.loadBuyersSuccess, (state, action) => { return {...state, loadingBuyers: false, buyers: action.data} }),
  on(InscriptionsActions.loadCoursesSuccess, (state, action) => { return {...state, loadingCourses: false, courses: action.data} }),
);

export const inscriptionsFeature = createFeature({
  name: inscriptionsFeatureKey,
  reducer,
});

