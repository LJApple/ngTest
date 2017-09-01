import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryModelTypeViewComponent } from './factory-model-type-view.component';

describe('FactoryModelTypeViewComponent', () => {
  let component: FactoryModelTypeViewComponent;
  let fixture: ComponentFixture<FactoryModelTypeViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryModelTypeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryModelTypeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
