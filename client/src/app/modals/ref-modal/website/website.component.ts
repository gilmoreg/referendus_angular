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

interface WebsiteResponse {
  type: string,
  title: string,
  siteTitle: string,
  authors: Array<Author>,
  accessDate: Date,
  pubDate: Date,
  tags: Array<string>,
  notes: string,
  url: string
}


@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  @Output() close = new EventEmitter<string>();

  defaultURL = 'https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy';
  defaultTitle = 'Same-origin policy';
  defaultSiteTitle = 'Mozilla Developer Network';
  defaultAccessDate = new Date();
  defaultPubDate = new Date('09/28/2016');
  defaultAuthor = 'Ruderman, Jesse';
  defaultTags = 'JavaScript';
  defaultNotes = '';
  defaultType = 'website';

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
    
    return Object.assign({}, formData, { type: 'website' }, { authors: [{ author }] }, { tags });
  }

  onSubmit(form) {
    if (form.invalid) {
      return;
    }
    // Submit form
    const post = this.buildJSON(form.value);
    this.http.post<WebsiteResponse>('/refs', post).subscribe((res) => {
      this.store.dispatch({ type: 'SYNC' });
      this.close.emit();
    });
  }
}
