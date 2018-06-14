import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public noMatch: boolean;
  public userObj: any = {};

  constructor(private authService: AuthService) {
  }

  ngOnInit() {
  }

  fnLogin(newUser) {
    this.authService.signUp(newUser)
      .then((res) => {
        console.log(res);
      }).catch((error: any) => {

    });
  }

}
