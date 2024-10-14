import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerAppointmentComponent } from './owner-appointment.component';

describe('OwnerAppointmentComponent', () => {
  let component: OwnerAppointmentComponent;
  let fixture: ComponentFixture<OwnerAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerAppointmentComponent]
    });
    fixture = TestBed.createComponent(OwnerAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
