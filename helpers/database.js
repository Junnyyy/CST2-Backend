require("dotenv").config();
const fs = require('fs');
//const mysql = require("mysql");
const mysql = require("mysql2");

console.log(process.env);

// Database connection setup
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USERNAME,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: { 
    ca: fs.readFileSync(__dirname + '/../certificates/DigiCertGlobalRootCA.crt.pem') 
  },
  multipleStatements: true,
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Connected succesfully to ${process.env.DATABASE}`);
});

module.exports = connection;
