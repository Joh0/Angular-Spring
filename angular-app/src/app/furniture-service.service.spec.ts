import { TestBed } from '@angular/core/testing';

import { FurnitureServiceService } from './furniture-service.service';

describe('FurnitureServiceService', () => {
  let service: FurnitureServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FurnitureServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
