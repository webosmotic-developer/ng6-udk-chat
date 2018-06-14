import { TestBed, inject } from '@angular/core/testing';

import { UnAuthGuardService } from './un-auth-guard.service';

describe('UnAuthGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UnAuthGuardService]
    });
  });

  it('should be created', inject([UnAuthGuardService], (service: UnAuthGuardService) => {
    expect(service).toBeTruthy();
  }));
});
