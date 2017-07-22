import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-nav-controls',
  templateUrl: './nav-controls.component.html',
  styleUrls: ['./nav-controls.component.css']
})
export class NavControlsComponent implements OnInit {
  apaFormat$: Observable<boolean>;
  chicagoFormat$: Observable<boolean>;
  mlaFormat$: Observable<boolean>;
  
  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.apaFormat$ = this.store.select(state => state.uiReducer.format.apa);
    this.chicagoFormat$ = this.store.select(state => state.uiReducer.format.chicago);
    this.mlaFormat$ = this.store.select(state => state.uiReducer.format.mla);
  }

  setAPAFormat() {
    console.log('apa');
    this.store.dispatch({ type: 'SET_FORMAT', payload: 'apa' });
  }

  setChicagoFormat() {
    this.store.dispatch({ type: 'SET_FORMAT', payload: 'chicago' });
  }

  setMLAFormat() {
    this.store.dispatch({ type: 'SET_FORMAT', payload: 'mla' });
  }
}
