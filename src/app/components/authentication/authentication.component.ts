import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { AuthenticationService } from '../../services/authentication/authentication.service';

declare var gapi: any;

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  userName: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private location: Location
  ) { }

  isLoggedIn() {
     this.userName = localStorage.getItem('firstName');
     return this.authenticationService.isLoggedIn();
   }

   onLogout() {
     this.authenticationService.logout();

     if(gapi && gapi.auth2) {
       var GoogleAuth = gapi.auth2.getAuthInstance();
       GoogleAuth.signOut();
     }

     this.router.navigate(['/']);
     this.location.replaceState('/');
   }

  ngOnInit() {}

}
