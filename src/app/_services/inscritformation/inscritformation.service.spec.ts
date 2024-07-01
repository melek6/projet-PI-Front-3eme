import { TestBed } from '@angular/core/testing';

import { InscritformationService } from './inscritformation.service';

describe('InscritformationService', () => {
  let service: InscritformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InscritformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
