require('dotenv').config();

const mysql = require('mysql');

module.exports = function () {
    var connection = mysql.createConnection({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        port: process.env.MYSQL_PORT
    });

    connection.connect(function (err) {
        if (err) return console.log(err);
    });

    return connection;
}
