import { Component,
  OnInit,
  Output,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  EventEmitter } from '@angular/core';

@Component({
  selector: 'app-website',
  templateUrl: './website.component.html',
  styleUrls: ['./website.component.css']
})
export class WebsiteComponent implements OnInit {
  @Output() close = new EventEmitter<string>();

  constructor() { }

  ngOnInit() {
  }

}
