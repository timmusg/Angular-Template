import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

import * as fromUser from '../reducers/user.reducer';
import * as routerReducer from '../reducers/router.reducer';

import { AppState } from '../reducers';

// App State
export const getAppState = createFeatureSelector('app')

// User State
export const getUserState = createSelector(getAppState, (state: AppState) => state.user)

export const getUserData = createSelector(getUserState, fromUser.getUserData);
export const getUserDataLoaded = createSelector(getUserState, fromUser.getUserDataLoaded);
export const getUserDataLoading = createSelector(getUserState, fromUser.getUserDataLoading);

//Router State
export const getRouterState = createSelector(getAppState, (state: AppState) => state.router)
