import { Injectable } from '@angular/core';
import { Constant } from '../../constant';
import * as io from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private BASE_URL = Constant.SOCKET_URL;
  private socket;

  constructor() {
  }

  /*
	* Method to connect the users to socket
	*/
  connectSocket(userId: string): void {
    this.socket = io(this.BASE_URL, {query: `userId=${userId}`});
    return this.socket;
  }

  getChatList(userId) {
    if (userId !== null) {
      this.socket.emit('chat-list', {userId: userId});
    }
    return new Promise((resolve, reject) => {
      this.socket.on('chat-list-response', (data: any) => {
        resolve(data.chatList);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
