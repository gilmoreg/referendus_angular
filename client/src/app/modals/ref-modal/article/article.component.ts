import { 
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';

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
  defaultTitle = 'Review of Four Books on HTML5';
  defaultUrl = 'www.jstor.org/stable/43092912';
  defaultTags = 'JavaScript, HTML';
  defaultNotes = '';
  defaultYear = '2011';
  defaultPages = '353-356';
  defaultVolume = '58';
  defaultIssue = '4';
  defaultType = 'article';

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  formChanged() {
    this.ref.detectChanges();
  }
}
