import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { AuthenticationService } from './../../../services/authentication/authentication.service';
import { User } from '../../../models/user.model';
import { environment } from '../../../../environments/environment';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent {

  resetPasswordForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.createSignupForm();
   }

  createSignupForm() {
    this.resetPasswordForm = this.fb.group({
      password: [null, [
        Validators.required,
        Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")
      ]],
      confirmPassword: [null, [
        Validators.required
      ]],
    }, {
      validator: this.authenticationService.MatchPassword
    });
  }

  submitForm(){
    let token;
    let password;

    this.activatedRoute.queryParams
    .subscribe((params: Params) => {
      token = params['token'];
      password = this.resetPasswordForm.value.password;

      this.authenticationService.resetPassword(password, token)
      .subscribe( data => {
        this.router.navigate(['/']);
      } );

    });

    this.resetPasswordForm.reset();
    this.formSubmitted = true;
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

}
