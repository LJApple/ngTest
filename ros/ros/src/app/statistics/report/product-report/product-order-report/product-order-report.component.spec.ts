import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductOrderReportComponent } from './product-order-report.component';

describe('ProductOrderReportComponent', () => {
  let component: ProductOrderReportComponent;
  let fixture: ComponentFixture<ProductOrderReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductOrderReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductOrderReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
