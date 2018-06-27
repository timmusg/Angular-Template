import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UserSettingsService } from '../../../services/user-settings/user-settings.service';

@Component({
  selector: 'app-two-factor-config',
  templateUrl: './two-factor-config.component.html',
  styleUrls: ['./two-factor-config.component.scss']
})
export class TwoFactorConfigComponent implements OnInit {
  public qrcode = '';
  public wrongCode: boolean = false;
  myForm: FormGroup;

  constructor (
    private userSettingsService: UserSettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.myForm = new FormGroup({
      code: new FormControl(null, [
        Validators.required
      ])
    })
    localStorage.setItem('two_factor_config', 'false');
    this.qrcode = this.userSettingsService.getQRCode();
    this.userSettingsService.qrcodeEmitter.subscribe(qrcode => {
      this.qrcode = qrcode;
    })
  }

  onSubmit() {
    let email = localStorage.getItem('email');
    this.userSettingsService.confirmCode(this.myForm.value.code, email, true)
    .subscribe((data) => {
      if(data.body) {
        let settings = JSON.parse(localStorage.getItem('settings'));
        settings.two_factor_auth = "1";
        localStorage.setItem('settings', JSON.stringify(settings));
        this.router.navigateByUrl('/settings');
      } else {
        this.wrongCode = true;
      }
    });
  }

}
