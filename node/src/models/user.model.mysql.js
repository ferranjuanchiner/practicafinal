const User = require('./user.model');
const mysqlClient = require('../services/mysql.service');

class MysqlUser extends User {
  constructor(database) {
    super(database);
  }

  create(user, cb) {
    const query = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
    const values = [user.name, user.email, user.password];

    this.mysqlClient.query(query, values, (err, result) => {
      if (err) return cb(err);
      cb(null, result.insertId);
    });
  }

  get(id, cb) {
    const query = `SELECT * FROM users WHERE id = ?`;
    const values = [id];

    this.mysqlClient.query(query, values, (err, result) => {
      if (err) return cb(err);
      if (result.length === 0) return cb(null, null);

      const user = new this.UserData(
        result[0].name,
        result[0].email,
        result[0].password
      );
      user.id = result[0].id;
      cb(null, user);
    });
  }

  getAll(cb) {
    const query = `SELECT * FROM users`;

    this.mysqlClient.query(query, (err, results) => {
      if (err) return cb(err);

      const users = results.map((result) => {
        const user = new this.UserData(
          result.name,
          result.email,
          result.password
        );
        user.id = result.id;
        return user;
      });

      cb(null, users);
    });
  }

  getByEmail(email, cb) {
    const query = `SELECT * FROM users WHERE email = ?`;
    const values = [email];

    this.mysqlClient.query(query, values, (err, result) => {
      if (err) return cb(err);
      if (result.length === 0) return cb(null, null);

      const user = new this.UserData(
        result[0].name,
        result[0].email,
        result[0].password
      );
      user.id = result[0].id;
      cb(null, user);
    });
  }

  update(id, updates, cb) {
    const query = `UPDATE users SET ? WHERE id = ?`;
    const values = [updates, id];

    this.mysqlClient.query(query, values, (err, result) => {
      if (err) return cb(err);
      cb(null, result.changedRows);
    });
  }

  delete(id, cb) {
    const query = `DELETE FROM users WHERE id = ?`;
    const values = [id];

    this.mysqlClient.query(query, values, (err, result) => {
      if (err) return cb(err);
      cb(null, result.affectedRows);
    });
  }
}

module.exports = MysqlUser;