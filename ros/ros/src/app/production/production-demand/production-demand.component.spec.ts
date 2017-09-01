import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDemandComponent } from './production-demand.component';

describe('ProductionDemandComponent', () => {
  let component: ProductionDemandComponent;
  let fixture: ComponentFixture<ProductionDemandComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionDemandComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionDemandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
