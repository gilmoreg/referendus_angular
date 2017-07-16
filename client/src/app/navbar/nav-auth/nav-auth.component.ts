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
    console.log('login', username, password);
    // this.store.dispatch({ type: 'LOGIN', payload: f.value });
  }

  signup(event) {
    event.preventDefault();
    console.log('signup', event);
  }

  signout(event) {
    event.preventDefault();
    console.log('signout', event);
  }

}
