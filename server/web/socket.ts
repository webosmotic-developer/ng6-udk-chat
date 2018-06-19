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

      socket.on(`broadcast-test`, async (data) => {
        try {
          socket.broadcast.emit(`test-response`, {
            error: false,
            data: data.msg
          });
        } catch (error) {
          socket.broadcast.emit(`test-response`, {
            error: true,
          });
        }
      });


      /**
       * send the messages to the user
       */
      socket.on(`add-message`, async (data) => {
        if (data.message === '') {
          this.io.to(socket.id).emit(`add-message-response`, {
            error: true,
            message: CONSTANTS.MESSAGE_NOT_FOUND
          });
        } else if (data.fromUserId === '') {
          this.io.to(socket.id).emit(`add-message-response`, {
            error: true,
            message: CONSTANTS.SERVER_ERROR_MESSAGE
          });
        } else if (data.toUserId === '') {
          this.io.to(socket.id).emit(`add-message-response`, {
            error: true,
            message: CONSTANTS.SELECT_USER
          });
        } else {
          try {
            console.log('---', data.toUserId);
            const [toSocketId, messageResult] = await Promise.all([
              this.queryHandler.getUserInfo({
                userId: data.toUserId,
                socketId: true
              }),
              this.queryHandler.insertMessages(data)
            ]);
            this.io.to(toSocketId).emit(`add-message-response`, data);
          } catch (error) {
            this.io.to(socket.id).emit(`add-message-response`, {
              error: true,
              message: CONSTANTS.MESSAGE_STORE_ERROR
            });
          }
        }
      });

      socket.on(`drawing`, async (data) => {
        console.log('drwaing data', data);
        if (data.fromUserId === '') {
          this.io.to(socket.id).emit(`new-drawing`, {
            error: true,
            message: CONSTANTS.SERVER_ERROR_MESSAGE
          });
        } else if (data.toUserId === '') {
          this.io.to(socket.id).emit(`new-drawing`, {
            error: true,
            message: CONSTANTS.SELECT_USER
          });
        } else {
          try {
            const [toSocketId] = await Promise.all([
              this.queryHandler.getUserInfo({
                userId: data.toUserId,
                socketId: true
              })
            ]);
            console.log('--- toSocketId', toSocketId);
            this.io.to(toSocketId).emit(`new-drawing`, data);
          } catch (error) {
            this.io.to(socket.id).emit(`new-drawing`, {
              error: true,
              message: CONSTANTS.MESSAGE_STORE_ERROR
            });
          }
        }
      });


      socket.on(`start-typing`, async (data) => {
        if (data.fromUserId === '') {
          this.io.to(socket.id).emit(`typing-response`, {
            error: true,
            message: CONSTANTS.SERVER_ERROR_MESSAGE
          });
        } else if (data.toUserId === '') {
          this.io.to(socket.id).emit(`typing-response`, {
            error: true,
            message: CONSTANTS.SELECT_USER
          });
        } else {
          try {
            const [toSocketId] = await Promise.all([
              this.queryHandler.getUserInfo({
                userId: data.toUserId,
                socketId: true
              })
            ]);
            this.io.to(toSocketId).emit(`typing-response`, data);
          } catch (error) {
            this.io.to(socket.id).emit(`typing-response`, {
              error: true,
              message: CONSTANTS.MESSAGE_STORE_ERROR
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

