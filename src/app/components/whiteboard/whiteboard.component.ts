import { AfterViewInit, Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SocketService } from '../../common/services/socket/socket.service';
import { EmitterService } from '../../common/services/emitter/emitter.service';
import { AuthService } from '../../common/services/auth/auth.service';

@Component({
  selector: 'app-whiteboard',
  templateUrl: './whiteboard.component.html',
  styleUrls: ['./whiteboard.component.css']
})
export class WhiteboardComponent implements OnInit, AfterViewInit, OnChanges {

  public context: any;
  public colors: any;
  public canvas: any;
  public drawing: any;
  public current: any;
  public user: any;
  public lineWidth: any;
  @Input() selectedUserInfo: string;
  @Input() selectedUser: any;
  @Output() EventShowChat: any = new EventEmitter<any>();

  constructor(private socketService: SocketService, private authService: AuthService) {
    this.user = authService.getAuthUser();
    this.drawing = false;
    this.lineWidth = 2;
    this.current = {
      'color': 'black',
    };
  }

  fnShowChat() {
    this.EventShowChat.next();
  }

  ngOnInit() {
    this.socketService.receiveDrawingData().subscribe((data: any) => {
      /* subscribing for messages statrts */
      if (this.selectedUser !== null && this.selectedUser.id === data.fromUserId) {
        this.onDrawingEvent(data);
      }
    });
  }

  fnSetlineWidth(size) {
    this.lineWidth = size;
  }

  onColorUpdate = (e) => {
    this.current.color = e.target.value;
  }


  fnDrawLine = (x0, y0, x1, y1, color, lineWidth, emit?: any) => {
    this.context.beginPath();
    this.context.moveTo(x0, y0);
    this.context.lineTo(x1, y1);
    this.context.lineCap = 'round';
    this.context.lineWidth = lineWidth;
    this.context.strokeStyle = color;
    this.context.stroke();
    this.context.closePath();

    if (!emit) {
      return;
    }
    const w = this.canvas['width'];
    const h = this.canvas['height'];

    this.socketService.drawLine({
      x0: x0 / w,
      y0: y0 / h,
      x1: x1 / w,
      y1: y1 / h,
      color: color,
      lineWidth: lineWidth,
      fromUserId: this.user.id,
      toUserId: this.selectedUser.id
    });
  };

  fnOnMouseDown = (e: any) => {
    this.drawing = true;
    this.current.x = e.offsetX;
    this.current.y = e.offsetY;
  };

  fnOnMouseUp = (e: any) => {
    if (!this.drawing) {
      return;
    }
    this.drawing = false;
    this.fnDrawLine(this.current.x, this.current.y, e.offsetX, e.offsetY, this.current.color, this.lineWidth, true);
  };

  fnOnMouseMove = (e: any) => {

    if (!this.drawing) {
      return;
    }
    this.fnDrawLine(this.current.x, this.current.y, e.offsetX, e.offsetY, this.current.color, this.lineWidth, true);
    this.current.x = e.offsetX;
    this.current.y = e.offsetY;
  };

  onDrawingEvent = (data) => {
    const w = this.canvas['width'];
    const h = this.canvas['height'];
    this.fnDrawLine(data.x0 * w, data.y0 * h, data.x1 * w, data.y1 * h, data.color, data.lineWidth);
  };

  fnInit() {
    setTimeout(() => {
      this.canvas = document.getElementsByClassName('whiteboard')[0];
      this.canvas.width = this.canvas.parentNode.clientWidth - 10;
      this.canvas.height = this.canvas.parentNode.clientHeight - 10;
      this.context = this.canvas.getContext('2d');
    }, 0);
  }

  ngAfterViewInit() {
    // this.fnInit();
  }

  ngOnChanges(changes: any) {
    /* Fetching selected users information from other component. */
    EmitterService.get(this.selectedUserInfo).subscribe((selectedUser: any) => {
      this.selectedUser = selectedUser;
      this.fnInit();
    });

  }


}
