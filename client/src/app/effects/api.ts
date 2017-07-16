import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class APIEffects {
  constructor(private action$: Actions, private http: Http) {}
  
  @Effect() login$ = this.action$
    .ofType('LOGIN')
    .map(action => JSON.stringify(action.payload))
    .switchMap(payload => this.http.post('/login', payload))
    .map(res => ({ type: 'LOGIN_SUCCESS', payload: res.json() }))
    .catch(() => Observable.of({ type: 'LOGIN_FAILED' }));
}