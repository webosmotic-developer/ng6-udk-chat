import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../common/services/auth/auth.service';
import { SocketService } from '../../common/services/socket/socket.service';
import { ChatListComponent } from '../chat-list/chat-list.component';
import {ConversationComponent} from '../conversation/conversation.component';
import {EmitterService} from '../../common/services/emitter/emitter.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  public authUser: any;
  public broadcastMsg: string;
  public isShowBoard: boolean;
  public selectedUser: any;
  public messages: any[] = [];
  public conversation = 'CONVERSATION';
  public selectedUserInfo = 'SELECTEDUSERINFO';

  @ViewChild(ChatListComponent) chatListComponent: ChatListComponent;
  @ViewChild(ConversationComponent) conversationComponent: ConversationComponent;


  constructor(
    private authService: AuthService,
    private socketService: SocketService) {
    this.authUser = authService.getAuthUser();
    this.isShowBoard = false;
  }

  ngOnInit() {
    /* making socket connection by passing UserId. */
    const socket: any = this.socketService.connectSocket(this.authUser.id);

  }

  listenBroadcast(): void {
    this.socketService.receiveBroadcast().subscribe((broadcastResponse: any) => {
      alert(broadcastResponse.data);
    });
  }

  ngAfterViewInit() {
    /* calling getChatList() service method to get the chat list. */
    this.socketService.getChatList(this.authUser.id).subscribe((chatListResponse: any) => {
      // console.log(chatListResponse.chatList);
      // this.overlayDisplay = false;
      this.chatListComponent.getChatList(chatListResponse, this.authUser.id);
    });
    EmitterService.get(this.selectedUserInfo).subscribe((selectedUser: any) => {
      this.selectedUser = selectedUser;
      // move scroll to bottom of the chat list
      setTimeout(() => {
        document.querySelector(`.chat-history`).scrollTop = document.querySelector(`.chat-history`).scrollHeight;
      }, 100);
    });

    EmitterService.get(this.conversation).subscribe((data: any) => {
      this.messages = data.messages;
    });

    this.conversationComponent.listenForMessages(this.authUser.id);
    this.conversationComponent.listenTyping(this.authUser.id);
    this.listenBroadcast();
  }

  fnShowBoard(showBoard) {
    this.isShowBoard = !this.isShowBoard;
  }


  fnBroadcast(event) {
    if (event.type === 'click' || event.keyCode === 13) {
      const msg = this.broadcastMsg;
      if (msg === '' || msg === undefined || msg === null) {
        alert('There is nothing to broadcast.');
      } else {
        this.socketService.broadcastMsg(msg);
        this.broadcastMsg = '';
      }
    }
  }
}
