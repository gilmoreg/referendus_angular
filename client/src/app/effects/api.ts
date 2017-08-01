import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

interface AuthResponse {
  message: string,
  user: string,
}

@Injectable()
export class APIEffects {
  constructor(private action$: Actions, private http: HttpClient) {}

  @Effect() check$ = this.action$
    .ofType('CHECK')
    .switchMap(payload => {
      return this.http.get<AuthResponse>(`${environment.apiURL}/check`);
    })
    .map(res => {
      if (res.message === 'Not logged in') return ({ type: 'LOGIN_FAILED' });
      return ({ type: 'LOGIN_SUCCESS' });
    })
    .catch(() => Observable.of({ type: 'LOGIN_FAILED' }));

  @Effect() login$ = this.action$
    .ofType('LOGIN')
    .map(action => action.payload)
    .switchMap(payload => this.http.post<AuthResponse>(`${environment.apiURL}/login`, payload))
    .map(res => ({ type: 'LOGIN_SUCCESS', payload: res }))
    .catch(() => Observable.of({ type: 'LOGIN_FAILED' }));

  @Effect() sync$ = this.action$
    .ofType('SYNC')
    .map(action => action.payload)
    .switchMap((format) => {
      return this.http.get<AuthResponse>(`${environment.apiURL}/refs?format=${format}`);
    })
    .map(res => ({ type: 'SYNC_REFERENCES_SUCCESS', payload: res }))

  @Effect() signup$ = this.action$
    .ofType('SIGNUP')
    .map(action => action.payload)
    .switchMap(payload => this.http.post<AuthResponse>(`${environment.apiURL}/signup`, payload))
    .map(res => ({ type: 'LOGIN_SUCCESS', payload: res }))
    .catch(() => Observable.of({ type: 'SIGNUP_FAILED' }));

  @Effect() logout$ = this.action$
    .ofType('LOGOUT')
    .switchMap(payload => this.http.get<AuthResponse>(`${environment.apiURL}/logout`))
    .map(res => ({ type: 'LOGOUT_COMPLETE' }));
}