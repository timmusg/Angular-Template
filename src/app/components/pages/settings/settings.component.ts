import { Component, OnInit } from '@angular/core';
import { UserSettingsService } from '../../../services/user-settings/user-settings.service';

import {Router} from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  public settings: any;
  public company: boolean = false;
  public twoFactorConfig: boolean = false;

  constructor(
    private userSettingsService: UserSettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.settings = JSON.parse(localStorage.getItem('settings'));
  }

  toggleTwoFactorAuth(event) {
    this.userSettingsService.toggleSetting('two_factor_auth').subscribe(data => {
      if(data && data.body && data.body[0].two_factor_secret == 'null' && event.checked) {
        localStorage.setItem('two_factor_config', 'true');
        this.router.navigate(['/two-factor-config']);
      } else if (this.settings) {
        this.settings.two_factor_auth = (this.settings.two_factor_auth == "0" ? "1" : "0");
        localStorage.setItem('settings', JSON.stringify(this.settings));
        this.company = true;
      }
    });
  }
}
