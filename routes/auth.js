var express = require("express");
var router = express.Router();
router.use(express.json());
const bcrypt = require("bcrypt");
var database = require("../helpers/database.js");

router.post("/register", async (req, res, next) => {
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
    res.status(200).json({ username: user.username });
  });
});

router.post("/login", async (req, res, next) => {
  var query =
    "SELECT Employee_password FROM EMPLOYEE WHERE Employee_username = ?;";
  database.query(query, [req.body.username], async (err, result) => {
    if (err) {
      res.sendStatus(500);
      throw err;
    }

    // Status 400 if no username found
    if (result.length === 0)
      return res.status(400).json({ status: "incorrect" });

    // Compare password
    const validPassword = await bcrypt.compare(
      req.body.password,
      result[0].Employee_password
    );
    if (!validPassword) return res.status(400).json({ status: "incorrect" });

    res.status(200).json({ status: "correct" });
  });
});

module.exports = router;
