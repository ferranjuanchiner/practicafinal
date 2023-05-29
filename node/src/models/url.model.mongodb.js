const mongodb = require('mongodb');
const MongoClient = require('../services/mongodb.service');
const config = require('../config/config');
const Url = require('./url.model');

class MongodbUrl extends Url {
  constructor() {
    super(MongoClient);
    this.dbName = config.MONGO_DATABASE;
  }

  create(url, cb) {
    MongoClient.connect(this.url, (err, client) => {
      if (err) return cb(err);

      const db = client.db(this.dbName);
      const collection = db.collection('urls');
      collection.insertOne(url, (err, result) => {
        if (err) return cb(err);
        cb(null, result.ops[0]);
        client.close();
      });
    });
  }

  get(id, cb) {
    MongoClient.connect(this.url, (err, client) => {
      if (err) return cb(err);

      const db = client.db(this.dbName);
      const collection = db.collection('urls');
      collection.findOne({ _id: mongodb.ObjectID(id) }, (err, result) => {
        if (err) return cb(err);
        cb(null, result);
        client.close();
      });
    });
  }

  getAll(cb) {
    MongoClient.connect(this.url, (err, client) => {
      if (err) return cb(err);

      const db = client.db(this.dbName);
      const collection = db.collection('urls');
      collection.find().toArray((err, result) => {
        if (err) return cb(err);
        cb(null, result);
        client.close();
      });
    });
  }

  update(id, url, cb) {
    MongoClient.connect(this.url, (err, client) => {
      if (err) return cb(err);

      const db = client.db(this.dbName);
      const collection = db.collection('urls');
      collection.updateOne({ _id: mongodb.ObjectID(id) }, { $set: url }, (err, result) => {
        if (err) return cb(err);
        cb(null, result);
        client.close();
      });
    });
  }

  getOriginalUrl(originalUrl, cb) {
    MongoClient.connect(this.url, (err, client) => {
      if (err) return cb(err);

      const db = client.db(this.dbName);
      const collection = db.collection('urls');
      collection.findOne({ originalUrl: originalUrl }, (err, result) => {
        if (err) return cb(err);
        cb(null, result);
        client.close();
      });
    });
  }

  delete(id, cb) {
    MongoClient.connect(this.url, (err, client) => {
      if (err) return cb(err);

      const db = client.db(this.dbName);
      const collection = db.collection('urls');
      collection.deleteOne({ _id: mongodb.ObjectID(id) }, (err, result) => {
        if (err) return cb(err);
        cb(null, result);
        client.close();
      });
    });
  }
}

module.exports = MongodbUrl;