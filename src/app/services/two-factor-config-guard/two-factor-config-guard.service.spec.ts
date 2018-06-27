import { TestBed, inject } from '@angular/core/testing';

import { TwoFactorConfigGuardService } from './two-factor-config-guard.service';

describe('TwoFactorConfigGuardService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TwoFactorConfigGuardService]
    });
  });

  it('should be created', inject([TwoFactorConfigGuardService], (service: TwoFactorConfigGuardService) => {
    expect(service).toBeTruthy();
  }));
});
