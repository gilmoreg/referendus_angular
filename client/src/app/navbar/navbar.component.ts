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
  references$: Observable<any>;
  activeTab$: Observable<any>;
  
  public modalRef: BsModalRef;
  private references;
  private activeTab;

  constructor(private store: Store<any>, private modalService: BsModalService) { }

  ngOnInit() {
    this.loggedIn$ = this.store.select(state => state.uiReducer.loggedIn);
    this.references$ = this.store.select(state => state.referencesReducer.references);
    this.activeTab$ = this.store.select(state => state.uiReducer.activeTab);
    this.references$.subscribe(references => {
      this.references = references;
    });
    this.activeTab$.subscribe(activeTab => {
      this.activeTab = activeTab;
    });
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

  selectElementContents(el) {
    const range = document.createRange();
    range.selectNodeContents(el);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
  };

  copy() {
    let collection = [];
    if (this.activeTab === 'all') collection = this.references;
    else collection = this.references.filter(ref => ref.data.type === this.activeTab);
    let text = '';
    collection.forEach((ref) => {
      text += `${ref.html}<br><br>`;
    });
    if ((<any>window).clipboardData && (<any>window).clipboardData.setData) {
      // IE specific code path to prevent textarea being shown while dialog is visible.
      return (<any>window).clipboardData.setData('Text', text);
    } else if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
      const textarea = document.createElement('div');
      textarea.contentEditable = 'true';
      textarea.innerHTML = text;
      textarea.style.position = 'fixed';  // Prevent scrolling to bottom of page in MS Edge.
      document.body.appendChild(textarea);
      this.selectElementContents(textarea);
      try {
        return document.execCommand('copy');  // Security exception may be thrown by some browsers.
      } catch (ex) {
        console.warn('Copy to clipboard failed.', ex);
        return false;
      } finally {
        document.body.removeChild(textarea);
      }
    }
    return true;
  }

  public openModal() {
    // Animated set to false until I figure out why 'fade' will not remove itself
    this.modalRef = this.modalService.show(RefModalComponent, { animated: false });
    this.modalRef.content['mode'] = 'add';
  }

}
