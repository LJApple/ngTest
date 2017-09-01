import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessChartComponent } from './business-chart.component';

describe('BusinessChartComponent', () => {
  let component: BusinessChartComponent;
  let fixture: ComponentFixture<BusinessChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
