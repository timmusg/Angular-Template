import { Action } from '@ngrx/store'

// Load User Data
export const LOAD_USER_DATA = '[User] Load User Data';
export const LOAD_USER_DATA_FAIL = '[User] Load User Data Fail';
export const LOAD_USER_DATA_SUCCESS = '[User] Load User Data Success';

export class LoadUserData implements Action {
  readonly type = LOAD_USER_DATA;
  constructor(public payload: any) {}
}

export class LoadUserDataFail implements Action {
  readonly type = LOAD_USER_DATA_FAIL;
  constructor(public payload: any) {}
}

export class LoadUserDataSuccess implements Action {
  readonly type = LOAD_USER_DATA_SUCCESS;
  constructor(public payload: any) {}
}

// action types
export type UserDataAction = LoadUserData | LoadUserDataFail | LoadUserDataSuccess;
