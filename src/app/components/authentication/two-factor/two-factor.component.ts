import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { User } from '../../../models/user.model';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { UserSettingsService } from '../../../services/user-settings/user-settings.service';

@Component({
  selector: 'app-two-factor',
  templateUrl: './two-factor.component.html',
  styleUrls: ['./two-factor.component.scss']
})
export class TwoFactorComponent implements OnInit {

  myForm: FormGroup;
  public wrongCode: boolean = false;
  @Input() email: string;
  @Input() password: string;

  constructor(
    private userSettingsService: UserSettingsService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      code: new FormControl(null, [
        Validators.required
      ])
    })
  }

  onSubmit() {
    this.userSettingsService.confirmCode(this.myForm.value.code, this.email, false)
    .subscribe((data) => {
      if(data.body) {
        this.initiateLogin();
      } else {
        this.wrongCode = true;
      }
    });
  }

  initiateLogin() {
    const user:User = { email: this.email, password: this.password };
    this.authenticationService.login(user)
    .subscribe(
      data => {
        this.authenticationService.setLocalStorage(data);
        this.router.navigateByUrl('/');
      },
      error => console.error(error)
    );
  }
}
