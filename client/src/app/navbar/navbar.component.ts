import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Store } from '@ngrx/store';
import { LOGIN, LOGOUT } from '../reducers/ui';
 
@Component({
  selector: 'app-navbar',
  // templateUrl: './navbar.component.html',
  template: `
  <nav class="navbar navbar-default">
    <div class="container-fluid">
      <!-- Brand and toggle get grouped for better mobile display -->
      <div class="navbar-header">
        <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar-collapse-1" aria-expanded="false">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </button>
        <a class="navbar-brand" href="#">Referendus</a>
      </div>

      <!-- Collect the nav links, forms, and other content for toggling -->
      <div class="collapse navbar-collapse" id="navbar-collapse-1">
        <app-nav-auth></app-nav-auth>
        <app-nav-controls *ngIf="loggedIn$ | async"></app-nav-controls>
      </div>
    </div>
  </nav>
  `,
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.loggedIn$ = this.store.select('loggedIn');
  }

  login() {
    this.store.dispatch({ type: LOGIN });
  }

  logout() {
    this.store.dispatch({ type: LOGOUT });
  }

}
