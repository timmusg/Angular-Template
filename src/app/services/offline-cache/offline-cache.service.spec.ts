import { TestBed, inject } from '@angular/core/testing';

import { OfflineCacheService } from './offline-cache.service';

describe('OfflineCacheService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfflineCacheService]
    });
  });

  it('should be created', inject([OfflineCacheService], (service: OfflineCacheService) => {
    expect(service).toBeTruthy();
  }));
});
