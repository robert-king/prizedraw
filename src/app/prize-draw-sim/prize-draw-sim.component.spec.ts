import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrizeDrawSimComponent } from './prize-draw-sim.component';

describe('PrizeDrawSimComponent', () => {
  let component: PrizeDrawSimComponent;
  let fixture: ComponentFixture<PrizeDrawSimComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrizeDrawSimComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrizeDrawSimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
