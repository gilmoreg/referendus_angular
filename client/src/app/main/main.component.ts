import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  tabs = [
    {
      heading: 'all',
      type: 'all',
      active: true,
    },
    {
      heading: 'articles',
      type: 'article',
      active: false,
    },
    {
      heading: 'books',
      type: 'book',
      active: false,
    },
    {
      heading: 'websites',
      type: 'website',
      active: false,
    }
  ]
  activeTab$: Observable<any>;
  activeTab = 'all';

  references = [];
  displayedRefs = [];
  references$: Observable<any>;
  

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.references$ = this.store.select(state => state.referencesReducer.references);  
    this.references$.subscribe(references => {
      this.references = references;
      this.updateRefList();
    });

    this.activeTab$ = this.store.select(state => state.uiReducer.activeTab);
    this.activeTab$.subscribe(tab => {
      this.activeTab = tab;
      this.updateRefList();
    });
  }

  updateRefList() {
    if (this.activeTab === 'all') this.displayedRefs = this.references;
    else this.displayedRefs = this.references.filter(ref => ref.data.type === this.activeTab);
  }

  selectTab(activeTab) {
    this.store.dispatch({ type: 'CHANGE_TAB', payload: { tab: activeTab }});
    this.tabs.forEach(tab => {
      if (tab.type === activeTab) tab.active = true;
      else tab.active = false;
    });
    this.updateRefList();
  }
}
