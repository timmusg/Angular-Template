import { TestBed, inject } from '@angular/core/testing';

import { AuthErrorService } from './auth-error.service';

describe('AuthErrorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthErrorService]
    });
  });

  it('should be created', inject([AuthErrorService], (service: AuthErrorService) => {
    expect(service).toBeTruthy();
  }));
});
