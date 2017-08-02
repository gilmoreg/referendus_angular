import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-nav-format',
  templateUrl: './nav-format.component.html',
  styleUrls: ['./nav-format.component.css']
})
export class NavFormatComponent implements OnInit {
  format$: Observable<string>;

  apaChecked = false;
  chicagoChecked = false;
  mlaChecked = false;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.format$ = this.store.select(state => state.uiReducer.format);
    this.format$.subscribe((format) => {
      if (format) {
        this.apaChecked = false;
        this.chicagoChecked = false;
        this.mlaChecked = false;
        switch (format) {
          case 'apa': this.apaChecked = true; break;
          case 'chicago': this.chicagoChecked = true; break;
          case 'mla': this.mlaChecked = true; break;
          default:
        }
        
        // Refs need to be re-synced with format change
        this.store.dispatch({ type: 'SYNC' });
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
  }

  setFormat(event) {
    this.store.dispatch({ type: 'SET_FORMAT', payload: event.target.value });
  }
}
