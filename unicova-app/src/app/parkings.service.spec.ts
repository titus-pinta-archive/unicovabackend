import { TestBed } from '@angular/core/testing';

import { ParkingsService } from './parkings.service';

describe('ParkingsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ParkingsService = TestBed.get(ParkingsService);
    expect(service).toBeTruthy();
  });
});
