
const mysql = require('mysql');

/*const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "lubeasy"
});
*/
const connection = mysql.createConnection({
    host: "remotemysql.com",
    user: "bRqjHfQTrV",
    password: "DQk3ljiCmh",
    database: "bRqjHfQTrV",
    port: 3306
});

module.exports = connection;