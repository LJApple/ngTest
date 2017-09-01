import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionContainerComponent } from './function-container.component';

describe('FunctionContainerComponent', () => {
  let component: FunctionContainerComponent;
  let fixture: ComponentFixture<FunctionContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
