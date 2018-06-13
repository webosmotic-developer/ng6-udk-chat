'use strict';
/*requiring mongodb node modules */
const mongodb = require('mongodb');
const assert = require('assert');

export class Db {
  mongoClient: any;
  ObjectID: any;

  constructor() {
    this.mongoClient = mongodb.MongoClient;
    this.ObjectID = mongodb.ObjectID;
  }

  onConnect() {
    const mongoURL = process.env.DB_URL;
    return new Promise((resolve, reject) => {
      this.mongoClient.connect(mongoURL, (err, db) => {
        if (err) {
          console.log('------', err)
          reject(err);
        } else {
          assert.equal(null, err);
          resolve([db, this.ObjectID]);
        }
      });
    });
  }
}
