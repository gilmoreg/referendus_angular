import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavControlsComponent } from './nav-controls.component';

describe('NavControlsComponent', () => {
  let component: NavControlsComponent;
  let fixture: ComponentFixture<NavControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
