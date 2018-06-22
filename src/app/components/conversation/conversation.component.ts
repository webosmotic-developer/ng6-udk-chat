import {
  AfterContentChecked,
   Component, ElementRef, EventEmitter, Input, OnChanges, Output, ViewChild,
} from '@angular/core';
import {SocketService} from '../../common/services/socket/socket.service';
import {AuthService} from '../../common/services/auth/auth.service';
import {Router} from '@angular/router';
import {EmojiInputComponent} from 'ng-emoji-picker';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css'],
})
export class ConversationComponent implements OnChanges, AfterContentChecked {
  public message: any;
  public user: any;
  public userId: any;
  public isType: boolean;
  public timeout: any;
  @ViewChild(EmojiInputComponent) public textarea: ElementRef;
  @Input() conversation: string;
  @Input() messages: any;
  @Input() selectedUserInfo: string;
  @Input() selectedUser: any;
  @Output() EventShowBoard: any = new EventEmitter<any>();
  openPopup: Function;

  setPopupAction(fn: any) {
    this.openPopup = fn;
  }

  constructor(private socketService: SocketService, private authService: AuthService, private router: Router) {
    this.user = authService.getAuthUser();
    this.message = '';
  }


  ngAfterContentChecked() {
    if (this.textarea) {
      this.textarea['textareaEl'].nativeElement.placeholder = 'Type your message';
    }

  }

  listenForMessages(userId: string): void {
    this.userId = userId;
    this.socketService.receiveMessages().subscribe((message: any) => {
      /* subscribing for messages starts */
      if (this.selectedUser !== null && this.selectedUser.id === message.fromUserId) {
        this.messages = [...this.messages, message];
        setTimeout(() => {
          document.querySelector(`.chat-history`).scrollTop = document.querySelector(`.chat-history`).scrollHeight;
        }, 100);
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
          }, 5000);
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

  sendMessage(event) {
    if (event.type === 'click' || event.keyCode === 13) {
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
        setTimeout(() => {
          document.querySelector(`.chat-history`).scrollTop = document.querySelector(`.chat-history`).scrollHeight;
        }, 100);
      }
    }

  }

  fnShowBoard() {
    this.EventShowBoard.next();
  }

  ngOnChanges(changes: any) {
    /* Fetching selected users information from other component. */


  }

}
