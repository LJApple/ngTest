import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionDemandCreateComponent } from './production-demand-create.component';

describe('ProductionDemandCreateComponent', () => {
  let component: ProductionDemandCreateComponent;
  let fixture: ComponentFixture<ProductionDemandCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductionDemandCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductionDemandCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
