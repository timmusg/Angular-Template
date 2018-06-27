import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import {Observable} from 'rxjs/Observable';

import { Store } from '@ngrx/store';

import * as fromStore from '../../../store';

import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication/authentication.service';

import googleApiLoader from '../../../../../google-api-loader';

declare var gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  myForm: FormGroup;
  public twoFactor: boolean = false;
  public email: boolean;
  public password: boolean;
  private canCall: boolean = true;
  public sub: any;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<fromStore.UserState>
  ) {}

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ]),
      password: new FormControl(null, [
        Validators.required
      ])
    })
  }

  onSubmit(){
    const user:User = { email: this.myForm.value.email, password: this.myForm.value.password };
    const delay = 2000;

    if (this.canCall) {
      this.canCall = false;

      this.authenticationService.login(user)
      .subscribe(data => {
        this.initiatePostLogin(data)
      }, error => console.error(error));

      setTimeout(() => {
        this.canCall = true;
      }, delay)
    }
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  initiatePostLogin(data) {
    let twoFactorNecessary = '';
    if(data.settings) {
      twoFactorNecessary = data.settings.two_factor_auth;
    }
    if(twoFactorNecessary != "1") {
      this.authenticationService.setLocalStorage(data);
      this.store.dispatch({
        type: 'LOAD_USER_DATA',
        payload: data
      })

      this.router.navigateByUrl('/');
    } else {
      this.email = this.myForm.value.email;
      this.password = this.myForm.value.password;
      this.twoFactor = true;
    }
  }

  // loginGoogle() {
  //   let that = this;
  //   gapi.load('client:auth2', this.initializeClient.bind(that));
  // }
  //
  // initializeClient() {
  //   googleApiLoader.authLoaded(() => {
  //     gapi.auth2.getAuthInstance()
  //     .then(GoogleAuth => {
  //       if(GoogleAuth.isSignedIn.get() == false) {
  //         GoogleAuth.signIn({'ux_mode': 'popup'})
  //         .then(data => {
  //           this.performLoginGoogle(GoogleAuth)
  //         });
  //       } else {
  //         this.performLoginGoogle(GoogleAuth)
  //       }
  //     });
  //   });
  //   googleApiLoader.clientsLoaded(() => {});
  // }
  //
  // performLoginGoogle(GoogleAuth) {
  //   var GoogleUser = GoogleAuth.currentUser.get();
  //   let GoogleUserProfile = GoogleUser.getBasicProfile();
  //
  //   const delay = 2000;
  //
  //   if (this.canCall) {
  //     this.canCall = false;
  //
  //     this.authenticationService.loginGoogle(GoogleUserProfile.getEmail(), GoogleUserProfile.getGivenName(), GoogleUserProfile.getFamilyName())
  //     .subscribe(
  //       data => {
  //         this.authenticationService.setLocalStorage(data);
  //
  //         this.router.navigateByUrl('/');
  //       },
  //       error => console.error(error)
  //     );
  //
  //     setTimeout(() => {
  //       this.canCall = true;
  //     }, delay)
  //   }
  // }

}
