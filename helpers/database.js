require("dotenv").config();
const fs = require("fs");
//const mysql = require("mysql");
const mysql = require("mysql2");

// Database connection setup
const connectionPool = mysql.createPool({
  host: process.env.HOST,
  user: process.env.SQLUSER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
  ssl: {
    ca: fs.readFileSync(
      __dirname + "/../certificates/DigiCertGlobalRootCA.crt.pem"
    ),
  },
  multipleStatements: true,
});

connectionPool.getConnection((err, connection) => {
  if (err) throw err;
  console.log(`Connected succesfully to ${process.env.DATABASE}`);
  connection.release();
});

module.exports = connectionPool;
