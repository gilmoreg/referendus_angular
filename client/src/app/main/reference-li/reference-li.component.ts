import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-reference-li',
  templateUrl: './reference-li.component.html',
  styleUrls: ['./reference-li.component.css']
})
export class ReferenceLiComponent implements OnInit {
  @Input() reference;

  constructor() { }

  ngOnInit() {
  }

}
