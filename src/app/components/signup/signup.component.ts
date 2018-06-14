import { Component, OnInit } from '@angular/core';
import { Constant } from '../../common/constant';
import { AuthService } from '../../common/services/auth/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public emailRegEx: any = Constant.EMAIL_REG_EX;
  public passwordRegEx: any = Constant.PASSWORD_REG_EX;

  public noMatch: boolean;
  public newUser: any = {};
  public cfPass: string;

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
    this.cfPass = '';
    this.noMatch = false;
  }

  fnCheckPassword(password, cfPassword) {
    if (!cfPassword) {
      this.noMatch = false;
    } else {
      if (password !== cfPassword) {
        this.noMatch = true;
      } else {
        this.noMatch = false;
      }
    }
  }

  fnRegisterUser(newUser) {
    this.authService.signUp(newUser)
      .then((res) => {
        console.log(res);
      }).catch((error: any) => {

    });
  }

}
