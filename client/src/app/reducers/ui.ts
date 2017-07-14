import { Action } from '@ngrx/store';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const initialState = {
  format:<string> '',
  user:<string> '',
  activeTab:<number> 0,
  currentSearch:<string> '',
  loggedIn:<boolean> false,
}

export function uiReducer(state:object = initialState, action:Action) {
  switch (action.type) {
    case 'LOGIN': return Object.assign({}, state, { loggedIn: true });
    case 'LOGOUT': return Object.assign({}, state, { loggedIn: false });
    default: return state;
  }
}