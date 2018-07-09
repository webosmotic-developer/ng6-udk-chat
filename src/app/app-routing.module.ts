import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService as AuthGuard } from './common/guard/auth_guard/auth-guard.service';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/main/main.component';
import { UnAuthGuardService as UnauthGuard } from './common/guard/unauth_guard/un-auth-guard.service';

const routes: Routes = [
  {
    path: 'signup', component: SignupComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: 'signin', component: LoginComponent,
    canActivate: [UnauthGuard]
  },
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {useHash: true})
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {
}
