const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'rbac_lab19',
    password: '1234'
});

module.exports = pool.promise();
