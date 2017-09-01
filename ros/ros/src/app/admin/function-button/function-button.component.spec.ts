import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FunctionButtonComponent } from './function-button.component';

describe('FunctionButtonComponent', () => {
  let component: FunctionButtonComponent;
  let fixture: ComponentFixture<FunctionButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FunctionButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FunctionButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
