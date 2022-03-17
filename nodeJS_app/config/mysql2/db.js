const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'admin',
    password: '',
    database: 'Restauracja'
});

module.exports = pool;
