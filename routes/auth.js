var express = require("express");
var router = express.Router();
router.use(express.json());
require("dotenv").config();
var database = require("../helpers/database.js");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

function generateAccessToken(username) {
  return jwt.sign(username, process.env.TOKEN_SECRET, {});
}

router.post("/register", async (req, res, next) => {
  if (Object.keys(req.body).length < 6) return res.status(400);
  // Password encryption
  const salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(req.body.password, salt);

  data = [
    req.body.firstname,
    req.body.middlename,
    req.body.lastname,
    req.body.department,
    hashedPassword,
    req.body.username,
  ];

  const query =
    "INSERT INTO EMPLOYEE(Employee_F_Name, Employee_M_Name, Employee_L_Name, Department_Name, Employee_Password, Employee_Username) VALUES (?)";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.status(200).json({ username: req.body.username });
  });
});

router.post("/login", async (req, res, next) => {
  if (Object.keys(req.body).length < 2) return res.status(400);

  var query =
    "SELECT Employee_password FROM EMPLOYEE WHERE Employee_username = ?;";
  database.query(query, [req.body.username], async (err, result) => {
    if (err) {
      res.sendStatus(500);
      throw err;
    }

    // Status 401 if no username found
    if (result.length === 0) {
      return res.status(401).json({ error: "not found" });
    }

    // Compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      result[0].Employee_password
    );

    // Status 401 if password incorrect
    if (!validPassword) {
      return res.status(401).json({ error: "not found" });
    }

    const token = generateAccessToken({ username: req.body.username });
    res.status(200).json({ token: token });
  });
});

module.exports = router;
