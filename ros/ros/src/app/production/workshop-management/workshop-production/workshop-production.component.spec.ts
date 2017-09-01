import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkshopProductionComponent } from './workshop-production.component';

describe('WorkshopProductionComponent', () => {
  let component: WorkshopProductionComponent;
  let fixture: ComponentFixture<WorkshopProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkshopProductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkshopProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
