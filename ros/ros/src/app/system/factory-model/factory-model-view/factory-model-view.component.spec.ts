import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryModelViewComponent } from './factory-model-view.component';

describe('FactoryModelViewComponent', () => {
  let component: FactoryModelViewComponent;
  let fixture: ComponentFixture<FactoryModelViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryModelViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryModelViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
