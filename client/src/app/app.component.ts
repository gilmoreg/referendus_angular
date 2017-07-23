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
  format$: Observable<string>;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.uiReducer.loggedIn);
    this.format$ = this.store.select(state => state.uiReducer.format);
    // Sync references if loggedIn ever changes to True
    this.loggedIn$.subscribe((isLoggedIn) => {
        if (isLoggedIn) this.store.dispatch({ type: 'SYNC', payload: this.format$ });
    });
    // Check if a valid session cookie exists; if so, set state to loggedIn
    this.store.dispatch({ type: 'CHECK' });
  }
}
