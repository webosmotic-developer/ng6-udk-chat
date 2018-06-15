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
  public userArr: any;


  constructor(
    private authService: AuthService,
    private socketService: SocketService) {
    this.authUser = authService.getAuthUser();
    this.userArr = [];
  }

  ngOnInit() {
    /* making socket connection by passing UserId. */
    const socket: any = this.socketService.connectSocket(this.authUser.id);

    // calling getChatList() service method to get the chat list.
    this.socketService.getChatList(this.authUser.id)
      .then((res) => {
        this.userArr = res;
      }).catch((error: any) => {
    });
  }

}
