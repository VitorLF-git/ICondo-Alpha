import { TestBed } from '@angular/core/testing';

import { CondominioDatabaseService } from './condominio-database.service';

describe('CondominioDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CondominioDatabaseService = TestBed.get(CondominioDatabaseService);
    expect(service).toBeTruthy();
  });
});
