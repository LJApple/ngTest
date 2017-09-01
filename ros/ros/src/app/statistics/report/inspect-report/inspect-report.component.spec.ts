import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectReportComponent } from './inspect-report.component';

describe('InspectReportComponent', () => {
  let component: InspectReportComponent;
  let fixture: ComponentFixture<InspectReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InspectReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InspectReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
