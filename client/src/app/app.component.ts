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
  apaFormat$: Observable<boolean>;
  chicagoFormat$: Observable<boolean>;
  mlaFormat$: Observable<boolean>;
  format: string;
  isLoggedIn: boolean;

  constructor(private store: Store<any>) {}

  syncReferences() {
    console.log('syncReferences', this.format);
    if (this.isLoggedIn && this.format) this.store.dispatch({ type: 'SYNC', payload: this.format });
  }

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.uiReducer.loggedIn);
    this.apaFormat$ = this.store.select(state => state.uiReducer.format.apa);
    this.chicagoFormat$ = this.store.select(state => state.uiReducer.format.chicago);
    this.mlaFormat$ = this.store.select(state => state.uiReducer.format.mla);
    
    // Keep local format value up to date with store and resync on change
    this.apaFormat$.subscribe((format) => {
      if (format) {
        this.format = 'apa';
        this.syncReferences();
      }
    });
    this.chicagoFormat$.subscribe((format) => {
      if (format) {
        this.format = 'chicago';
        this.syncReferences();
      }
    });
    this.mlaFormat$.subscribe((format) => {
      if (format) {
        this.format = 'mla';
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
    // Check if a valid session cookie exists; if so, set state to loggedIn
    this.store.dispatch({ type: 'CHECK' });
  }
}
