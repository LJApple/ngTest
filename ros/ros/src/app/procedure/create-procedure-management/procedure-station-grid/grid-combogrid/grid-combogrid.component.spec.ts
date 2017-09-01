import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { gridCombogridComponent } from './grid-Combogrid.component';

describe('gridCombogridComponent', () => {
  let component: gridCombogridComponent;
  let fixture: ComponentFixture<gridCombogridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ gridCombogridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(gridCombogridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
