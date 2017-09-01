import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefectCodeUpdataComponent } from './defect-code-updata.component';

describe('DefectCodeUpdataComponent', () => {
  let component: DefectCodeUpdataComponent;
  let fixture: ComponentFixture<DefectCodeUpdataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefectCodeUpdataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefectCodeUpdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
