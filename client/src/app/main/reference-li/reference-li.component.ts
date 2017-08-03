import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-reference-li',
  templateUrl: './reference-li.component.html',
  styleUrls: ['./reference-li.component.css']
})
export class ReferenceLiComponent implements OnInit {
  @Input() reference;
  public modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private http: HttpClient, private store: Store<any>) { }

  ngOnInit() {
  }

  public openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  closeModal() {
    this.modalRef.hide();
  }

  deleteRef() {
    this.http.delete('/refs', this.reference).subscribe((res) => {
      this.store.dispatch({ type: 'SYNC' });
      this.closeModal();
    });
  }

}
