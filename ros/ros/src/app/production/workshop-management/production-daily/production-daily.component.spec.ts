import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDailyComponent } from './production-daily.component';

describe('ProductionDailyComponent', () => {
  let component: ProductionDailyComponent;
  let fixture: ComponentFixture<ProductionDailyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionDailyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionDailyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
