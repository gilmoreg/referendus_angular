import { 
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroupName } from '@angular/forms';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: WebsiteComponent, multi: true }],
})
export class WebsiteComponent implements OnInit {
  constructor(private ref: ChangeDetectorRef, public formGroupName: FormGroupName) { }

  ngOnInit() {
  }

  formChanged() {
    this.ref.detectChanges();
  }
}
