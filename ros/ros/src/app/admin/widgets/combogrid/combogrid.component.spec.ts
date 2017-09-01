import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CombogridComponent } from './combogrid.component';

describe('CombogridComponent', () => {
  let component: CombogridComponent;
  let fixture: ComponentFixture<CombogridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CombogridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CombogridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
