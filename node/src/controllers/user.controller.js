const MongoDBUser = require('../models/user.model.mongodb');
const RedisUser = require('../models/user.model.redis');
const MysqlUser = require('../models/user.model.mysql');

const auth = require('../services/auth.service.js');

// Crear instancia de modelo dependiendo de la base de datos
const dbType = process.env.DB_TYPE || 'mysql';
let userModel;
switch (dbType) {
  case 'mysql':
    userModel = new MysqlUser();
    break;
  case 'mongodb':
    userModel = new MongoDBUser();
    break;
  case 'redis':
    userModel = new RedisUser();
    break;
  default:
    userModel = new RedisUser();
}


// Create a new user
exports.create = (req, res) => {
  const user = req.body;
  // check if any value is missing
  if (!user.name || !user.email || !user.password) {
    return res.status(400).send({
      message: "Content can not be empty"
    });
  }
  console.log("Usuario a crear", user);
  //Check if exists
  userModel.getUserByEmail(user.email, (err, result) => {
    if(err) return res.status(500).send(err);
    if (result) return res.status(400).send({
      message: "User already exists"
    });
    userModel.create(user, (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(200).send({user, token: auth.signToken(user)});
    });
  });
};

exports.login = (req, res) => {
  const user = req.body;
  // check if any value is missing
  if (!user.email || !user.password) {
    return res.status(400).send({
      message: "Content can not be empty"
    });
  }
  userModel.getUserByEmail(user.email, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result) return res.status(404).send("User not found");
    if (result.password != user.password) return res.status(401).send("Invalid password");
    delete result.password;
    res.status(200).send({user: result, token: auth.signToken(result)});
  });
}
  

// Edit an existing user
exports.update = (req, res) => {
  const userId = req.params.id;
  const updates = req.body;
  userModel.update(userId, updates, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send(result);
  });
};

// Retrieve all users
exports.findAll = (req, res) => {
  userModel.getAllUsers((err, result) => {
    if (err) return res.status(500).send(err);
    let users = {};
    for (let id in result) {
      let user = JSON.parse(result[id]);
      delete user.password;
      users[user.id] = user;
    }
    res.status(200).send(users);
  });
}

// Retrieve a single user
exports.findOne = (req, res) => {
  const userId = req.params.id;
  userModel.get(userId, (err, result) => {
    if (err) return res.status(500).send(err);
    if (!result) return res.status(404).send("User not found");
    res.sendStatus(200).send(result);
  });
};

// Delete a user
exports.delete = (req, res) => {
  const userId = req.params.id;
  userModel.delete(userId, (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(200).send({
      message: "User deleted successfully"
    });
  });
};

