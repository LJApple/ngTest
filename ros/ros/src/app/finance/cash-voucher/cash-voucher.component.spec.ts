import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CashVoucherComponent } from './cash-voucher.component';

describe('CashierComponent', () => {
  let component: CashVoucherComponent;
  let fixture: ComponentFixture<CashVoucherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CashVoucherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CashVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
