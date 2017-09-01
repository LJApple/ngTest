import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcedureBarCodeViewComponent } from './procedure-bar-code-view.component';

describe('ProcedureBarCodeViewComponent', () => {
  let component: ProcedureBarCodeViewComponent;
  let fixture: ComponentFixture<ProcedureBarCodeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcedureBarCodeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcedureBarCodeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
