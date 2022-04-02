require("dotenv").config();
const fs = require('fs');
var mysql = require("mysql");

// Database connection setup
var connection = mysql.createConnection({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: { 
    ca: fs.readFileSync(__dirname + '/certificates/DigiCertGlobalRootCA.crt.pem') 
  },
});

connection.connect(function (err) {
  if (err) throw err;
  console.log(`Connected succesfully to ${process.env.DATABASE}`);
});

module.exports = connection;
