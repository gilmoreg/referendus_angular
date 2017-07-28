import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';

@Component({
  selector: 'app-ref-modal',
  templateUrl: './ref-modal.component.html',
  styleUrls: ['./ref-modal.component.css'],
})
export class RefModalComponent implements OnInit {
  type: string = 'article';
  
  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
  }

  changeType(type) {
    this.type = type;
  }

}
