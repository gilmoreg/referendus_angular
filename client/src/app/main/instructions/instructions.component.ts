import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instructions',
  templateUrl: './instructions.component.html',
  styleUrls: ['./instructions.component.css']
})
export class InstructionsComponent implements OnInit {
  visible = <boolean> false;

  constructor() { }

  ngOnInit() {
  }

  toggleVisible() {
    this.visible = !this.visible;
  }
}
