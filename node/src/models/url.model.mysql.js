const database = require('../services/mysql.service');
const mysql = require('mysql');
const config = require('../config/config');

class MysqlUrl extends Url {
  constructor() {
    super(database);
  }

  create(url, cb) {
    this.database.query(
      'INSERT INTO urls (shortened_url, original_url) VALUES (?, ?)',
      [url.shortenedUrl, url.originalUrl],
      (error, results) => {
        if (error) return cb(error);
        cb(null, results);
      }
    );
  }

  get(id, cb) {
    this.database.query(
      'SELECT * FROM urls WHERE shortened_url = ?',
      [id],
      (error, results) => {
        if (error) return cb(error);
        if (results.length === 0) return cb(null, null);
        cb(null, results[0]);
      }
    );
  }

  getAll(cb) {
    this.database.query('SELECT * FROM urls', (error, results) => {
      if (error) return cb(error);
      cb(null, results);
    });
  }

  update(id, url, cb) {
    this.database.query(
      'UPDATE urls SET original_url = ? WHERE shortened_url = ?',
      [url.originalUrl, id],
      (error, results) => {
        if (error) return cb(error);
        cb(null, results);
      }
    );
  }

  getOriginalUrl(originalUrl, cb) {
    this.database.query(
      'SELECT * FROM urls WHERE original_url = ?',
      [originalUrl],
      (error, results) => {
        if (error) return cb(error);
        if (results.length === 0) return cb(null, null);
        cb(null, results[0]);
      }
    );
  }

  delete(id, cb) {
    this.database.query(
      'DELETE FROM urls WHERE shortened_url = ?',
      [id],
      (error, results) => {
        if (error) return cb(error);
        cb(null, results);
      }
    );
  }
}

module.exports = MysqlUrl;
