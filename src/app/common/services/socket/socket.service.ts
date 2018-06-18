import { Injectable } from '@angular/core';
import { Constant } from '../../constant';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';

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
    this.socket = io(this.BASE_URL, { query: `userId=${userId}` });
    return this.socket;
  }

  /*
   * Method to emit the logout event.
   */
  logout(userId: object): Observable<any> {
    this.socket.emit('logout', userId);
    return new Observable(observer => {
      this.socket.on('logout-response', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  /*
   * Method to receive chat-list-response event.
   */
  getChatList(userId: string = null): Observable<any> {
    if (userId !== null) {
      this.socket.emit('chat-list', { userId: userId });
    }
    return new Observable(observer => {
      this.socket.on('chat-list-response', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  /*
    broadcastMsg(msg) {
      this.socket.emit('broadcast-test', { desc: msg });
    }
  */

  /*
 * Method to receive chat-list-response event.
 */
  broadcastMsg(msg: string = null): Observable<any> {
    if (msg !== null) {
      this.socket.emit('broadcast-test', { msg: msg });
    }
    return new Observable(observer => {
      this.socket.on('test-response', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }


  /*receiveMessages() {
    this.socket.on('broadcast-test-response', (data: any) => {
      console.log('---', data);
      return data.desc;
    });
  }*/
}
