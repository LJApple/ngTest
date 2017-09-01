import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtEquityComponent } from './debt-equity.component';

describe('DebtEquityComponent', () => {
  let component: DebtEquityComponent;
  let fixture: ComponentFixture<DebtEquityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DebtEquityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtEquityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
