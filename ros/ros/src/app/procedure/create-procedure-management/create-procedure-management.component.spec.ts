import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProcedureManagementComponent } from './create-procedure-management.component';

describe('CreateProcedureManagementComponent', () => {
  let component: CreateProcedureManagementComponent;
  let fixture: ComponentFixture<CreateProcedureManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateProcedureManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateProcedureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
