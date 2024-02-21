import { featureName as authFeatureName, authReducer } from './auth/reducers';

export const appReducers = {
    [authFeatureName]: authReducer,
};