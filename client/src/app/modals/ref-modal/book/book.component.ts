import { Component,
  OnInit,
  Output,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

interface Author {
  firstName: string,
  middleName: string,
  lastName: string,
}

interface BookResponse {
  type: string,
  title: string,
  authors: Array<Author>,
  year: string,
  journal: string,
  publisher: string,
  city: string,
  tags: Array<string>,
  notes: string,
  url: string
}

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent implements OnInit {
  @Output() close = new EventEmitter<string>();

  defaultAuthor = 'Simpson, Kyle';
  defaultTitle = 'You Don\'t Know JS: ES6 & Beyond';
  defaultCity = 'Sebastopol';
  defaultPublisher = 'O’Reilly';
  defaultURL = 'http://shop.oreilly.com/product/0636920033769.do';
  defaultTags = 'JavaScript';
  defaultNotes = '';
  defaultYear = '2015';
  defaultType = 'book';

  constructor(private ref: ChangeDetectorRef, private store: Store<any>, private http: HttpClient) { }

  ngOnInit() {
  }

  buildJSON(formData) {
    // TODO make sure invalid authors value invalidates the form
    const authors = formData.authors.split(',');
    const author: Author = {
      firstName: authors[1].trim(),
      middleName: '',
      lastName: authors[0].trim(),
    };
    if (authors.length >= 3) author.middleName = authors[2].trim();

    const tags = formData.tags.split(',').map(t => ({ tag: t.trim() }));
    
    return Object.assign({}, formData, { type: 'book' }, { authors: [{ author }] }, { tags });
  }

  onSubmit(form) {
    if (form.invalid) {
      return;
    }
    // Submit form
    const post = this.buildJSON(form.value);
    this.http.post<BookResponse>('/refs', post).subscribe((res) => {
      this.store.dispatch({ type: 'SYNC' });
      this.close.emit();
    });
  }

}
