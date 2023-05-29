require("dotenv").config({path:__dirname+'/../.env'});

const config = {
  PORT: process.env.PORT || 3000,
  REDIS_HOST: process.env.REDIS_HOST || "127.0.0.1",
  REDIS_PORT: process.env.REDIS_PORT || 6379,
  AUTH_SECRET_KEY: process.env.AUTH_SECRET_KEY || "secret_key",
  AUTH_KEY_EXPIRATION: process.env.AUTH_KEY_EXPIRATION || "1h",

  MYSQL_HOST: process.env.MYSQL_HOST || "",
  MYSQL_USER: process.env.MYSQL_USER || "",
  MYSQL_PASSWORD: process.env.MYSQL_PASSWORD || "",
  MYSQL_DATABASE: process.env.MYSQL_DATABASE || "",

  MONGO_HOST: process.env.MONGO_HOST || "",
  MONGO_PORT: process.env.MONGO_PORT || "",
  MONGO_USER: process.env.MONGO_USER || "",
  MONGO_PASSWORD: process.env.MONGO_PASSWORD || "",
  MONGO_DATABASE: process.env.MONGO_DATABASE || "",
  
};

module.exports = config;