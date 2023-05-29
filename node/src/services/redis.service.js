const redis = require('redis');
const config = require("../config/config");

console.log('Connecting to Redis...');
const redisClient = redis.createClient({
  url: `redis://${config.REDIS_HOST}:${config.REDIS_PORT}`,
  legacyMode: true,
});

redisClient.on('connect', () => {
  console.log('Successfully connected to Redis');
});

redisClient.on('error', (err) => {
  console.log(`Error connecting to Redis: ${err}`);
});

// Configure Redis 
redisClient.connect();

module.exports = redisClient;
