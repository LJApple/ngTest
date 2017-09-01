import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryModelUpdateComponent } from './factory-model-update.component';

describe('FactoryModelUpdateComponent', () => {
  let component: FactoryModelUpdateComponent;
  let fixture: ComponentFixture<FactoryModelUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryModelUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryModelUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
