const redisClient = require("../services/redis.service");
const User = require("./user.model");

class RedisUser extends User {
  constructor(database) {
    super(database);
  }

  create(user, cb) {
    this.database.incr("userIdCounter", (err, userId) => {
      if (err) return cb(err);
      user.id = userId;
      this.database.hset("users", userId, JSON.stringify(user), (err, result) => {
        if (err) return cb(err);
        cb(null, result);
      });
    });
  }

  get(userId, cb) {
    this.database.hget("users", userId, (err, result) => {
      if (err) return cb(err);
      cb(null, JSON.parse(result));
    });
  }

  getAllUsers(cb) {
    this.database.hgetall("users", (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    });
  }

  getUserByEmail(email, cb) {
    this.getAllUsers((err, users) => {
      if (err) return cb(err);
      for (let id in users) {
        let user = JSON.parse(users[id]);
        if (user.email === email) {
          return cb(null, user);
        }
      }
      cb(null, null);
    });
  }

  getIdByEmail(email, cb) {
    this.getUserByEmail(email, (err, user) => {
      if (err) return cb(err);
      delete user.password;
      cb(null, user);
    });
  }

  update(userId, updates, cb) {
    this.database.hget("users", userId, (err, result) => {
      if (err) return cb(err);
      let user = JSON.parse(result);
      Object.assign(user, updates);
      this.database.hset("users", userId, JSON.stringify(user), (err, result) => {
        if (err) return cb(err);
        cb(null, result);
      });
    });
  }

  delete(userId, cb) {
    this.database.hdel("users", userId, (err, result) => {
      if (err) return cb(err);
      cb(null, result);
    });
  }
}

module.exports = RedisUser;
