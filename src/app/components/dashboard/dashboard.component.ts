import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../common/services/auth/auth.service';
import { SocketService } from '../../common/services/socket/socket.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public authUser: any;

  constructor(private authService: AuthService, private socketService: SocketService) {
    this.authUser = authService.getAuthUser();
  }

  ngOnInit() {
    console.log(this.authUser);
    /* making socket connection by passing UserId. */
    this.socketService.connectSocket(this.authUser.id);
  }

}
