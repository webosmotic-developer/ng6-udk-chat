'use strict';
import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import {enableProdMode} from '@angular/core';

const http = require('http');
const socketio = require('socket.io');

const socketEvents = require('../server/web/socket');
// const routes = require('./web/routes');
// const appConfig = require('./config/app-config');
import {api} from '../server/api';


class Server {
  http: any;
  socket: any;

  constructor() {
    // Faster server renders w/ Prod mode (dev mode never needed)
    enableProdMode();

    this.http = http.Server(api);
    this.socket = socketio(this.http);
  }

  /* appConfig() {
     new appConfig(this.app).includeConfig();
   }*/

  /* Including app Routes starts*/
  includeRoutes() {
    // new routes(this.app).routesConfig();
    new socketEvents(this.socket).socketConfig();
  }

  /* Including app Routes ends*/

  appExecute() {
      // this.appConfig();
      this.includeRoutes();

    const port = process.env.PORT || 4000;
    const host = process.env.HOST || `localhost`;

    this.http.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }

}

const app = new Server();
app.appExecute();
