import {Component, Input, OnInit} from '@angular/core';
import { AuthService } from '../../common/services/auth/auth.service';
import { SocketService } from '../../common/services/socket/socket.service';
import {EmitterService} from '../../common/services/emitter/emitter.service';
import {ChatService} from '../../common/services/chat-service/chat.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {
  private userId: string = null;
  public chatListUsers: any = [];
  public selectedUserId: any;

  @Input() conversation: string;
  @Input() selectedUserInfo: string;


  constructor(private authService: AuthService,
              private socketService: SocketService, private chatService: ChatService) {
  }

  ngOnInit() {
  }

  getChatList(socketIOResponse: any, userId: string): void {
    this.userId = userId;
    if (!socketIOResponse.error) {
      if (socketIOResponse.singleUser) {
        if (this.chatListUsers.length > 0) {
          this.chatListUsers = this.chatListUsers.filter(function (obj: any) {
            return obj.id !== socketIOResponse.chatList[0].id;
          });
        }
        /* Adding new online user into chat list array */
        this.chatListUsers = this.chatListUsers.concat(socketIOResponse.chatList);
      } else if (socketIOResponse.userDisconnected) {
        const loggedOutUser = this.chatListUsers.findIndex((obj: any) => obj.id === socketIOResponse.userid);
        if (loggedOutUser >= 0) {
          this.chatListUsers[loggedOutUser].online = 'N';
        }
      } else {
        /* Updating entire chatlist if user logs in. */
        this.chatListUsers = socketIOResponse.chatList;
      }
    } else {
      alert(`Unable to load Chat list, Redirecting to Login.`);
      /* this.chatService.removeLS()
         .then((removedLs: boolean) => {
           this.router.navigate(['/']);
         })
         .catch((error: Error) => {
           alert(' This App is Broken, we are working on it. try after some time.');
           throw error;
         });*/
    }
  }

  selectedUser(user: any): void {
    this.selectedUserId = user.id;

    /* Sending selected users information to other component. */
    EmitterService.get(this.selectedUserInfo).emit(user);

    /* calling method to get the messages */
    this.chatService.getMessages({ userId: this.userId, toUserId: user.id }).then((response: any) => {
      /* Sending conversation between two users to other component. */
      EmitterService.get(this.conversation).emit(response);
    });

  }

}
