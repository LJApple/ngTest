import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopMachineCreateComponent } from './workshop-machine-create.component';

describe('WorkshopMachineCreateComponent', () => {
  let component: WorkshopMachineCreateComponent;
  let fixture: ComponentFixture<WorkshopMachineCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopMachineCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopMachineCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
