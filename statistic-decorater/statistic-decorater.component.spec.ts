import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticDecoraterComponent } from './statistic-decorater.component';

describe('StatisticDecoraterComponent', () => {
  let component: StatisticDecoraterComponent;
  let fixture: ComponentFixture<StatisticDecoraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatisticDecoraterComponent]
    });
    fixture = TestBed.createComponent(StatisticDecoraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
