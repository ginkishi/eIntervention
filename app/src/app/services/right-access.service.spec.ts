import { TestBed } from '@angular/core/testing';

import { RightAccessService } from './right-access.service';

describe('RightAccessService', () => {
  let service: RightAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RightAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
