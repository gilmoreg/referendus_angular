import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewButtonsComponent } from './new-buttons.component';

describe('NewButtonsComponent', () => {
  let component: NewButtonsComponent;
  let fixture: ComponentFixture<NewButtonsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewButtonsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
