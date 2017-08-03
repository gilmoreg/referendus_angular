import { Action } from '@ngrx/store';

export const ADD_REFERENCE = 'ADD_REFERENCE';
export const DELETE_REFERENCE = 'DELETE_REFERENCE';
export const SYNC_REFERENCES = 'SYNC_REFERENCES';
export const UPDATE_REFERENCE = 'UPDATE_REFERENCE';

const initialState = {
  references: [],
}

export function referencesReducer(state = initialState, action:Action) {
  switch (action.type) {
    case 'SYNC_REFERENCES_SUCCESS': {
      return { references: action.payload };
    }
    default: return state;
  }
}