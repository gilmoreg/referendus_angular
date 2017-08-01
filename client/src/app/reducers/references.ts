import { Action } from '@ngrx/store';

export const ADD_REFERENCE = 'ADD_REFERENCE';
export const DELETE_REFERENCE = 'DELETE_REFERENCE';
export const SYNC_REFERENCES = 'SYNC_REFERENCES';
export const UPDATE_REFERENCE = 'UPDATE_REFERENCE';

export function referencesReducer(state:Array<object> = [], action:Action) {
  switch (action.type) {
    case 'ADD_REFERENCE': return [...state, action.payload.reference];
    case 'DELETE_REFERENCE': {
      return state.filter((ref: any) => ref.id !== action.payload.id);
    }
    case 'SYNC_REFERENCES_SUCCESS': {
      return action.payload;
    }
    case 'UPDATE_REFERENCE': {
      return state.map((ref:any) => {
        if (ref.id === action.payload.id) {
          return action.payload.data;
        }
        return ref;
      });
    }
    default: return state;
  }
}