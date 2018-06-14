import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgInitDirective } from './common/directives/ng-init.directive';
import { SignupComponent } from './components/signup/signup.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './common/services/auth/auth.service';
import { LoginComponent } from './components/login/login.component';
import { TokenService } from './common/services/token/token.service';
import { AuthGuardService } from './common/guard/auth_guard/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';

export const APP_ID = 'my-app';

@NgModule({
  declarations: [
    AppComponent,
    NgInitDirective,
    SignupComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: APP_ID}),
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    TokenService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
