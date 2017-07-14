import { Action } from '@ngrx/store';

export const ADD_REFERENCE = 'ADD_REFERENCE';

export function referencesReducer(state:Array<object> = [], action:Action) {
  switch (action.type) {
    case 'ADD_REFERENCE': return [...state, action.payload.reference];
    default: return state;
  }
}