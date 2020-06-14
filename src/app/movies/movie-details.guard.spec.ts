import { TestBed } from '@angular/core/testing';

import { MovieDetailsGuard } from './movie-details.guard';

describe('MovieDetailsGuard', () => {
  let guard: MovieDetailsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(MovieDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
