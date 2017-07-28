import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

import { Store } from '@ngrx/store';
import { LOGIN, LOGOUT } from '../reducers/ui';

import { RefModalComponent } from '../modals/ref-modal/ref-modal.component';
 
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  loggedIn$: Observable<boolean>;
  apaFormat$: Observable<boolean>;
  chicagoFormat$: Observable<boolean>;
  mlaFormat$: Observable<boolean>;
  // Temporary for testing
  type: string = 'article';
  public modalRef: BsModalRef;

  constructor(private store: Store<any>, private modalService: BsModalService) { }

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.uiReducer.loggedIn);
    this.apaFormat$ = this.store.select(state => state.uiReducer.format.apa);
    this.chicagoFormat$ = this.store.select(state => state.uiReducer.format.chicago);
    this.mlaFormat$ = this.store.select(state => state.uiReducer.format.mla);
  }

  // Collapsable nav
  public isCollapsed:boolean = false;
  @HostListener('window:resize', ['$event'])
  onResize(event){
    // Since collapser will hide, make sure nav isn't collapsed with no way to expand it
    if (event.target.innerWidth > 800) this.isCollapsed = false;
  }

  login(event, username:string, password:string) {
    event.preventDefault();
    this.store.dispatch({ type: 'LOGIN', payload: { username, password }});
  }

  logout() {
    this.store.dispatch({ type: LOGOUT });
  }

  signup(event, username:string, password:string) {
    event.preventDefault();
    this.store.dispatch({ type: 'SIGNUP', payload: { username, password }})
  }

  signout(event) {
    event.preventDefault();
    this.store.dispatch({ type: 'LOGOUT' });
  }

  setAPAFormat() {
    this.store.dispatch({ type: 'SET_FORMAT', payload: 'apa' });
  }

  setChicagoFormat() {
    this.store.dispatch({ type: 'SET_FORMAT', payload: 'chicago' });
  }

  setMLAFormat() {
    this.store.dispatch({ type: 'SET_FORMAT', payload: 'mla' });
  }

  copy() {}

  public openModal() {
    // Animated set to false until I figure out why 'fade' will not remove itself
    this.modalService.show(RefModalComponent, { animated: false });
  }

}
