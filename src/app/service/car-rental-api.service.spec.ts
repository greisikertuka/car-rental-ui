import { TestBed } from '@angular/core/testing';

import { CarRentalApi } from './car-rental-api.service';

describe('ApiServiceService', () => {
  let service: CarRentalApi;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarRentalApi);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
