import { TestBed } from '@angular/core/testing';

import { ExportAccessGuard } from './export-access.guard';

describe('ExportAccessGuard', () => {
  let guard: ExportAccessGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ExportAccessGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
