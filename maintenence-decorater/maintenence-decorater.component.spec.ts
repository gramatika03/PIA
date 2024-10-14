import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaintenenceDecoraterComponent } from './maintenence-decorater.component';

describe('MaintenenceDecoraterComponent', () => {
  let component: MaintenenceDecoraterComponent;
  let fixture: ComponentFixture<MaintenenceDecoraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MaintenenceDecoraterComponent]
    });
    fixture = TestBed.createComponent(MaintenenceDecoraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
