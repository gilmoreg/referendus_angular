import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  defaultAuthor = 'Silva, Leonardo, Humberto';
  defaultJournal = 'Journal of Software: Evolution and Process';
  defaultTitle = 'Identifying Classes in Legacy JavaScript Code';
  defaultUrl = 'http://dx.doi.org/10.1002/smr.1864';
  defaultTags = 'JavaScript, OOP';
  defaultNotes = '';
  defaultYear = '2017';
  defaultPages = 'n/a';
  defaultVolume = 'n/a';
  defaultIssue = 'n/a';

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  formChanged() {
    this.ref.detectChanges();
  }

  onSubmit(form) {
    if (form.invalid) {
      return;
    }
    // Submit form
  }

}
