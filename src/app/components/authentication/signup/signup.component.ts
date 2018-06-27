import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { MatInputModule } from '@angular/material';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { User } from '../../../models/user.model';

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent {

  signupForm: FormGroup;
  formSubmitted: boolean = false;

  constructor(
      private authenticationService: AuthenticationService,
      private fb: FormBuilder
  ) {
      this.createSignupForm();
  }

  createSignupForm() {
    this.signupForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [
        Validators.required,
        Validators.pattern(EMAIL_REGEX)
      ]],
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
    const user: User = {
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName
    };
    this.authenticationService.signup(user, 'ep')
    .subscribe(
      (data) => {
        console.log(data)
        if(data) this.formSubmitted = true;
      }
    );
    this.signupForm.reset();
  }
}
