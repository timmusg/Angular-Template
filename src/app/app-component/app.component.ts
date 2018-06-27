import { Component, OnInit } from '@angular/core';

import { OfflineCacheService } from '../services/offline-cache/offline-cache.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  constructor(
    private offlineCacheService: OfflineCacheService
  ) {}

  ngOnInit() {
    console.log('hello')
    this.offlineCacheService.createOfflineCache();
  }

}
