'use strict';


import { RouteHandler } from '../handlers/route-handler';

export class Routes {
  app: any;
  routeHandler: any;

  constructor(app) {
    this.app = app;
    this.routeHandler = new RouteHandler();
  }

  /* creating app Routes starts */
  appRoutes() {
    // this.app.post('/usernameAvailable', routeHandler.userNameCheckHandler);

    this.app.post('/register', this.routeHandler.registerRouteHandler);

    this.app.post('/login', this.routeHandler.loginRouteHandler);

     // this.app.post('/userSessionCheck', routeHandler.userSessionCheckRouteHandler);

     this.app.post('/getMessages', this.routeHandler.getMessagesRouteHandler);

     // this.app.get('*', routeHandler.routeNotFoundHandler);
  }

  routesConfig() {
    this.appRoutes();
  }
}

