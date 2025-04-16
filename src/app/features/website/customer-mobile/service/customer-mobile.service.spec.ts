import { TestBed } from '@angular/core/testing';

import { CustomerMobileService } from './customer-mobile.service';

describe('CustomerMobileService', () => {
  let service: CustomerMobileService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerMobileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
