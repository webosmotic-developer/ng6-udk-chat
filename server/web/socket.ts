/*
* Real time private chatting app using Angular 2, Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/


'use strict';


class Socket {
  io: any;

  constructor(socket) {
    this.io = socket;
  }

  socketEvents() {
    this.io.on('connection', (socket) => {
      console.log('working');

      socket.emit('test1', {test: '123456'});
    });

  }

  socketConfig() {
    console.log('=======');
   /* this.io.use(async (socket, next) => {
      console.log(socket.request);
      try {
        console.log('try block');
        // await queryHandler.addSocketId({
        //   userId: socket.request._query['userId'],
        //   socketId: socket.id
        // });
        // next();
      } catch (error) {
        // Error
        console.error(error);
      }
    });*/

    this.socketEvents();
  }
}

module.exports = Socket;
