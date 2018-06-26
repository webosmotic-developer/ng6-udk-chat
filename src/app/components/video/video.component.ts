import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SocketService} from '../../common/services/socket/socket.service';
import {AuthService} from '../../common/services/auth/auth.service';
import {Router} from '@angular/router';
import {ConfirmModalComponent} from '../../common/modals/confirm-modal/confirm-modal.component';
import {BsModalService} from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit, AfterViewInit {

  public startButton = document.getElementById('startButton');
  public stopButton = document.getElementById('stopButton');
  chatTextField = document.getElementById('chatTextField');
  public localVideo;
  public remoteVideo;
  public user;
  public chatMessage;
  public localStream: MediaStream;
  @Output() EventShowVideo: any = new EventEmitter<any>();
  public peerConnection;
  navigatorObject = <any>navigator;
  @Input() selectedUser: any;
  public peerConnectionConfig = {
    'iceServers': [
      {
        'url': 'stun:stun.l.google.com:19302',
      },
      {
        'url': 'stun:stun.services.mozilla.com',
      },
      {
        'url': 'turn:192.158.29.39:3478?transport=tcp',
        'credential': 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
        'username': '28224511:1379330808'
      }]
  };


  constructor(private socketService: SocketService, private authService: AuthService, private router: Router,
              private _bsModalService: BsModalService) {
    this.user = authService.getAuthUser();
    this.chatMessage = '';
  }

  ngOnInit() {
    this.navigatorObject.getUserMedia = this.navigatorObject.getUserMedia ||
      this.navigatorObject.mozGetUserMedia ||
      this.navigatorObject.webkitGetUserMedia;


    this.localVideo = document.getElementById('localVideo');
    this.remoteVideo = document.getElementById('remoteVideo');

    const constraints = {
      video: false,
      audio: true,
    };
    if (this.navigatorObject.getUserMedia) {
      this.navigatorObject.getUserMedia(constraints,
        this.getUserMediaSuccess,
        this.getUserMediaError
      );
    } else {
      alert('Your browser does not support getUserMedia API');
    }

  }

  ngAfterViewInit() {
    this.socketService.receiveVideoChatRespone().subscribe((msg: any) => {
      console.log('recieved video message', msg);
      const modal = this._bsModalService.show(ConfirmModalComponent, {'class': 'modal-md'});
      (<ConfirmModalComponent>modal.content).showConfirmationModal(
        'Invitation for video call',
        'Please accept or reject the call'
      );
      (<ConfirmModalComponent>modal.content).onClose.subscribe(result => {
        if (result) {
          this.gotMessageFromServer(msg);
        }
      });


    });

  }


  getUserMediaSuccess = (stream) => {
    console.log('stream', stream);
    this.localStream = stream;
    this.localVideo.src = window.URL.createObjectURL(stream);
  }

  getUserMediaError = (error) => {
    console.log('--- error', error);
  }


  gotMessageFromServer = (message) => {
    console.log('From server', message);
    if (!this.peerConnection) {
      this.start(false);
    }
    const signal = JSON.parse(message.message);
    console.log('signal', signal);
    if (signal.sdp) {
      console.log('in sdp');
      this.peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp), () => {
          this.peerConnection.createAnswer(this.gotDescription, this.createAnswerError);
          console.log('answer created');
        },
        function (error) {
          console.log('setRemoteDescription error', error);
        });
    } else if (signal.ice) {
      this.peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice));
      console.log('ice candidate added');
    }
  }


  start = (isCaller) => {
    document.getElementById('startButton').setAttribute('value', 'End');
    this.peerConnection = new RTCPeerConnection(this.peerConnectionConfig);
    this.peerConnection.onicecandidate = this.gotIceCandidate;
    this.peerConnection.onaddstream = this.gotRemoteStream;
    this.peerConnection.addStream(this.localStream);
    if (isCaller) {
      this.peerConnection.createOffer(this.gotDescription, this.createOfferError);
      console.log('offer created');
    }
  }

  gotDescription = (description) => {
    this.peerConnection.setLocalDescription(description, () => {
        const data = {
          fromUserId: this.user.id,
          message: JSON.stringify({'sdp': description}),
          toUserId: this.selectedUser.id
        };
        this.socketService.videoChat(data);
      },
      function () {
        console.log('set description error');
      });
  }

  gotIceCandidate = (event) => {
    if (event.candidate != null) {
      const data = {
        fromUserId: this.user.id,
        message: JSON.stringify({'ice': event.candidate}),
        toUserId: this.selectedUser.id
      };
      this.socketService.videoChat(data);
    }
  }

  gotRemoteStream = (event) => {
    console.log('got remote stream');
    console.log('event', event);
    this.remoteVideo.src = window.URL.createObjectURL(event.stream);
  }

  createOfferError = (error) => {
    console.log('offer error  ', error);
  }

  createAnswerError = (error) => {
    console.log('createAnswerError', error);
  }

  fnShowChat(type: string) {
    this.EventShowVideo.next(type);
  }


}
