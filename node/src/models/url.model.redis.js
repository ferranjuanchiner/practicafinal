const redisClient = require("../services/redis.service");
const Url = require("./url.model");

class RedisUrl extends Url {
  constructor() {
    super(redisClient);
  }

  create(url, cb) {
    redisClient.hset("urls", url.shortenedUrl, JSON.stringify(url), (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    });
  }

  get(id, cb) {
    redisClient.hget("urls", id, (err, result) => {
      if (err) return cb(err);
      cb(null, JSON.parse(result));
    });
  }

  getAll(cb) {
    redisClient.hgetall("urls", (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    });
  }

  update(id, url, cb) {
    redisClient.hset("urls", id, JSON.stringify(url), (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    });
  }

  getOriginalUrl(originalUrl, cb) {
    redisClient.hgetall("urls", (err, result) => {
      if (err) return cb(err);
      for (let id in result) {
        let url = JSON.parse(result[id]);
        if (url.originalUrl === originalUrl) {
          return cb(null, url);
        }
      }
      cb(null, false);
    });
  }

  delete(id, cb) {
    redisClient.hdel("urls", id, (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    });
  }
}

module.exports = RedisUrl;