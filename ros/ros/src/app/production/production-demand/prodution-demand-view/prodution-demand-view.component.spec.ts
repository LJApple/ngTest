import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutionDemandViewComponent } from './prodution-demand-view.component';

describe('ProdutionDemandViewComponent', () => {
  let component: ProdutionDemandViewComponent;
  let fixture: ComponentFixture<ProdutionDemandViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutionDemandViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutionDemandViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
