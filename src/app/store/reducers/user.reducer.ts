import * as fromUser from '../actions/user.action';

export interface UserState {
  data: any;
  loaded: boolean;
  loading: boolean;
}

export const initialState = {
  data: [],
  loaded: false,
  loading: false
}

export function reducer(
  state = initialState,
  action: fromUser.UserDataAction
): UserState {

  switch(action.type) {
    case fromUser.LOAD_USER_DATA: {
      return {
        loading: true,
        ...state
      }
    }

    case fromUser.LOAD_USER_DATA_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      }
    }

    case fromUser.LOAD_USER_DATA_SUCCESS: {
      return {
        ...state,
        loading: false,
        loaded: true
      }
    }
  }

  return state;
}

export const getUserDataLoading = (state: UserState) => state.loading;
export const getUserDataLoaded = (state: UserState) => state.loaded;
export const getUserData = (state: UserState) => state.data;
