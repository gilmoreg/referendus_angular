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

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.uiReducer.loggedIn);
  }
}
