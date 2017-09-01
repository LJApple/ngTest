import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosCalendarComponent } from './ros-calendar.component';

describe('RosCalendarComponent', () => {
  let component: RosCalendarComponent;
  let fixture: ComponentFixture<RosCalendarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosCalendarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosCalendarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
