import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nav-auth',
  templateUrl: './nav-auth.component.html',
  styleUrls: ['./nav-auth.component.css']
})
export class NavAuthComponent implements OnInit {
  loggedIn$: Observable<boolean>;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.loggedIn$ = this.store.select('loggedIn');
  }

  login(event, username:string, password:string) {
    event.preventDefault();
    this.store.dispatch({ type: 'LOGIN', payload: { username, password }});
  }

  signup(event, username:string, password:string) {
    event.preventDefault();
    this.store.dispatch({ type: 'SIGNUP', payload: { username, password }})
  }

  signout(event) {
    event.preventDefault();
    this.store.dispatch({ type: 'SIGNOUT' });
  }
}
