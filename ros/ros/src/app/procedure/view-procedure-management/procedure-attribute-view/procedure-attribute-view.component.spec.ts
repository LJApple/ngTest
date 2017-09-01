import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureAttributeViewComponent } from './procedure-attribute-view.component';

describe('ProcedureAttributeViewComponent', () => {
  let component: ProcedureAttributeViewComponent;
  let fixture: ComponentFixture<ProcedureAttributeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureAttributeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureAttributeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
