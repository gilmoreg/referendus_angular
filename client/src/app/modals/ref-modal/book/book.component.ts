import { 
  Component,
  OnInit,
  ChangeDetectorRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroupName } from '@angular/forms';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: BookComponent, multi: true }],
})
export class BookComponent implements OnInit {
  constructor(private ref: ChangeDetectorRef, public formGroupName: FormGroupName) { }

  ngOnInit() {
  }

  formChanged() {
    this.ref.detectChanges();
  }
}
