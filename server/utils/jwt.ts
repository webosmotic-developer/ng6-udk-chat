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
    const tokenObj = {
      exp: Math.floor(Date.now() / 1000) + (60 * 60),
      data: data
    };
    return jwt.sign(tokenObj, this.secret);
  }

}

