import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDescriptionViewComponent } from './procedure-description-view.component';

describe('ProcedureDescriptionViewComponent', () => {
  let component: ProcedureDescriptionViewComponent;
  let fixture: ComponentFixture<ProcedureDescriptionViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureDescriptionViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureDescriptionViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
