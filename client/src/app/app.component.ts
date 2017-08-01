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
  format: string;
  isLoggedIn: boolean;

  constructor(private store: Store<any>) {}

  syncReferences() {
    if (this.format) localStorage.setItem('format', this.format);
    if (this.isLoggedIn && this.format) this.store.dispatch({ type: 'SYNC', payload: this.format });
  }

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.uiReducer.loggedIn);
    this.format$ = this.store.select(state => state.uiReducer.format);

    // Keep local format value up to date with store and resync on change
    this.format$.subscribe((format) => {
      if (format) {
        this.format = format;
        this.syncReferences();
      }
    });
    
    // Sync references if loggedIn ever changes to True
    this.loggedIn$.subscribe((isLoggedIn) => {
      if (isLoggedIn) {
        this.isLoggedIn = true;
        this.syncReferences();
      } else {
        this.isLoggedIn = false;
      }
    });
    // Check if a format choice exists in localStorage and set it
    const lsFormat = localStorage.getItem('format');
    if (lsFormat) {
      this.store.dispatch({ type: 'SET_FORMAT', payload: lsFormat });
    } else {
      // Otherwise set the default as APA
      this.store.dispatch({ type: 'SET_FORMAT', payload: 'apa' });
    }
    // Check if a valid session cookie exists; if so, set state to loggedIn
    this.store.dispatch({ type: 'CHECK' });
  }
}
