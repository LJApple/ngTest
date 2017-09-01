import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopMachineComponent } from './workshop-machine.component';

describe('WorkshopMachineComponent', () => {
  let component: WorkshopMachineComponent;
  let fixture: ComponentFixture<WorkshopMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
