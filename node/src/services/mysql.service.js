const mysql = require('mysql2');
const config = require('../config/config');

const mysqlClient = mysql.createConnection({
    host: config.MYSQL_HOST,
    user: config.MYSQL_USER,
    password: config.MYSQL_PASSWORD,
    database: config.MYSQL_DATABASE
});

mysqlClient.connect((err) => {
    console.log('Connecting to MySQL...');
    if (err) {
        console.error('Error connecting to MySQL: ', err);
    } else {
        console.log('Successfully connected to MySQL');
    }
});

module.exports = mysqlClient;
