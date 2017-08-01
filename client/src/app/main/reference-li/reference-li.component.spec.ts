import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenceLiComponent } from './reference-li.component';

describe('ReferenceLiComponent', () => {
  let component: ReferenceLiComponent;
  let fixture: ComponentFixture<ReferenceLiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReferenceLiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReferenceLiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
