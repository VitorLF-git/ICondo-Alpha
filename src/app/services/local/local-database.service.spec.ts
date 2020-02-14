import { TestBed } from '@angular/core/testing';

import { LocalDatabaseService } from './local-database.service';

describe('LocalDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalDatabaseService = TestBed.get(LocalDatabaseService);
    expect(service).toBeTruthy();
  });
});
