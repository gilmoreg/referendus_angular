import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: 'Referendus';
  loggedIn$: Observable<boolean>;
  isLoggedIn: boolean;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.uiReducer.loggedIn);

    // Sync references if loggedIn ever changes to True
    this.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
    });
    
    // Check if a valid session cookie exists; if so, set state to loggedIn
    this.store.dispatch({ type: 'CHECK' });
  }
}
