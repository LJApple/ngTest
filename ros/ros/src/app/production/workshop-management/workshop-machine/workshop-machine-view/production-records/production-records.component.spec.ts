import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionRecordsComponent } from './production-records.component';

describe('ProductionRecordsComponent', () => {
  let component: ProductionRecordsComponent;
  let fixture: ComponentFixture<ProductionRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
