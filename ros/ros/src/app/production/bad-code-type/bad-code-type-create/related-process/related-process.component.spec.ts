import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatedProcessComponent } from './related-process.component';

describe('RelatedProcessComponent', () => {
  let component: RelatedProcessComponent;
  let fixture: ComponentFixture<RelatedProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelatedProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelatedProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
