import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureManagementComponent } from './procedure-management.component';

describe('ProcedureManagementComponent', () => {
  let component: ProcedureManagementComponent;
  let fixture: ComponentFixture<ProcedureManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
