import { Component, OnInit } from '@angular/core';
import { st } from '@angular/core/src/render3';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public noMatch: boolean;
  public newUser: any = {};
  public cfPass: string;

  constructor() {
  }

  ngOnInit() {
    this.cfPass = '';
    this.noMatch = false;
  }

  fnCheckPassword(password, cfPassword) {
    console.log(password, cfPassword);
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

  fnRegisterUser(form) {
    /* if (!this.isInvalid) {
       console.log(form.value);

       // form.value = {username: '', email: '', password: '', cpassword: ''};
     } else {
       console.log('Invalidation in Form.');
     }*/
  }

}
