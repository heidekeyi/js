const mysql = require('mysql');

const conn = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    charset: 'utf8',
    database: 'db1'
});

conn.connect();

module.exports = conn;