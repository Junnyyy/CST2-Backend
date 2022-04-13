var express = require("express");
var router = express.Router();
router.use(express.json());
const bcrypt = require("bcrypt");
var database = require("../helpers/database.js");

// Encryption
//const salt = await bcrypt.genSalt(10);

router.post("/register", async (req, res, next) => {
  // Password encryption
  const salt = await bcrypt.genSalt(10);
  var hashedPassword = await bcrypt.hash(req.body.password, salt);
  //res.json([hashedPassword, hashedPassword2, validPass, validPass2]);

  const user = {
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    department: req.body.department,
    email: req.body.email,
    username: req.body.username,
    password: hashedPassword,
  };

  data = [
    user.firstname,
    user.middlename,
    user.lastname,
    user.department,
    user.email,
    user.password,
    user.username,
  ];

  const query =
    "INSERT INTO EMPLOYEE(Employee_F_Name, Employee_M_Name, Employee_L_Name, Department_Name, Employee_Email, Employee_Password, Employee_Username) VALUES (?)";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(user.username);
    //res.sendStatus(200);
  }); //
});
//const validPass = await bcrypt.compare(req.body.password, hashedPassword2);

module.exports = router;
