import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesOrderReportComponent } from './sales-order-report.component';

describe('SalesOrderReportComponent', () => {
  let component: SalesOrderReportComponent;
  let fixture: ComponentFixture<SalesOrderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesOrderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
