import { TestBed } from '@angular/core/testing';

import { MaintenenceService } from './maintenence.service';

describe('MaintenenceService', () => {
  let service: MaintenenceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MaintenenceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
