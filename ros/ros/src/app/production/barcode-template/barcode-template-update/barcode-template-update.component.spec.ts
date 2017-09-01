import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeTemplateUpdateComponent } from './barcode-template-update.component';

describe('BarcodeTemplateUpdateComponent', () => {
  let component: BarcodeTemplateUpdateComponent;
  let fixture: ComponentFixture<BarcodeTemplateUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeTemplateUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeTemplateUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
