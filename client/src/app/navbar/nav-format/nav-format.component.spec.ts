import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFormatComponent } from './nav-format.component';

describe('NavFormatComponent', () => {
  let component: NavFormatComponent;
  let fixture: ComponentFixture<NavFormatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavFormatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavFormatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
