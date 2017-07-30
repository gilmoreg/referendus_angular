import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-ref-modal',
  templateUrl: './ref-modal.component.html',
  styleUrls: ['./ref-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefModalComponent implements OnInit {
  type: string;
  
  constructor(public bsModalRef: BsModalRef, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.type = 'book';
  }

  changeType(type) {
    this.type = type;
    this.ref.detectChanges();
  }

}
