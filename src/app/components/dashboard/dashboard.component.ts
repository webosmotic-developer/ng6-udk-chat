import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../common/services/auth/auth.service';
import { SocketService } from '../../common/services/socket/socket.service';
import { ChatListComponent } from '../chat-list/chat-list.component';
import {ConversationComponent} from '../conversation/conversation.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public authUser: any;
  public broadcastedMsg: any;
  public broadcastMsg: string;

  @ViewChild(ChatListComponent) chatListComponent: ChatListComponent;
  @ViewChild(ConversationComponent) conversationComponent: ConversationComponent;


  constructor(
    private authService: AuthService,
    private socketService: SocketService) {
    this.authUser = authService.getAuthUser();
  }

  ngOnInit() {
    /* making socket connection by passing UserId. */
    const socket: any = this.socketService.connectSocket(this.authUser.id);
    // calling getChatList() service method to get the chat list.
    /*  this.socketService.getChatList(this.authUser.id)
        .then((res) => {
          this.userArr = res;
        }).catch((error: any) => {
      });*/

  }

  ngAfterViewInit() {
    /* calling getChatList() service method to get the chat list. */
    this.socketService.getChatList(this.authUser.id).subscribe((chatListResponse: any) => {
      // console.log(chatListResponse.chatList);
      // this.overlayDisplay = false;
      this.chatListComponent.getChatList(chatListResponse, this.authUser.id);
    });
    this.conversationComponent.listenForMessages(this.authUser.id);
  }

  fnBroadcast(msg?: string) {

    if (msg === '' || msg === undefined || msg === null) {
      alert('There is nothing to broadcast.');
    } else {

      this.socketService.broadcastMsg(msg).subscribe((BroadcastResponse: any) => {
        alert(BroadcastResponse.data);
      });
      /* this.broadcastMsg = '';
       this.broadcastedMsg = this.socketService.receiveMessages();*/
    }
  }
}
