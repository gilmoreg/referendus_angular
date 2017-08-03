import { Component,
  OnInit,
  Input,
  Output,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
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
  @Input() reference;
  @Input() mode = 'new';
  @Output() close = new EventEmitter<string>();
  type = 'article';

  // https://github.com/angular/angular/issues/9600#issuecomment-278915107
  public form = new FormGroup({
    article: new FormGroup({
      author: new FormControl('Murphy, Avon, J'),
      title: new FormControl('Review of Four Books on HTML5'),
      journal: new FormControl('Technical Communication'),
      volume: new FormControl('58'),
      issue: new FormControl('4'),
      year: new FormControl('2011'),
      pages: new FormControl('353-356'),
    }),
    book: new FormGroup({
      author: new FormControl('Simpson, Kyle'),
      title: new FormControl('You Don\'t Know JS: ES6 & Beyond'),
      publisher: new FormControl('O\'Reilly'),
      city: new FormControl('Sebastopol'),
      year: new FormControl('2015'),
      url: new FormControl(),
    }),
    website: new FormGroup({
      url: new FormControl('https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy'),
      title: new FormControl('Same-origin policy'),
      siteTitle: new FormControl('Mozilla Developer Network'),
      accessDate: new FormControl(moment(new Date()).format('YYYY-MM-DD')),
      pubDate: new FormControl(moment(new Date('07-18-2017')).format('YYYY-MM-DD')),
      author: new FormControl('Shepherd, Eric'),
    }),
    tags: new FormControl(''),
    notes: new FormControl('')
  });
  
  constructor(public bsModalRef: BsModalRef,
    private ref: ChangeDetectorRef,
    private http: HttpClient,
    private store: Store<any>,
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  changeType(type) {
    this.type = type;
    this.ref.detectChanges();
  }

  buildAuthor(authors) {
    const author = authors.split(',');
    const builtAuthor: Author = {
      firstName: author[1].trim(),
      middleName: '',
      lastName: author[0].trim(),
    }
    if (authors.length >= 3) builtAuthor.middleName = author[2].trim();
    return builtAuthor;
  }

  buildJSON(formData) {
    // TODO make sure invalid authors value invalidates the form
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
    author = this.buildAuthor(data.author);
    if (author) return Object.assign({}, data, { authors: [{ author }] });
    return data;
  }

  createRef(data) {
    const post = this.buildJSON(data);
    this.http.post('/refs', post).subscribe((res) => {
      this.store.dispatch({ type: 'SYNC' });
      this.close.emit();
    });
  }

  editRef(data) {
    console.log('editing ref', data);
  }

  onSubmit(form) {
    console.log('onSubmit', form);
    if (form.invalid) return;
    if (this.mode === 'new') this.createRef(form.value);
    if (this.mode === 'edit') this.editRef(form.value);
  }

}
