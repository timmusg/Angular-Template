import { Injectable } from '@angular/core';

import Dexie from 'dexie';

@Injectable()
export class OfflineCacheService {

  public offlineCache: any;

  constructor() { }

  createOfflineCache() {
    this.offlineCache = new Dexie('enterpriseProfilerDB');

    this.offlineCache.version(1).stores({
      //Not in use anymore (replaced with clearbit domain)
      // bingDomainStore: 'company_name',
      bingNewsStore: 'company_name',
      builtwithStore: 'domain',
      clearbitStore: 'domain',
      clearbitDomainStore: 'company_name',
      fullContactStore: 'domain',
      fullContactLocationsStore: 'email',
      hunterStore: 'domain',
      networkFinderStore: 'address',
      companyBuildingsStore: 'company_name',
      userBuildingsStore: 'company_id',
      buildingIntersectionsStore: 'compound_key'
    });
  }

  putRecord(storeName, data) {
    this.offlineCache[storeName].put(data);
  }

}
