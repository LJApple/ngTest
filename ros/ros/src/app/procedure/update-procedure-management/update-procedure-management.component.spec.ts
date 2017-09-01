import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProcedureManagementComponent } from './update-procedure-management.component';

describe('UpdateProcedureManagementComponent', () => {
  let component: UpdateProcedureManagementComponent;
  let fixture: ComponentFixture<UpdateProcedureManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProcedureManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProcedureManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
