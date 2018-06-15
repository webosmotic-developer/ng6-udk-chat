import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public noMatch: boolean;
  public userObj: any = {};

  constructor(private authService: AuthService, public _router: Router) {
  }

  ngOnInit() {
  }

  fnLogin(authObj) {
    this.authService.login(authObj)
      .then((res) => {
        this._router.navigate(['dashboard']);
      }).catch((error: any) => {

    });
  }

}
