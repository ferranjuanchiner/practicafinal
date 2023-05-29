class Url {
    constructor(database) {
      this.database = database;
    }
  
    create(url, cb) {
      // Lógica para crear una URL
    }
  
    get(id, cb) {
      // Lógica para obtener una URL
    }
  
    getAll(cb) {
      // Lógica para obtener todas las URLs
    }
  
    update(id, url, cb) {
      // Lógica para actualizar una URL
    }
  
    getOriginalUrl(originalUrl, cb) {
      // Lógica para obtener una URL por su URL original
    }
  
    delete(id, cb) {
      // Lógica para eliminar una URL
    }
  }
  
  module.exports = Url;