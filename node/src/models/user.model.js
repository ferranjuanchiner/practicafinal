class User {
    constructor(database) {
      this.database = database;
    }
  
    create(userData, cb) {
      // Lógica para crear un usuario
    }
  
    get(id, cb) {
      // Lógica para obtener un usuario por su id
    }
  
    getAll(cb) {
      // Lógica para obtener todos los usuarios
    }
  
    getByEmail(email, cb) {
      // Lógica para obtener un usuario por su email
    }
  
    update(id, updates, cb) {
      // Lógica para actualizar un usuario
    }
  
    delete(id, cb) {
      // Lógica para eliminar un usuario
    }
  }
  
  module.exports = User;