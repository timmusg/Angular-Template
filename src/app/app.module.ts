import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from  '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule,MatCheckboxModule,MatDatepickerModule,MatInputModule,MatRadioModule,MatSelectModule,MatSliderModule,MatSlideToggleModule,MatMenuModule,MatSidenavModule,MatToolbarModule,MatListModule,MatGridListModule,MatCardModule,MatTabsModule,MatButtonModule,MatButtonToggleModule,MatChipsModule,MatIconModule,MatProgressSpinnerModule,MatProgressBarModule,MatDialogModule,MatTooltipModule,MatSnackBarModule,MatTableModule} from '@angular/material';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import 'hammerjs';
import { SwiperModule } from '../../node_modules/angular2-useful-swiper';

import { AppComponent } from './app-component/app.component';
import { routedComponents, AppRoutingModule } from './app-routing.module';
import { StoreRouterConnectingModule, RouterStateSerializer } from '@ngrx/router-store';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { reducers, effects, CustomSerializer } from './store';

/* Services Start */

import { ServerLinkService } from './services/server-link.service';
import { OfflineCacheService } from './services/offline-cache/offline-cache.service';
import { AuthErrorService } from './services/auth-error/auth-error.service';
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserSettingsService } from './services/user-settings/user-settings.service';
import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { TwoFactorConfigGuardService } from './services/two-factor-config-guard/two-factor-config-guard.service';
import { ForgotPasswordService } from './services/forgot-password/forgot-password.service';
import { ApiCallService } from './services/api-call.service';

/* Services End */

// Component Start

//Authentication
import { AuthenticationComponent } from './components/authentication/authentication.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { SidenavComponent } from './components/topnav/sidenav/sidenav.component';
import { AuthErrorComponent, AuthErrorDialog } from './components/authentication/auth-error/auth-error.component';

//Company Search
import { MainComponent } from './components/main/main.component';

//Pages
import { SettingsComponent } from './components/pages/settings/settings.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

//Navigation
import { TopnavComponent } from './components/topnav/topnav.component';
import { TwoFactorComponent } from './components/authentication/two-factor/two-factor.component';
import { TwoFactorConfigComponent } from './components/pages/two-factor-config/two-factor-config.component';

//Component End

@NgModule({
  declarations: [
    AppComponent,
    routedComponents,
    AuthenticationComponent,
    LoginComponent,
    AuthErrorComponent,
    AuthErrorDialog,
    SettingsComponent,
    MainComponent,
    PageNotFoundComponent,
    TopnavComponent,
    TwoFactorComponent,
    TwoFactorConfigComponent,
    SignupComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    SidenavComponent
  ],
  entryComponents: [
    AuthErrorDialog
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatChipsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatTooltipModule,
    MatSnackBarModule,
    HttpModule,
    HttpClientModule,
    MatTableModule,
    NgxDatatableModule,
    SwiperModule,
    StoreModule.forFeature('app', reducers),
    EffectsModule.forFeature(effects),
    StoreRouterConnectingModule
  ],
  providers: [
    AuthenticationService,
    AuthErrorService,
    ServerLinkService,
    OfflineCacheService,
    UserSettingsService,
    AuthGuardService,
    TwoFactorConfigGuardService,
    ForgotPasswordService,
    ApiCallService,
    {provide: RouterStateSerializer, useClass: CustomSerializer}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
