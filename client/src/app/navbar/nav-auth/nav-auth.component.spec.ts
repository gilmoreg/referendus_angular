import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NavAuthComponent } from './nav-auth.component';

describe('NavAuthComponent', () => {
  let component: NavAuthComponent;
  let fixture: ComponentFixture<NavAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NavAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
