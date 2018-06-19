import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { EmitterService } from '../../common/services/emitter/emitter.service';
import { SocketService } from '../../common/services/socket/socket.service';
import { AuthService } from '../../common/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnChanges {
  public message: string;
  public messages: any[] = [];
  public selectedUser: any;
  public user: any;
  public userId: any;
  public isType: boolean;
  public timeout: any;
  @Input() conversation: string;
  @Input() selectedUserInfo: string;
  @Output() EventShowBoard: any = new EventEmitter<any>();

  constructor(private socketService: SocketService, private authService: AuthService, private router: Router) {
    this.user = authService.getAuthUser();
  }


  listenForMessages(userId: string): void {
    this.userId = userId;
    this.socketService.receiveMessages().subscribe((message: any) => {
      /* subscribing for messages statrts */
      if (this.selectedUser !== null && this.selectedUser.id === message.fromUserId) {
        this.messages = [...this.messages, message];
      }
    });
  }

  listenTyping(userId: string): void {
    this.userId = userId;
    this.socketService.receiveTypes().subscribe((data: any) => {
      /* subscribing for messages statrts */
      if (this.selectedUser !== null && this.selectedUser.id === data.fromUserId) {
        this.isType = data.isType;

        if (this.isType) {
          if (this.timeout) {
            clearTimeout(this.timeout);
          }
          this.timeout = setTimeout(() => {
            this.isType = false;
          }, 3000);
        }
      }
    });
  }

  fnType(isTyping) {
    if (this.user.id === '') {
      this.router.navigate(['signup']);
    } else if (this.selectedUser.id === '') {
      alert(`Select a user to chat.`);
    } else {
      const data: any = {
        fromUserId: this.user.id,
        isType: isTyping,
        toUserId: this.selectedUser.id,
      };
      /* calling method to send the messages */
      this.socketService.startTyping(data);
    }
  }

  sendMessage() {
    const message = this.message;
    if (message === '' || message === undefined || message === null) {
      alert(`Message can't be empty.`);
    } else if (this.user.id === '') {
      this.router.navigate(['signup']);
    } else if (this.selectedUser.id === '') {
      alert(`Select a user to chat.`);
    } else {
      const data: any = {
        fromUserId: this.user.id,
        message: (message).trim(),
        toUserId: this.selectedUser.id,
      };
      this.messages = [...this.messages, data];
      /* calling method to send the messages */
      this.socketService.sendMessage({
        fromUserId: this.user.id,
        message: (message).trim(),
        toUserId: this.selectedUser.id
      });
      this.message = '';
    }

  }

  fnShowBoard() {
    this.EventShowBoard.next();
  }

  ngOnChanges(changes: any) {
    /* Fetching selected users information from other component. */
    EmitterService.get(this.selectedUserInfo).subscribe((selectedUser: any) => {
      this.selectedUser = selectedUser;
    });

    EmitterService.get(this.conversation).subscribe((data: any) => {
      this.messages = data.messages;
    });
  }

}
