import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Constant } from '../../constant';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public authUser: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object,
              private authService: AuthService,
              public _router: Router) {
    this.authUser = authService.getAuthUser();
  }

  ngOnInit() {
  }

  fnLogout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(Constant.TOKEN_NAME);
      this._router.navigate(['signin']);
    }
  }

}
