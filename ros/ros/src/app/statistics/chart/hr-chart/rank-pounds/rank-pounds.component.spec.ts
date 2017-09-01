import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankPoundsComponent } from './rank-pounds.component';

describe('RankPoundsComponent', () => {
  let component: RankPoundsComponent;
  let fixture: ComponentFixture<RankPoundsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankPoundsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankPoundsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
