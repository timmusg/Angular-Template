import { Component, OnInit, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, state, style, transition, animate} from '@angular/animations';

import { AuthenticationService } from '../../../services/authentication/authentication.service';
// import { CompanyInDbService } from '../../../services/company-in-db/company-in-db.service';
// import { CompanyNameService } from '../../../services/company-name.service';

declare var gapi: any;

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ],
  host: {
    '(document:click)': 'toggleMenu($event)',
  },
})
export class SidenavComponent implements OnInit {

  @Input() sidenavVisible: boolean;
  @Output() getSidenavVisibleChange = new EventEmitter<boolean>();
  public menuState: string = 'in';
  userEmail: string = '';
  username: string = '';
  lastname: string = '';
  public logo: string = '';
  companyName: string = '';

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private _eref: ElementRef,
  //   private companyInDbService: CompanyInDbService,
  //   private companyNameService: CompanyNameService
  ) { }

  ngOnInit() {
    this.userEmail = JSON.parse(localStorage.getItem('settings'))['email'];
    this.username = JSON.parse(localStorage.getItem('settings'))['first_name'];
    this.lastname = JSON.parse(localStorage.getItem('settings'))['last_name'];

    let companyid = Number(localStorage.getItem('companyId'));
    // this.companyName = this.companyNameService.getCompanyName();
    // this.companyNameService.companyNameEmitter
    // .subscribe(companyName => {
    //   this.companyName = companyName;
    // })
  }

  onLogout() {
    this.closeSidenav();
    this.authenticationService.logout();

    if(gapi && gapi.auth2) {
      var GoogleAuth = gapi.auth2.getAuthInstance();
      GoogleAuth.signOut();
    }

    this.router.navigate(['/']);
  }

  toggleMenu(event) {
    if (!this._eref.nativeElement.contains(event.target) && event.srcElement.classList[0] === "nav-menu") {
      this.toggleLogic();
    } else if (!this._eref.nativeElement.contains(event.target) && this.sidenavVisible === true) {
      this.toggleLogic();
    }
  }

  toggleLogic() {
    this.sidenavVisible = !this.sidenavVisible
    this.getSidenavVisibleChange.emit(this.sidenavVisible);
    this.menuState = this.menuState === 'out' ? 'in' : 'out';
  }

  closeSidenav() {
    this.sidenavVisible = false;
    this.getSidenavVisibleChange.emit(this.sidenavVisible);
    if (this.menuState = 'in') this.menuState === 'out';
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

}
