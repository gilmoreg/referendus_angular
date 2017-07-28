import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-new-buttons',
  templateUrl: './new-buttons.component.html',
  styleUrls: ['./new-buttons.component.css']
})
export class NewButtonsComponent implements OnInit {
  @Output() typeChanged = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

  newArticle() {
    this.typeChanged.emit('article');
  }

  newBook() {
    this.typeChanged.emit('book');
  }

  newWebsite() {
    this.typeChanged.emit('website');
  }

}
