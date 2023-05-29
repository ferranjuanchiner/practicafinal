const User = require('./user.model');
const mongoClient = require('../services/mongodb.service');

class MongoDBUser extends User {
  constructor(database) {
    super(database);
    this.collection = mongoClient.collection('users');
  }

  async create(user) {
    const result = await this.collection.insertOne(user);
    return result.insertedId.toString();
  }

  async get(id) {
    const result = await this.collection.findOne({ _id: id });
    return result;
  }

  async getAll() {
    const result = await this.collection.find().toArray();
    return result;
  }

  async getUserByEmail(email) {
    const result = await this.collection.findOne({ email: email });
    return result;
  }

  async getIdByEmail(email) {
    const result = await this.collection.findOne({ email: email }, { projection: { _id: 1 } });
    return result && result._id.toString();
  }

  async update(id, updates) {
    const result = await this.collection.updateOne({ _id: id }, { $set: updates });
    return result.modifiedCount > 0;
  }

  async delete(id) {
    const result = await this.collection.deleteOne({ _id: id });
    return result.deletedCount > 0;
  }
}

module.exports = MongoDBUser;
