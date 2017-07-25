import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { LOGIN, LOGOUT } from '../reducers/ui';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  apaFormat$: Observable<boolean>;
  chicagoFormat$: Observable<boolean>;
  mlaFormat$: Observable<boolean>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.uiReducer.loggedIn);
    this.apaFormat$ = this.store.select(state => state.uiReducer.format.apa);
    this.chicagoFormat$ = this.store.select(state => state.uiReducer.format.chicago);
    this.mlaFormat$ = this.store.select(state => state.uiReducer.format.mla);
  }

  login(event, username:string, password:string) {
    event.preventDefault();
    this.store.dispatch({ type: 'LOGIN', payload: { username, password }});
  }

  logout() {
    this.store.dispatch({ type: LOGOUT });
  }

  signup(event, username:string, password:string) {
    event.preventDefault();
    this.store.dispatch({ type: 'SIGNUP', payload: { username, password }})
  }

  signout(event) {
    event.preventDefault();
    this.store.dispatch({ type: 'LOGOUT' });
  }

  setAPAFormat() {
    this.store.dispatch({ type: 'SET_FORMAT', payload: 'apa' });
  }

  setChicagoFormat() {
    this.store.dispatch({ type: 'SET_FORMAT', payload: 'chicago' });
  }

  setMLAFormat() {
    this.store.dispatch({ type: 'SET_FORMAT', payload: 'mla' });
  }
}
