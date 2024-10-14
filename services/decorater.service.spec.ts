import { TestBed } from '@angular/core/testing';

import { DecoraterService } from './decorater.service';

describe('DecoraterService', () => {
  let service: DecoraterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DecoraterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
