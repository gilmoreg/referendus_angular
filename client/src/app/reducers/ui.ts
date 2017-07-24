import { Action } from '@ngrx/store';

export const CHANGE_TAB = 'CHANGE_TAB';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const SET_ACTIVE_SEARCH = 'SET_ACTIVE_SEARCH';
export const SET_FORMAT = 'SET_FORMAT';
export const SET_USER = 'SET_USER';

interface State {
  activeTab: number,
  activeSearch: string,
  format: {
    apa: boolean,
    chicago: boolean,
    mla: boolean,
  },
  loggedIn: boolean,
  user: string,
}

const initialState = {
  activeTab:<number> 0,
  activeSearch:<string> '',
  format: {
    apa:<boolean> false,
    chicago:<boolean> false,
    mla:<boolean> false,
  },
  loggedIn:<boolean> false,
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
    case 'SET_FORMAT': {
      const format = state.format;
      format.apa = false;
      format.chicago = false;
      format.mla = false;
      switch (action.payload) {
        case 'apa': format.apa = true; break;
        case 'chicago': format.chicago = true; break;
        case 'mla': format.mla = true; break;
        default: return state;
      }
      return Object.assign({}, state, { format });
    }
    case 'SET_USER': return Object.assign({}, state, { user: action.payload.user });
    default: return state;
  }
}