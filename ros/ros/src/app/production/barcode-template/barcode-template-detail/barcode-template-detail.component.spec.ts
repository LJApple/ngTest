import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarcodeTemplateDetailComponent } from './barcode-template-detail.component';

describe('BarcodeTemplateDetailComponent', () => {
  let component: BarcodeTemplateDetailComponent;
  let fixture: ComponentFixture<BarcodeTemplateDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BarcodeTemplateDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarcodeTemplateDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
