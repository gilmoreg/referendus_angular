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
  defaultUsername = "demo";
  defaultPassword = "demo";

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.uiReducer.loggedIn);
  }

  onSubmit(submittedForm) {
    if (submittedForm.invalid) {
      return;
    }
    this.store.dispatch({
      type: 'LOGIN', payload: submittedForm.value,
    });
  }

  login(event, username:string, password:string) {
    
    this.store.dispatch({ type: 'LOGIN', payload: { username, password }});
  }

  signup(event, username:string, password:string) {
    event.preventDefault();
    this.store.dispatch({ type: 'SIGNUP', payload: { username, password }})
  }

  signout(event) {
    event.preventDefault();
    this.store.dispatch({ type: 'LOGOUT' });
  }
}
