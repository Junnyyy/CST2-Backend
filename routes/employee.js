var express = require("express");
var router = express.Router();
router.use(express.json());
var database = require("../helpers/database.js");


router.get("/", function (req, res, next) {
  const query ='SELECT Employee_ID, Employee_F_Name, Employee_M_Name, Employee_L_Name, Department_Name, Employee_Salary, Employee_DOB, Employee_Email, Employee_Username FROM EMPLOYEE;';
  database.query(query,function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result)
  })
});

router.post("/", function (req, res, next) {
  // Data validation
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.sendStatus(400);
  }

  const newEmp = req.body;
  var data = [newEmp.fname, newEmp.mname, newEmp.lname, newEmp.department, newEmp.salary, newEmp.dob, newEmp.user, newEmp.password];

  const query =
    "INSERT INTO EMPLOYEE (Employee_F_Name, Employee__M_Name, Employee_L_Name, Department_Name, Employee_Salary, Employee_DOB, Employee_Username, Employee_Password) VALUES (?);";
  database.query(query, [data], function (err, result) {
    if (err) {
      res.sendStatus(500);
      throw err;
    }
  });
  const returnquery = "SELECT Employee_ID FROM EMPLOYEE WHERE Employee_Email=?;";
  database.query(returnquery, newEmp.email, function(err,result){
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.json(result);
  });
});

router.delete("/", function(req, res, next) {
  if (Object.keys(req.body).length < 1) return res.status(400);

  const delEmployee = req.body;
  var data = [delEmployee.EID];

  const query = "DELETE FROM EMPLOYEE WHERE Employee_ID =?;";
  database.query(query, [data], function(err,result) {
    if(err) {
      res.sendStatus(500);
      throw err;
    }
    res.sendStatus(200);
  });
});
module.exports = router;