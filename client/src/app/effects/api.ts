import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class APIEffects {
  constructor(private action$: Actions, private http: Http) {}
  
  @Effect() login$ = this.action$
    .ofType('LOGIN')
    .map(action => action.payload)
    .switchMap(payload => this.http.post('/login', payload))
    .map(res => ({ type: 'LOGIN_SUCCESS', payload: res.json() }))
    .catch(() => Observable.of({ type: 'LOGIN_FAILED' }));

  @Effect() signup$ = this.action$
    .ofType('SIGNUP')
    .map(action => action.payload)
    .switchMap(payload => this.http.post('/signup', payload))
    .map(res => ({ type: 'SIGNUP_SUCCESS', payload: res.json() }))
    .catch(() => Observable.of({ type: 'SIGNUP_FAILED' }));

  @Effect() logout$ = this.action$
    .ofType('SIGNOUT')
    .switchMap(payload => this.http.get('/signout'))
    .map(res => ({ type: 'LOGOUT' }));
    // .catch(() => Observable.of({ type: 'LOGOUT_FAILED' }));
}