import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Constant } from '../../constant';
import { AuthLoginRequest, AuthRequest } from '../../interfaces/auth-request';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private _http: HttpClient,
              private jwtHelper: TokenService,
              public _router: Router) {
  }

  public isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(Constant.TOKEN_NAME);
      // Check whether the token is expired and return
      // true or false
      return !this.jwtHelper.isTokenExpired(token);
    }
  }

  public getAuthUser(): any {
    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem(Constant.TOKEN_NAME);
      if (token) {
        const tokenInfo = this.jwtHelper.parseJwt(token);
        return tokenInfo.data;
      } else {
        this._router.navigate(['signin']);
      }
    }
  }

  signUp(params: AuthRequest) {
    return new Promise((resolve, reject) => {
      this._http
        .post(Constant.API_URL + 'register', params)
        .subscribe((response: any) => {
          if (response && response.token) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem(Constant.TOKEN_NAME, response.token);
              console.log(this.jwtHelper.parseJwt(response.token));
            }
          }
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }

  login(params: AuthLoginRequest) {
    return new Promise((resolve, reject) => {
      this._http
        .post(Constant.API_URL + 'login', params)
        .subscribe((response: any) => {
          if (response && response.token) {
            if (isPlatformBrowser(this.platformId)) {
              localStorage.setItem(Constant.TOKEN_NAME, response.token);
              console.log(this.jwtHelper.parseJwt(response.token));
            }
          }
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
}
