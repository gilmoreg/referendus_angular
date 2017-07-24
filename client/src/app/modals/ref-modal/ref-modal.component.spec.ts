import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RefModalComponent } from './ref-modal.component';

describe('RefModalComponent', () => {
  let component: RefModalComponent;
  let fixture: ComponentFixture<RefModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RefModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RefModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
