import { TestBed } from '@angular/core/testing';

import { CalendarioDatabaseService } from './calendario-database.service';

describe('CalendarioDatabaseService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CalendarioDatabaseService = TestBed.get(CalendarioDatabaseService);
    expect(service).toBeTruthy();
  });
});
