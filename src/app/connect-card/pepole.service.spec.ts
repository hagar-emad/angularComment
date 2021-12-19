import { TestBed } from '@angular/core/testing';

import { PepoleService } from './pepole.service';

describe('PepoleService', () => {
  let service: PepoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PepoleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
