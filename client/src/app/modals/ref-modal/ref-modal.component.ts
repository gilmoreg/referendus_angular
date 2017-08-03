import { Component,
  OnInit,
  Input,
  Output,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/modal-options.class';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';

interface Author {
  firstName: string,
  middleName: string,
  lastName: string,
}

@Component({
  selector: 'app-ref-modal',
  templateUrl: './ref-modal.component.html',
  styleUrls: ['./ref-modal.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RefModalComponent implements OnInit {
  @Input() reference;
  @Input() mode = 'new';
  @Output() close = new EventEmitter<string>();
  type = 'book';
  
  constructor(public bsModalRef: BsModalRef,
    private ref: ChangeDetectorRef,
    private http: HttpClient,
    private store: Store<any>) { }

  ngOnInit() {
  }

  changeType(type) {
    this.type = type;
    this.ref.detectChanges();
  }

  buildJSON(formData) {
    // TODO make sure invalid authors value invalidates the form
    let author: Author;
    
    if (this.type === 'article' || this.type === 'book') {
      const authors = formData.authors.split(',');
      author = {
        firstName: authors[1].trim(),
        middleName: '',
        lastName: authors[0].trim(),
      };
      if (authors.length >= 3) author.middleName = authors[2].trim();
    }
    
    const tags = formData.tags.split(',').map(t => ({ tag: t.trim() }));
    
    const genericData = Object.assign({}, formData, { type: this.type }, { tags });
    // If we set the author (type article or book) return that as well
    if (author) return Object.assign({}, genericData, { authors: [{ author }] });
    // Otherwise just send what we have
    return genericData;
  }

  createRef(data) {
    const post = this.buildJSON(data);
    this.http.post('/refs', post).subscribe((res) => {
      this.store.dispatch({ type: 'SYNC' });
      this.close.emit();
    });
  }

  editRef(data) {
    console.log('editing ref', data);
  }

  onSubmit(form) {
    if (form.invalid) return;
    if (this.mode === 'new') this.createRef(form.value);
    if (this.mode === 'edit') this.editRef(form.value);
  }

}
