import { Component,
  OnInit,
  Input,
  Output,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import * as moment from 'moment';

interface Author {
  firstName: string,
  middleName: string,
  lastName: string,
}

@Component({
  selector: 'app-ref-modal',
  templateUrl: './ref-modal.component.html',
  styleUrls: ['./ref-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefModalComponent implements OnInit {
  private modalProperties$: Observable<string>;
  public mode: string;
  public type: string;
  public reference: any;
  public form: any;

  @Output() close = new EventEmitter<string>();

  constructor(public bsModalRef: BsModalRef,
    public bsModalServce: BsModalService,
    private ref: ChangeDetectorRef,
    private http: HttpClient,
    private store: Store<any>,
    private fb: FormBuilder) { }

  ngOnInit() {
    this.modalProperties$ = this.store.select(state => state.uiReducer.modal);
    this.modalProperties$.subscribe(props => {
      this.mode = props['mode'];
      this.type = props['type'];
      this.reference = props['reference'];
      this.generateFormData(this.reference);
      this.ref.detectChanges();
    });
  }

  // https://github.com/angular/angular/issues/9600#issuecomment-278915107
  generateArticle(article = {}) {
    return new FormGroup({
      author: new FormControl(article['author'] || 'Murphy, Avon, J'),
      title: new FormControl(article['title'] || 'Review of Four Books on HTML5'),
      journal: new FormControl(article['journal'] || 'Technical Communication'),
      volume: new FormControl(article['volume'] || '58'),
      issue: new FormControl(article['issue'] || '4'),
      year: new FormControl(article['year'] || '2011'),
      pages: new FormControl(article['pages'] || '353-356'),
    });
  }

  generateBook(book = {}) {
    return new FormGroup({
      author: new FormControl(book['author'] || 'Simpson, Kyle'),
      title: new FormControl(book['title'] || 'You Don\'t Know JS: ES6 & Beyond'),
      publisher: new FormControl(book['publisher'] || 'O\'Reilly'),
      city: new FormControl(book['city'] || 'Cambridge'),
      year: new FormControl(book['year'] || '2015'),
      url: new FormControl(book['url'] || ''),
    });
  }

  generateWebsite(site = {}) {
    let accessDate: Date;
    let pubDate: Date;
    if (site['accessDate']) accessDate = new Date(site['accessDate']);
    if (site['pubDate']) pubDate = new Date(site['pubDate']);
    console.log('generateWebsite', site, accessDate, pubDate);
    return new FormGroup({
      url: new FormControl(site['url'] ||
       'https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy'),
      title: new FormControl(site['title'] || 'Same-origin policy'),
      siteTitle: new FormControl(site['siteTitle'] || 'Mozilla Developer Network'),
      // TODO these don't work in Firefox
      accessDate: new FormControl(accessDate || new Date()),
        /* moment(new Date()).format('YYYY-MM-DD')), */
      pubDate: new FormControl(pubDate || new Date()),
        /* moment(new Date('07-18-2017')).format('YYYY-MM-DD')), */
      author: new FormControl(site['author'] || 'Shepherd, Eric'),
    });
  }

  generateFormData(reference) {
    let article: FormGroup = this.generateArticle();
    let book: FormGroup = this.generateBook();
    let website: FormGroup = this.generateWebsite();
    let tags: string = '';

    if (reference && reference['authors']) {
      // TODO maybe break this out into a function
      const author = reference['authors'][0].author;
      reference['author'] = `${author.lastName}, ${author.firstName}${author.middleName ? ', ' : ''}${author.middleName ? author.middleName : ''}`;
    }
    
    if (reference) {
      switch (reference.type) {
        case 'article': article = this.generateArticle(reference); break;
        case 'book': book = this.generateBook(reference); break;
        case 'website': website = this.generateWebsite(reference); break;
        default:
      }
      if (reference['tags']) {
        reference['tags'].forEach(t => {
          if (t.tag !== '') tags += `${t.tag}, `;
        });
        tags = tags.slice(-2); // remove final comma and space
      }
    }
    
    this.form = new FormGroup({
      article,
      book,
      website,
      tags: new FormControl(tags || ''),
      notes: new FormControl(reference['notes'] || ''),
    });
    this.ref.detectChanges();
  }

  changeType(type) {
    this.store.dispatch({
      type: 'SET_MODAL_PROPS',
      payload: {
        modal: {
          mode: this.mode,
          reference: this.reference,
          type,
       },
      },
    });
  }

  buildAuthor(authors) {
    const author = authors.split(',');
    const builtAuthor: Author = {
      firstName: author[1].trim(),
      middleName: '',
      lastName: author[0].trim(),
    }
    if (author.length >= 3) builtAuthor.middleName = author[2].trim();
    return builtAuthor;
  }

  buildJSON(formData) {
    // TODO make sure invalid authors value invalidates the form
    console.log('buildJSON', formData);
    let author: Author;
    let data: any;
    switch (this.type) {
      case 'article': data = formData.article; break;
      case 'book': data = formData.book; break;
      case 'website': data = formData.website; break;
      default: data = formData;
    }
    data.tags = formData.tags.split(',').map(t => ({ tag: t.trim() }));
    data.notes = formData.notes;
    data.type = this.type;
    if (data.accessDate) data.accessDate = data.accessDate.formatted;
    if (data.pubDate) data.pubDate = data.pubDate.formatted;
    author = this.buildAuthor(data.author);
    if (author) return Object.assign({}, data, { authors: [{ author }] });
    return data;
  }

  createRef(data) {
    const post = this.buildJSON(data);
    this.http.post('/refs', post).subscribe((res) => {
      this.store.dispatch({ type: 'SYNC' });
      this.bsModalRef.hide();
    });
  }

  editRef(data) {
    const post = this.buildJSON(data);
    post.id = this.reference._id;
    this.http.put(`/refs/${this.reference._id}`, post).subscribe((res) => {
      this.store.dispatch({ type: 'SYNC' });
      this.store.dispatch({
      type: 'SET_MODAL_PROPS',
      payload: {
        modal: {
          mode: this.mode,
          reference: post,
          type: this.type,
       },
      },
    });
      this.bsModalRef.hide();
    });
  }

  onSubmit(form) {
    if (form.invalid) return;
    if (this.mode === 'add') this.createRef(form.value);
    if (this.mode === 'edit') this.editRef(form.value);
  }

}
