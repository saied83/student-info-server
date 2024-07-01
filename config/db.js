const mysql = require("mysql2/promise");
require("dotenv").config();

const dbConnection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "school",
});

module.exports = dbConnection;
