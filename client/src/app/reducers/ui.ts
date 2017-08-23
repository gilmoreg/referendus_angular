import { Action } from '@ngrx/store';

export const CHANGE_TAB = 'CHANGE_TAB';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ACTIVE_SEARCH = 'SET_ACTIVE_SEARCH';
export const SET_FORMAT = 'SET_FORMAT';
export const SET_MODAL_PROPS = 'SET_MODAL_PROPS';
export const SET_USER = 'SET_USER';

interface State {
  activeTab: string,
  activeSearch: string,
  format: string,
  loggedIn: boolean,
  modal: {
    type: string,
    mode: string,
  }
  user: string,
}

const initialState = {
  activeTab:<string> 'all',
  activeSearch:<string> '',
  format: '',
  loggedIn:<boolean> false,
  modal: {
    type: '',
    mode: '',
  },
  user:<string> '',
}

export function uiReducer(state:State = initialState, action:Action) {
  switch (action.type) {
    case 'CHANGE_TAB': return Object.assign({}, state, { activeTab: action.payload.tab });
    case 'LOGIN_SUCCESS': return Object.assign({}, state, { loggedIn: true });
    case 'LOGIN_FAILED':
    case 'SIGNUP_FAILED':
    case 'LOGOUT_COMPLETE': return Object.assign({}, state, { loggedIn: false });
    case 'SET_ACTIVE_SEARCH': return Object.assign({}, state, { currentSearch: action.payload.search });
    case 'SET_FORMAT': return Object.assign({}, state, { format: action.payload });
    case 'SET_MODAL_PROPS': return Object.assign({}, state, { modal: action.payload.modal });
    case 'SET_USER': return Object.assign({}, state, { user: action.payload.user });
    default: return state;
  }
}