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
 * Method to receive chat-list-response event.
 */
  broadcastMsg(msg: string) {
    if (msg !== null) {
      this.socket.emit('message-broadcast', { msg: msg });
    }
  }

  /*
	* Method to receive broadcast-response event.
	*/
  receiveBroadcast(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('message-broadcast-response', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

  /*
   * Method to emit the add-messages event.
   */
  startTyping(message: any) {
    this.socket.emit('start-typing', message);
  }

  /*
	* Method to emit the add-messages event.
	*/
  sendMessage(message: any): void {
    this.socket.emit('add-message', message);
  }


  /*
	* Method to receive add-message-response event.
	*/
  receiveMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('add-message-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  receiveTypes(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('typing-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  drawLine(data: any): void {
    this.socket.emit('drawing', data);
  }


  receiveDrawingData(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('new-drawing', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  clearWhiteBoardCanvas(data: any): void {
    this.socket.emit('clear-whiteboard', data);
  }

  clearWhiteBoardCanvasResponse(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('clear-whiteboard-response', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    });
  }

  videoChat(data: any): void {
    this.socket.emit('start-video-chat', data);
  }

  /*
   * Method to receive broadcast-response event.
   */
  receiveVideoChatRespone(): Observable<any> {
    return new Observable(observer => {
      this.socket.on('video-chat-response', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }

}
