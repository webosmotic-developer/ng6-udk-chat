import { Injectable } from '@angular/core';
import { Constant } from '../../constant';
import { AuthRequest } from '../../interfaces/auth-request';
import { HttpClient } from '@angular/common/http';
import { TokenService } from '../token/token.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token;

  constructor(private _http: HttpClient, private jwtHelper: TokenService) {
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem(Constant.TOKEN_NAME);

    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  signUp(params: AuthRequest) {
    return new Promise((resolve, reject) => {
      this._http
        .post(Constant.API_URL + 'register', params)
        .subscribe((response: any) => {
          if (response && response.token) {
            localStorage.setItem(Constant.TOKEN_NAME, response.token);
            console.log(this.jwtHelper.parseJwt(response.token));
          }
          resolve(response);
        }, (error) => {
          reject(error);
        });
    });
  }
}
