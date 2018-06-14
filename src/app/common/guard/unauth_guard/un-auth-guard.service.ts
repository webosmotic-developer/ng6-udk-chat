import { Injectable } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { CanActivate, Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class UnAuthGuardService implements CanActivate {

  constructor(public authService: AuthService, public _router: Router) {
  }

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this._router.navigate(['signin']);
      return false;
    }
    return true;
  }
}
