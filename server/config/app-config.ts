import { ExpressConfig } from './express-config';

const bodyParser = require('body-parser');
const cors = require('cors');
// const dotenv = require('dotenv');
import * as dotEnv from 'dotenv';

export class AppConfig {
  app: any;

  constructor(app) {
    dotEnv.config();
    this.app = app;
  }

  includeConfig() {
    this.app.use(
      bodyParser.json()
    );
    this.app.use(
      cors()
    );
    const EC = new ExpressConfig(this.app);
  }

}
