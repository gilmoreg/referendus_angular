import { Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BookComponent implements OnInit {
  defaultAuthor = 'Simpson, Kyle';
  defaultTitle = 'You Don\'t Know JS: ES6 & Beyond';
  defaultCity = 'Sebastopol';
  defaultPublisher = 'O’Reilly';
  defaultURL = 'http://shop.oreilly.com/product/0636920033769.do';
  defaultTags = 'JavaScript';
  defaultNotes = '';
  defaultYear = '2015';
  defaultType = 'book';

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }
}
