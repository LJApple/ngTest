import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesAdvanceReportComponent } from './sales-advance-report.component';

describe('SalesAdvanceReportComponent', () => {
  let component: SalesAdvanceReportComponent;
  let fixture: ComponentFixture<SalesAdvanceReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesAdvanceReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesAdvanceReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
