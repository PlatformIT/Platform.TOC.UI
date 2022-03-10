import { TestBed } from '@angular/core/testing';

import { DeservedService } from './deserved.service';

describe('DeservedService', () => {
  let service: DeservedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DeservedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
