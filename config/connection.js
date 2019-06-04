// Set up MySQL connection.
require("dotenv").config();
const mysql = require("mysql");
const keys = require("../keys");
const burger = keys.burger;
// const connection;

if (process.env.JAWSDB_UL) {
    connection = mysql.createConnection(process.env.JAWSDB_UL);
} else {
    connection = mysql.createConnection({

        host: "localhost",
        port: 3306,
        user: "root",
        password: burger.password,
        database: "burgers_db"
    });
};
// Make connection.
connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;