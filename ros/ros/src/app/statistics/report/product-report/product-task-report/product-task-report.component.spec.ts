import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductTaskReportComponent } from './product-task-report.component';

describe('ProductTaskReportComponent', () => {
  let component: ProductTaskReportComponent;
  let fixture: ComponentFixture<ProductTaskReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductTaskReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductTaskReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
