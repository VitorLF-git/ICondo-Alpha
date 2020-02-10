import { TestBed } from '@angular/core/testing';

import { BuildingDatabaseService } from './building-database.service';

describe('BuildingDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BuildingDatabaseService = TestBed.get(BuildingDatabaseService);
    expect(service).toBeTruthy();
  });
});
