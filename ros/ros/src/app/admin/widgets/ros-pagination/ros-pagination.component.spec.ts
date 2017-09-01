import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RosPaginationComponent } from './ros-pagination.component';

describe('RosPaginationComponent', () => {
  let component: RosPaginationComponent;
  let fixture: ComponentFixture<RosPaginationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosPaginationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RosPaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
