import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointemntDecoraterComponent } from './appointemnt-decorater.component';

describe('AppointemntDecoraterComponent', () => {
  let component: AppointemntDecoraterComponent;
  let fixture: ComponentFixture<AppointemntDecoraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AppointemntDecoraterComponent]
    });
    fixture = TestBed.createComponent(AppointemntDecoraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
