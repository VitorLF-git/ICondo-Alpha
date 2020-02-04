import { TestBed } from '@angular/core/testing';

import { GarageDatabaseService } from './garage-database.service';

describe('GarageDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GarageDatabaseService = TestBed.get(GarageDatabaseService);
    expect(service).toBeTruthy();
  });
});
