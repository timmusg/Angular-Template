import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromRouter from '@ngrx/router-store';

import * as fromUser from './user.reducer';
import * as routerReducer from './router.reducer';

export interface AppState {
  user: fromUser.UserState,
  router: fromRouter.RouterReducerState<routerReducer.RouterStateUrl>
}

export const reducers: ActionReducerMap<AppState> = {
  user: fromUser.reducer,
  router: fromRouter.routerReducer
}
