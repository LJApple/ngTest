import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureAttributeComponent } from './procedure-attribute.component';

describe('ProcedureAttributeComponent', () => {
  let component: ProcedureAttributeComponent;
  let fixture: ComponentFixture<ProcedureAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
