import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {

  constructor(private store: Store<any>) {}

  ngOnInit() {
  }

  demologin(event) {
    event.preventDefault();
    this.store.dispatch({ type: 'LOGIN', payload: { username: 'demo', password: 'demo' }});
  }

}
