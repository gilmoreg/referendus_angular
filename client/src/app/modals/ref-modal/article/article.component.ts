import { 
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroupName } from '@angular/forms';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: ArticleComponent, multi: true }],
})
export class ArticleComponent implements OnInit {
  constructor(private ref: ChangeDetectorRef, public formGroupName: FormGroupName) { }

  ngOnInit() {
  }

  formChanged() {
    this.ref.detectChanges();
  }
}
