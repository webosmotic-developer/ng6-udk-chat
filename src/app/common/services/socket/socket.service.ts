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
  }
}
