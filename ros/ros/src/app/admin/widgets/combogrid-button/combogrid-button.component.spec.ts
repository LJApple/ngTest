import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombogridButtonComponent } from './combogrid-button.component';

describe('combogridButtonComponent', () => {
  let component: CombogridButtonComponent;
  let fixture: ComponentFixture<CombogridButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombogridButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombogridButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
