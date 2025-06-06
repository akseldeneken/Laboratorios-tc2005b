const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'videojuegos_db',
    password: '1234'
});

module.exports = pool.promise();
