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

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.format$ = this.store.select(state => state.uiReducer.format);
    this.format$.subscribe((format) => {
      if (format) {
        Array.from(document.querySelectorAll('[type=checkbox]'))
          .forEach((input) => {
            const el = <HTMLInputElement>input;
            if (el) el.checked = false;
          });
        const formatElement = <HTMLInputElement>document.querySelector(`#${format}`);
        if (formatElement) formatElement.checked = true;
      }
    });
  }

  setFormat(event) {
    this.store.dispatch({ type: 'SET_FORMAT', payload: event.target.value });
  }
}
