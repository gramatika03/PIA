import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecoraterComponent } from './decorater.component';

describe('DecoraterComponent', () => {
  let component: DecoraterComponent;
  let fixture: ComponentFixture<DecoraterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DecoraterComponent]
    });
    fixture = TestBed.createComponent(DecoraterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
