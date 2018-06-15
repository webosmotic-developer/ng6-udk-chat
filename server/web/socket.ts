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

      /**
       * Logout the user
       */
      socket.on('logout', async (data) => {
        const userId = data.userId;
        try {
          await this.queryHandler.logout(userId);
          this.io.to(socket.id).emit(`logout-response`, {
            error: false,
            message: CONSTANTS.USER_LOGGED_OUT,
            userId: userId
          });

          socket.broadcast.emit(`chat-list-response`, {
            error: false,
            userDisconnected: true,
            userid: userId
          });
        } catch (error) {
          this.io.to(socket.id).emit(`logout-response`, {
            error: true,
            message: CONSTANTS.SERVER_ERROR_MESSAGE,
            userId: userId
          });
        }
      });

      /**
       * sending the disconnected user to all socket users.
       */
      socket.on('disconnect', async () => {
        socket.broadcast.emit(`chat-list-response`, {
          error: false,
          userDisconnected: true,
          userid: socket.request._query['userId']
        });

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

