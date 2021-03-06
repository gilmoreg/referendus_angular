import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { RefModalComponent } from '../../modals/ref-modal/ref-modal.component';

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

  public openDeleteModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  public openEditModal() {
    // Animated set to false until I figure out why 'fade' will not remove itself
    this.modalRef = this.modalService.show(RefModalComponent, { animated: false });
    this.store.dispatch({
      type: 'SET_MODAL_PROPS',
      payload: {
        modal: {
          mode: 'edit',
          reference: this.reference.data,
          type: this.reference.data.type,
       },
      },
    });
  }

  closeModal() {
    this.modalRef.hide();
  }

  deleteRef() {
    this.http.delete(`/refs/${this.reference.data._id}`).subscribe((res) => {
      this.store.dispatch({ type: 'SYNC' });
      this.closeModal();
    });
  }

}
