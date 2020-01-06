import { TestBed } from '@angular/core/testing';

import { AvisoDatabaseService } from './aviso-database.service';

describe('AvisoDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AvisoDatabaseService = TestBed.get(AvisoDatabaseService);
    expect(service).toBeTruthy();
  });
});
