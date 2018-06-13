/*
* Real time private chatting app using Angular 2, Nodejs, mongodb and Socket.io
* @author Shashank Tiwari
*/
'use strict';

import * as jwt from 'jsonwebtoken';

export class JWToken {
  secret: string;

  constructor() {
    this.secret = process.env.DB_URL;
  }

  encodeToken(data) {
    return jwt.sign(data, this.secret);
  }

}

