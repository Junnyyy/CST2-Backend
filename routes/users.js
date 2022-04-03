var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../database.js");

// Return a user
router.get("/:id", function (req, res, next) {
  res.send("respond with a resource");
});

// Example information (newUser below looks like this)
/*nu = {
  firstname: "bob",
  middlename: "bob",
  lastname: "bob",
  department: "shop",
  salary: "10",
  dob: "4/2/2022",
};*/

// Create new user
router.post("/", function (req, res, next) {
  const newUser = req.body;
  //? = (FName, MName, LName, dept, salary, DOB)
  var sqlQuery =
    "INSERT INTO EMPLOYEE(Employee_F_Name, Employee_M_Name, Employee_L_Name, Department_Name, Salary, DOB) VALUES (?)";
  var values = [
    newUser.firstname,
    newUser.middlename,
    newUser.lastname,
    newUser.department,
    newUser.salary,
    newUser.dob,
  ];
  //console.log(newUser);
  //res.json(newUser);
  //res.sendStatus(200);

  database.query(sqlQuery, [values], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
  //res.send('respond with a resource');
});

module.exports = router;
