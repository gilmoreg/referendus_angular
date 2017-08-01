import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Author {
  firstName: string,
  middleName: string,
  lastName: string,
}

interface ArticleResponse {
  type: string,
  title: string,
  authors: Array<Author>,
  year: string,
  journal: string,
  volume: string,
  issue: string,
  pages: string,
  tags: Array<string>,
  notes: string,
  url: string
}

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  defaultAuthor = 'Murphy, Avon, J';
  defaultJournal = 'Technical Communication';
  defaultTitle = 'Identifying Classes in Legacy JavaScript Code';
  defaultUrl = 'www.jstor.org/stable/43092912';
  defaultTags = 'JavaScript, HTML';
  defaultNotes = '';
  defaultYear = '2011';
  defaultPages = '353-356';
  defaultVolume = '58';
  defaultIssue = '4';
  defaultType = 'article';

  constructor(private ref: ChangeDetectorRef, private http: HttpClient) { }

  ngOnInit() {
  }

  formChanged() {
    this.ref.detectChanges();
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
    
    return Object.assign({}, formData, { type: 'article' }, { authors: [{ author }] }, { tags });
  }

  onSubmit(form) {
    if (form.invalid) {
      return;
    }
    // Submit form
    const post = this.buildJSON(form.value);
    this.http.post<ArticleResponse>('/refs', post).subscribe((res) => {
      // TODO Close modal, refresh list
      console.log(res);
    });
  }
}
