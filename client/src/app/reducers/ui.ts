import { Action } from '@ngrx/store';

export const CHANGE_TAB = 'CHANGE_TAB';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ACTIVE_SEARCH = 'SET_ACTIVE_SEARCH';
export const SET_FORMAT = 'SET_FORMAT';
export const SET_USER = 'SET_USER';

const initialState = {
  activeTab:<number> 0,
  activeSearch:<string> '',
  format:<string> '',
  loggedIn:<boolean> false,
  user:<string> '',
}

export function uiReducer(state:object = initialState, action:Action) {
  switch (action.type) {
    case 'CHANGE_TAB': return Object.assign({}, state, { activeTab: action.payload.tab });
    case 'LOGIN_SUCCESS': return Object.assign({}, state, { loggedIn: true });
    case 'LOGOUT_COMPLETE': return Object.assign({}, state, { loggedIn: false });
    case 'SET_ACTIVE_SEARCH': return Object.assign({}, state, { currentSearch: action.payload.search });
    case 'SET_FORMAT': return Object.assign({}, state, { format: action.payload.format });
    case 'SET_USER': return Object.assign({}, state, { user: action.payload.user });
    default: return state;
  }
}