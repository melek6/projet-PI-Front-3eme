import { TestBed } from '@angular/core/testing';

import { ResetmdpService } from './resetmdp.service';

describe('ResetmdpService', () => {
  let service: ResetmdpService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ResetmdpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
