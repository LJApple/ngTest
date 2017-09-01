import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutionDemandUpdateComponent } from './prodution-demand-update.component';

describe('ProdutionDemandUpdateComponent', () => {
  let component: ProdutionDemandUpdateComponent;
  let fixture: ComponentFixture<ProdutionDemandUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutionDemandUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutionDemandUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
