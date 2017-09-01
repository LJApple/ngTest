import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureBarCodeComponent } from './procedure-bar-code.component';

describe('ProcedureBarCodeComponent', () => {
  let component: ProcedureBarCodeComponent;
  let fixture: ComponentFixture<ProcedureBarCodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureBarCodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureBarCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
