import { TestBed } from '@angular/core/testing';

import { PortariaDatabaseService } from './portaria-database.service';

describe('PortariaDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PortariaDatabaseService = TestBed.get(PortariaDatabaseService);
    expect(service).toBeTruthy();
  });
});
