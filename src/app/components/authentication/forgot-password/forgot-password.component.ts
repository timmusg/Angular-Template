import { ForgotPasswordService } from './../../../services/forgot-password/forgot-password.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationService } from './../../../services/authentication/authentication.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  myForm: FormGroup;
  emailSent: boolean = false;

  constructor(
    private authenticationService: AuthenticationService,
    private forgotPasswordService: ForgotPasswordService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email
      ])
    });
  }

  onSubmit(){
    this.forgotPasswordService.sendEmail(this.myForm.value.email)
    .subscribe( data => {
      console.log(data)
      if(data.message === "Reset password email successfully sent") {
        this.emailSent = true;
      }
    })
  }

  isLoggedIn() {
    if(this.authenticationService.isLoggedIn()) this.router.navigate(['/']);
    return this.authenticationService.isLoggedIn();
  }

}
