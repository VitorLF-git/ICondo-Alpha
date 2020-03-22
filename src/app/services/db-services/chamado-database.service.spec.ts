import { TestBed } from '@angular/core/testing';

import { ChamadoDatabaseService } from './chamado-database.service';

describe('ChamadoDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChamadoDatabaseService = TestBed.get(ChamadoDatabaseService);
    expect(service).toBeTruthy();
  });
});
