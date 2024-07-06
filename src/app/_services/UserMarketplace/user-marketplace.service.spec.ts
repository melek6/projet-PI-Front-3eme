import { TestBed } from '@angular/core/testing';

import { UserMarketplaceService } from './user-marketplace.service';

describe('UserMarketplaceService', () => {
  let service: UserMarketplaceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserMarketplaceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
