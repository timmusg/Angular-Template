import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from '../../services/authentication/authentication.service';

/* Services Start -> Put Services Here */
/* Services End */

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public showMain: boolean = false;

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    // *FIX
    this.showMain = this.authenticationService.getSigninStatus();
    this.authenticationService.signinEmitter
    .subscribe(response => {
      this.showMain = response;
    });
  }


}
