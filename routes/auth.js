var express = require("express");
var router = express.Router();
router.use(express.json());
require("dotenv").config();
var database = require("../helpers/database.js");
var encryption = require("../helpers/encryption");

router.post("/register", async (req, res, next) => {
  if (req.body.constructor !== Object || Object.keys(req.body).length < 9)
    return res.status(400);
  // Password encryption
  var hashedPassword = await encryption.generatePassword(
    req.body.Employeepassword
  );

  data = [
    req.body.EmployeeFirstName,
    req.body.EmployeeMiddleName,
    req.body.EmployeeLastName,
    req.body.DepartmentName,
    req.body.EmployeeSalary,
    req.body.EmployeeDOB,
    req.body.EmployeeUsername,
    hashedPassword,
    req.body.EmployeeAdminFlag,
  ];

  const query =
    "INSERT INTO EMPLOYEE (Employee_F_Name, Employee_M_Name, Employee_L_Name, Department_Name, Employee_Salary, Employee_DOB, Employee_Username, Employee_Password, Admin_Flag) VALUES (?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    const returnquery =
      "SELECT Employee_ID FROM EMPLOYEE WHERE Employee_Username=?;";
    database.query(
      returnquery,
      [req.body.EmployeeUsername],
      function (err, result) {
        if (err) {
          res.sendStatus(500);
          throw err;
        }
        res.status(200).json(result);
      }
    );
  });
});

router.post("/login", async (req, res, next) => {
  if (Object.keys(req.body).length < 2) return res.status(400);

  var query =
    "SELECT Employee_password, Employee_ID, Employee_F_Name, Employee_Email, Admin_Flag FROM EMPLOYEE WHERE Employee_username = ?;";
  database.query(query, [req.body.username], async (err, result) => {
    if (err) {
      res.sendStatus(500);
      throw err;
    }

    // Status 401 if no username found
    if (result.length === 0) {
      return res
        .status(401)
        .json({ error: "Your username or password is incorrect!" });
    }

    const validPassword = await encryption.comparePassword(
      req.body.password,
      result[0].Employee_password
    );

    // Status 401 if password incorrect
    if (!validPassword) {
      return res
        .status(401)
        .json({ error: "Your username or password is incorrect!" });
    }

    var flag = false;
    if (result[0].Admin_Flag == 1) flag = true;

    const token = await encryption.generateAccessToken({
      username: req.body.username,
      id: result[0].Employee_ID,
      firstname: result[0].Employee_F_Name,
      email: result[0].Employee_Email,
      admin: flag,
    });
    res.status(200).json({ token: token });
  });
});

module.exports = router;
