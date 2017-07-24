import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class APIEffects {
  constructor(private action$: Actions, private http: Http) {}

  @Effect() check$ = this.action$
    .ofType('CHECK')
    .switchMap(payload => {
      return this.http.get('/check');
    })
    .map(res => {
      const response = res.json();
      if (response.message === 'Not logged in') return ({ type: 'LOGIN_FAILED' });
      return ({ type: 'LOGIN_SUCCESS' });
    })
    .catch(() => Observable.of({ type: 'LOGIN_FAILED' }));

  @Effect() login$ = this.action$
    .ofType('LOGIN')
    .map(action => action.payload)
    .switchMap(payload => this.http.post('/login', payload))
    .map(res => ({ type: 'LOGIN_SUCCESS', payload: res.json() }))
    .catch(() => Observable.of({ type: 'LOGIN_FAILED' }));

  @Effect() sync$ = this.action$
    .ofType('SYNC')
    .map(action => action.payload)
    .switchMap((format) => {
      return this.http.get(`/refs?format=${format}`);
    })
    .map(res => ({ type: 'SYNC_REFERENCES_SUCCESS', payload: res.json() }))

  @Effect() signup$ = this.action$
    .ofType('SIGNUP')
    .map(action => action.payload)
    .switchMap(payload => this.http.post('/signup', payload))
    .map(res => ({ type: 'LOGIN_SUCCESS', payload: res.json() }))
    .catch(() => Observable.of({ type: 'SIGNUP_FAILED' }));

  @Effect() logout$ = this.action$
    .ofType('LOGOUT')
    .switchMap(payload => this.http.get('/logout'))
    .map(res => ({ type: 'LOGOUT_COMPLETE' }));
}