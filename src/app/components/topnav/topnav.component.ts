import { Component, OnInit } from '@angular/core';

// import { CompanySearchService } from '../../services/company-search/company-search.service';
// import { CompanyInDbService } from '../../services/company-in-db/company-in-db.service';
import { AuthenticationService } from '../../services/authentication/authentication.service';
// import { SaveCompanyDataService } from '../../services/save-company-data/save-company-data.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {

  public companyLoading: boolean = false;
  public logo: string = '';
  public sidenavVisible: boolean = false;
  public subroute: boolean = false;

  constructor(
    // private companySearchService: CompanySearchService,
    // private companyInDbService: CompanyInDbService,
    private authenticationService: AuthenticationService,
    // private saveCompanyDataService: SaveCompanyDataService
  ) { }

  ngOnInit() {
    // this.companySearchService.companyLoadingEmitter
    // .subscribe((companyLoading) => {
    //   this.companyLoading = companyLoading;
    // })
    //
    // let companyid = Number(localStorage.getItem('companyId'));
    //
    // this.saveCompanyDataService.routeTypeEmitter
    // .subscribe(routeType => {
    //   if(routeType == 'subroute') this.subroute = true;
    //   else this.subroute = false;
    // })
  }

  isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  toggledFromSidenav(event) {
    this.sidenavVisible = event;
  }

  changeRouteType() {
    // this.saveCompanyDataService.changeRouteType('mainroute');
  }

}
