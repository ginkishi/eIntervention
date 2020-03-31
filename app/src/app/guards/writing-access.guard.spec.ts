import { TestBed } from '@angular/core/testing';

import { WritingAccessGuard } from './writing-access.guard';

describe('WritingAccessGuard', () => {
  let guard: WritingAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WritingAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
