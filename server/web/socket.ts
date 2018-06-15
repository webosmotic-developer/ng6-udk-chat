/*
* Real time private chatting app using Angular 2, Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/


'use strict';
import { QueryHandler } from '../handlers/query-handler';
const CONSTANTS = require('./../config/constants');

export class Socket {
  io: any;
  queryHandler: any;

  constructor(socket) {
    this.io = socket;
    this.queryHandler = new QueryHandler();
  }

  socketEvents() {
    this.io.on('connection', (socket) => {

      /* Get the user's Chat list	*/
      socket.on(`chat-list`, async (data) => {
        if (!data.userId) {
          this.io.emit(`chat-list-response`, {
            error: true,
            message: CONSTANTS.USER_NOT_FOUND
          });
        } else {
          try {
            const [UserInfoResponse, chatlistResponse] = await Promise.all([
              this.queryHandler.getUserInfo({
                userId: data.userId,
                socketId: false
              }),
              this.queryHandler.getChatList(socket.id)
            ]);
            this.io.to(socket.id).emit(`chat-list-response`, {
              error: false,
              singleUser: false,
              chatList: chatlistResponse
            });
            socket.broadcast.emit(`chat-list-response`, {
              error: false,
              singleUser: true,
              chatList: UserInfoResponse
            });
          } catch (error) {
            this.io.to(socket.id).emit(`chat-list-response`, {
              error: true,
              chatList: []
            });
          }
        }
      });
    });

  }

  socketConfig() {
    this.io.use(async (socket, next) => {
      // console.log('------', socket.request);
      try {
        await this.queryHandler.addSocketId({
          userId: socket.request._query['userId'],
          socketId: socket.id
        });
        next();
      } catch (error) {
        // Error
        console.error(error);
      }
    });

    this.socketEvents();
  }
}

