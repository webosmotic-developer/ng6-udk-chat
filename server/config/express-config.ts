import * as express from 'express';
import * as path from 'path';

export class ExpressConfig {

  constructor(app) {
    // Setting .html as the default template extension
    app.set('view engine', 'html');

    // Files
    app.use(express.static(path.join('public')));
  }
}
