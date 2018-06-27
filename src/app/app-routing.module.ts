import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { AuthErrorComponent } from './components/authentication/auth-error/auth-error.component';
import { SettingsComponent } from './components/pages/settings/settings.component';
import { TwoFactorConfigComponent } from './components/pages/two-factor-config/two-factor-config.component';
import { SignupComponent } from './components/authentication/signup/signup.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { PageNotFoundComponent } from './components/pages/page-not-found/page-not-found.component';

import { AuthGuardService } from './services/auth-guard/auth-guard.service';
import { TwoFactorConfigGuardService } from './services/two-factor-config-guard/two-factor-config-guard.service';

const routes: Routes = [
	{ path: '', component: MainComponent },
  { path:'auth-error', component: AuthErrorComponent },
	{ path:'settings', component: SettingsComponent, canActivate: [AuthGuardService]},
	{ path:'two-factor-config', component: TwoFactorConfigComponent, canActivate: [AuthGuardService, TwoFactorConfigGuardService]},
  { path:'signup', component: SignupComponent },
	{ path:'forgot-password', component: ForgotPasswordComponent },
	{ path:'reset-password', component: ResetPasswordComponent },
	{ path:'not-found', component: PageNotFoundComponent },
  { path:'**', redirectTo: '/not-found' }
]

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { useHash: true }),
	],
	exports: [
		RouterModule,
	]
})
export class AppRoutingModule { }

export const routedComponents: any[] = [
  MainComponent,
	AuthErrorComponent,
	SettingsComponent,
  TwoFactorConfigComponent,
  PageNotFoundComponent,
  ForgotPasswordComponent,
  SignupComponent,
  ResetPasswordComponent
];
