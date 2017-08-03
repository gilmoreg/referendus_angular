import { Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css'],
})
export class WebsiteComponent implements OnInit {
  defaultURL = 'https://developer.mozilla.org/en-US/docs/Web/Security/Same-origin_policy';
  defaultTitle = 'Same-origin policy';
  defaultSiteTitle = 'Mozilla Developer Network';
  defaultAccessDate = moment().format('YYYY-MM-DD');
  defaultPubDate = moment(new Date('09/28/2016')).format('YYYY-MM-DD');
  defaultAuthor = 'Ruderman, Jesse';
  defaultTags = 'JavaScript';
  defaultNotes = '';
  defaultType = 'website';

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  formChanged() {
    this.ref.detectChanges();
  }
}
