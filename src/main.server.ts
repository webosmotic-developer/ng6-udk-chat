// These are important and needed before anything else
/*import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import {createServer} from 'http';

import {enableProdMode} from '@angular/core';

import {api} from '../server/api';
import * as http from 'http';
import * as sio from 'socket.io';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const PORT = process.env.PORT || 4000;

let requestListener = api;

// Start up the Node server
const server = createServer((req, res) => {
  requestListener(req, res);
});

const io = sio.listen(server, {
  // below are engine.IO options
  pingInterval: 1000,
  pingTimeout: 5000
});

io.on('connection', function (socket) {
  io.emit('test1', {test: 'test123'});
});

server.listen(PORT, () => {
  console.log(`Server listening -- http://localhost:${PORT}`);
});


if (module.hot) {
  module.hot.accept('./api', () => {
    requestListener = require('../server/api').api;
  });
}

export default server;*/

'use strict';

import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import {createServer} from 'http';

import {enableProdMode} from '@angular/core';

import {api} from '../server/api';


class Server {
  server: any;

  constructor() {
    let requestListener = api;

    // Faster server renders w/ Prod mode (dev mode never needed)
    enableProdMode();

    // Start up the Node server
    this.server = createServer((req, res) => {
      requestListener(req, res);
    });

    if (module.hot) {
      module.hot.accept('./api', () => {
        requestListener = require('./api').api;
      });
    }
  }

  appExecute() {
    const port = process.env.PORT || 4000;
    const host = process.env.HOST || `localhost`;

    this.server.listen(port, host, () => {
      console.log(`Listening on http://${host}:${port}`);
    });
  }
}

const app = new Server();
app.appExecute();
