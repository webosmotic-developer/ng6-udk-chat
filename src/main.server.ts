'use strict';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { enableProdMode } from '@angular/core';

// const appConfig = require('./config/app-config');
import * as http from 'https';
import * as socketio from 'socket.io';

import { Routes } from '../server/web/routes';
import { Socket } from '../server/web/socket';
import { AppConfig } from '../server/config/app-config';
import { api } from '../server/api';

class Server {
  http: any;
  socket: any;

  constructor() {
    // Faster server renders w/ Prod mode (dev mode never needed)
    enableProdMode();

    this.http = new http.Server(api);
    this.socket = socketio(this.http);
  }

   appConfig() {
     new AppConfig(api).includeConfig();
   }

  /* Including app Routes starts*/
  includeRoutes() {
    new Routes(api).routesConfig();
    new Socket(this.socket).socketConfig();
  }

  /* Including app Routes ends*/

  appExecute() {
    this.appConfig();
    this.includeRoutes();

    const port = process.env.PORT || 4000;
    const host = process.env.HOST || `localhost`;

    console.log('------------------------*************  port', port);
    console.log('-------------------------***********host', host);

    this.http.listen(port, () => {
      console.log(`Listening on http://localhost:${port}`);
    });
  }

}

const app = new Server();
app.appExecute();
