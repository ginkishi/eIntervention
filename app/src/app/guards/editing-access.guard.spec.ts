import { TestBed } from '@angular/core/testing';

import { EditingAccessGuard } from './editing-access.guard';

describe('EditingAccessGuard', () => {
  let guard: EditingAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(EditingAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
