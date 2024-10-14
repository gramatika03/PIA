import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OwnerMaintenenceComponent } from './owner-maintenence.component';

describe('OwnerMaintenenceComponent', () => {
  let component: OwnerMaintenenceComponent;
  let fixture: ComponentFixture<OwnerMaintenenceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OwnerMaintenenceComponent]
    });
    fixture = TestBed.createComponent(OwnerMaintenenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
