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

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.uiReducer.loggedIn);
  }

  login() {
    this.store.dispatch({ type: LOGIN });
  }

  logout() {
    this.store.dispatch({ type: LOGOUT });
  }

}
