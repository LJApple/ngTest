import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureDescriptionComponent } from './procedure-description.component';

describe('ProcedureDescriptionComponent', () => {
  let component: ProcedureDescriptionComponent;
  let fixture: ComponentFixture<ProcedureDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
