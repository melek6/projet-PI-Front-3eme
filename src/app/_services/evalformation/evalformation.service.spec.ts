import { TestBed } from '@angular/core/testing';

import { EvalformationService } from './evalformation.service';

describe('EvalformationService', () => {
  let service: EvalformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvalformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
