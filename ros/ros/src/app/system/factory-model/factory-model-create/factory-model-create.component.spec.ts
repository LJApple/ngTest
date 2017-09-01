import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryModelCreateComponent } from './factory-model-create.component';

describe('FactoryModelCreateComponent', () => {
  let component: FactoryModelCreateComponent;
  let fixture: ComponentFixture<FactoryModelCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FactoryModelCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FactoryModelCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
